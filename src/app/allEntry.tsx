"use client";
import { useEffect, useState } from 'react';
import Entry from './entry';
import Add from './add';
import EntryHead from './entryhead';

type EntryType = {
  id: number;
  date: string;
  debit: number[];
  credit: number[];
  debitEntry: string[];
  creditEntry: string[];
  onEntryDelete: any;
};

export default function HomePage() {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch entries from API
  async function fetchEntries() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/entries');

      if (!res.ok) {
        throw new Error(`Network response was not OK (status: ${res.status})`);
      }

      const data = await res.json();
      setEntries(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  // Refresh function: Called automatically after adding an entry
  const refreshEntries = () => {
    fetchEntries();
  };

  // Loading state
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading entries...</div>;
  }

  // Error state (with retry option, but no manual refresh button elsewhere)
  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">Error loading entries: {error}</div>
        <button
          onClick={refreshEntries}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry Fetch
        </button>
      </div>
    );
  }

  

  return (
    <div>
      <Add onEntryAdded={refreshEntries} />
      <EntryHead></EntryHead>
      {entries.length === 0 ? (
        <div className="text-gray-500 mb-4">No entries yet. Add one below!</div>
      ) : (
        <div>
          {entries.map((entry, i) => (
            <div key={entry.id} className=""> {/* No border-b; just spacing */}
              <Entry
                date={entry.date}
                debitEntry={entry.debitEntry}
                creditEntry={entry.creditEntry}
                debit={entry.debit}
                credit={entry.credit}
                id={entry.id}
                onEntryDelete={refreshEntries}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pass refresh callback to Add for automatic updates after submit */}
      
    </div>
  );
}
"use client"
import { useEffect, useState } from 'react';
import Entry from './entry';


export default function HomePage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [debitEntryVar, setdebitEntryVar] = useState(['debbb'])
  const [creditEntryVar, setcreditEntryVar] = useState(['crrrr'])

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch('/api/entries');

        if (!res.ok) {
          throw new Error(`Network response was not OK (status: ${res.status})`);
        }

        const data = await res.json();
        setEntries(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    }

    fetchEntries();
  }, []);

  if (error) return <div>Error loading entries: {error}</div>;

  
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>

          <Entry date={entry.date} debitEntry={entry.debitEntry} creditEntry={entry.creditEntry} debit={entry.debit} credit={entry.credit}></Entry>
        </div>
      ))}
    </div>
  );
}

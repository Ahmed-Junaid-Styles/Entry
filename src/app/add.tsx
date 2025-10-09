"use client";

import React, { useEffect, useState } from 'react';
import "@/app/add.css";

// Props: For refreshing parent after submit (from previous HomePage integration)
type AddProps = {
  onEntryAdded?: () => void;
};

const Add = ({ onEntryAdded }: AddProps) => {
  const [date, setDate] = useState(""); // Input value (YYYY-MM-DD)

  // Counts: Arrays of numbers (e.g., [1,1,1] for initial 3 debits)
  const [debitCount, setDebitCount] = useState<number[]>([1, 1, 1]);
  const [creditCount, setCreditCount] = useState<number[]>([1]);

  // Titles and Amounts: Initialize with empty values to match initial counts
  const [debitTitle, setDebitTitle] = useState<string[]>(['', '', '']); // Matches 3 initial debits
  const [creditTitle, setCreditTitle] = useState<string[]>(['']); // Matches 1 initial credit
  const [debitAmount, setDebitAmount] = useState<number[]>([0, 0, 0]); // Matches 3 initial debits
  const [creditAmount, setCreditAmount] = useState<number[]>([0]); // Matches 1 initial credit

  const [data, setData] = useState<any[]>([]); // Kept as-is; consider removing if unused

  // Add a new debit row (updates counts AND initializes title/amount)
  const increaseDebitInput = () => {
    setDebitCount(prev => [...prev, prev.length + 1]);
    setDebitTitle(prev => [...prev, '']);
    setDebitAmount(prev => [...prev, 0]);
  };

  // Add a new credit row (same as above)
  const increaseCreditInput = () => {
    setCreditCount(prev => [...prev, prev.length + 1]);
    setCreditTitle(prev => [...prev, '']);
    setCreditAmount(prev => [...prev, 0]);
  };

  // Optional: Remove a specific debit row (keeps min 1 item)
  const removeDebit = (index: number) => {
    if (debitCount.length > 1) {
      setDebitCount(prev => prev.filter((_, i) => i !== index));
      setDebitTitle(prev => prev.filter((_, i) => i !== index));
      setDebitAmount(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Optional: Remove a specific credit row (keeps min 1 item)
  const removeCredit = (index: number) => {
    if (creditCount.length > 1) {
      setCreditCount(prev => prev.filter((_, i) => i !== index));
      setCreditTitle(prev => prev.filter((_, i) => i !== index));
      setCreditAmount(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Update title at specific index (controlled input handler)
  const updateDebitTitle = (index: number, value: string) => {
    setDebitTitle(prev => {
      const newTitles = [...prev];
      newTitles[index] = value;
      return newTitles;
    });
  };

  const updateCreditTitle = (index: number, value: string) => {
    setCreditTitle(prev => {
      const newTitles = [...prev];
      newTitles[index] = value;
      return newTitles;
    });
  };

  // Update amount at specific index
  const updateDebitAmount = (index: number, value: number) => {
    setDebitAmount(prev => {
      const newAmounts = [...prev];
      newAmounts[index] = value;
      return newAmounts;
    });
  };

  const updateCreditAmount = (index: number, value: number) => {
    setCreditAmount(prev => {
      const newAmounts = [...prev];
      newAmounts[index] = value;
      return newAmounts;
    });
  };

  useEffect(() => {
    fetch("/api/newentries")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Fixed: Synchronous date formatter (returns DD-MMM-YYYY; no state needed)
  const formatDate = (inputDate: string): string => {
    if (!inputDate) {
      // Default formatted date for empty input (e.g., format "2025-01-01" to "01-Jan-2025")
      const defaultDate = "2025-01-01";
      const dateArray = defaultDate.split("-");
      const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${dateArray[2]}-${months[parseInt(dateArray[1]) - 1]}-${dateArray[0]}`;
    }

    const dateArray = inputDate.split("-");
    const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatted = `${dateArray[2]}-${months[parseInt(dateArray[1]) - 1]}-${dateArray[0]}`;
    console.log(dateArray[2], formatted); // For debugging
    return formatted;
  };

  const addItem = async () => {
    // Basic validation (expand as needed)
    if (!date && debitTitle.every(t => !t) && creditTitle.every(t => !t)) {
      alert('Please enter at least date, a debit, or a credit.');
      return;
    }

    // Fixed: Compute formatted date synchronously (no async state issue)
    const formattedDate = formatDate(date);

    const newItem = {
      id: Date.now(), // Simple ID; use UUID for production
      date: formattedDate, // Always use formatted (DD-MMM-YYYY)
      debitEntry: debitTitle.filter(title => title.trim()), // Filter empty entries
      creditEntry: creditTitle.filter(title => title.trim()),
      debit: debitAmount.filter(amt => amt > 0), // Filter zero/empty amounts
      credit: creditAmount.filter(amt => amt > 0),
    };

    try {
      const res = await fetch("/api/newentries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) {
        throw new Error(`Failed to add entry: ${res.status}`);
      }

      const result = await res.json();
      setData(result.data || []); // Update local data if needed

      // Reset form after success
      setDate("");
      setDebitTitle(['', '', '']);
      setDebitAmount([0, 0, 0]);
      setDebitCount([1, 1, 1]);
      setCreditTitle(['']);
      setCreditAmount([0]);
      setCreditCount([1]);

      // Trigger parent refresh (makes new entry visible in HomePage list)
      if (onEntryAdded) {
        onEntryAdded();
      }

      alert('Entry added successfully!');
    } catch (err: any) {
      console.error('Submit error:', err);
      alert(`Error adding entry: ${err.message}`);
    }
  };

  return (
    <div>
      <div className='w-[80%] m-auto'>
        {/* Date */}
        <div>
          <label htmlFor="date">Date: </label>
          <div className='flex justify-center'>
            <input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)} // Removed extra braces; no need for format here
              className='text-center border-2 border-[black] w-[26%] rounded-md'
              type="date"
            />
          </div>
        </div>

        {/* Debit Section: Dynamic list */}
        <div>
          <label htmlFor="">Debit Title & Amount: </label>
          {debitCount.map((element, i) => (
            <div key={i} className='flex justify-center items-center space-x-2 mb-2'>
              <input
                value={debitTitle[i] || ''}
                onChange={(e) => updateDebitTitle(i, e.target.value)}
                className="addbox DebitTitles"
                placeholder='Enter debit title'
                type="text"
              />
              <input
                value={debitAmount[i] || 0}
                onChange={(e) => updateDebitAmount(i, Number(e.target.value) || 0)}
                className="addbox"
                placeholder='Enter debit amount'
                type="number"
              />
              {debitCount.length > 1 && (
                <button
                  onClick={() => removeDebit(i)}
                  type="button"
                  className='text-red-500 text-sm'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className='flex justify-center mt-3'>
            <button onClick={increaseDebitInput} className='addmore'>Add More Debit</button>
          </div>
        </div>

        {/* Credit Section: Now dynamic like debits */}
        <div>
          <label htmlFor="">Credit Title & Amount: </label>
          {creditCount.map((element, i) => (
            <div key={i} className='flex justify-center items-center space-x-2 mb-2'>
              <input
                value={creditTitle[i] || ''}
                onChange={(e) => updateCreditTitle(i, e.target.value)}
                className="addbox"
                placeholder='Enter credit title'
                type="text"
              />
              <input
                value={creditAmount[i] || 0}
                onChange={(e) => updateCreditAmount(i, Number(e.target.value) || 0)}
                className="addbox"
                placeholder='Enter credit amount'
                type="number"
              />
              {creditCount.length > 1 && (
                <button
                  onClick={() => removeCredit(i)}
                  type="button"
                  className='text-red-500 text-sm'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className='flex justify-center mt-3'>
            <button onClick={increaseCreditInput} className='addmore'>Add More Credit</button>
          </div>
        </div>

        {/* Submit */}
        <div className='flex justify-center'>
          <button
            onClick={addItem}
            className='my-6 bg-green-600 w-[12%] p-1 rounded-md text-white'
          >
            Submit Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
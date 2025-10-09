import React, { useState } from 'react'
import './entry.css'

type EntryProps = {
    id: number;
    date: string;
    debitEntry: string[]
    creditEntry: string[]
    debit: number[];
    credit: number[];
    onEntryDelete: any;
}



const Entry = ({id, date,debitEntry, creditEntry, debit, credit, onEntryDelete}: EntryProps) => {

    const [Data, setData] = useState([])

    async function removeData(e: any){
    try {
      const res = await fetch("/api/newentries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: e,
      });

      if (!res.ok) {
        throw new Error(`Failed to add entry: ${res.status}`);
      }

      const result = await res.json();
      
      setData(e || []); // Update local data if needed

      if (onEntryDelete) {
        onEntryDelete();
      }

      alert('Entry Deleted successfully!');
    } catch (err: any) {
      console.error('Submit error:', err);
      alert(`Error Deleting entry: ${err.message}`);
    }
    console.log(e)
  }  

  return (
    <div className='flex w-[80%] m-auto items-center'>
        <div className='main border-black border-2  w-[95%] m-auto'>
            <div className='flex items-center'>
                <div className='entry-item entry-item1'>{date}</div>
                <div className='entry-item entry-item2'>
                    {
                        debitEntry.map((e, i)=>(
                            <div key={i}>{e}</div>
                        ))
                    }{
                        creditEntry.map((e, i)=>(
                            <div className='credit' key={i}>{e}</div>
                        ))
                    }
                </div>
                <div className='entry-item entry-item3'>
                    {
                        debit.map((e, i)=>(
                            <div key={i}>{e}</div>
                        ))
                    }{
                        credit.map((e, i)=>(
                            <div key={i}>-</div>
                        ))
                    }
                </div>
                <div className='entry-item entry-item4'>
                    {
                        debit.map((e, i)=>(
                            <div key={i}>-</div>
                        ))
                    }{
                        credit.map((e, i)=>(
                            <div key={i}>{e}</div>
                        ))
                    }
                </div>
                
            </div>
            
        </div>
        
        <div data-id={id} onClick={(e)=> removeData(e.currentTarget.dataset.id)} className='entry-item entry-item7 w-[5%] cursor-pointer text-red-600'>Delete</div>
    </div>
  )
}

export default Entry
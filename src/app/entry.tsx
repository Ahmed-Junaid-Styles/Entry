import React from 'react'
import './entry.css'

type EntryProps = {
    date: string;
    debitEntry: string[]
    creditEntry: string[]
    debit: number[];
    credit: number[];
}

const Entry = ({date,debitEntry, creditEntry, debit, credit}: EntryProps) => {
  return (
    <div>
        <div className='main border-black border-2  w-[80%] m-auto'>
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
                <div className='entry-item entry-item5'>Up</div>
                <div className='entry-item entry-item6'>Down</div>
                <div className='entry-item entry-item7'>Delete</div>
            </div>
            
        </div>
    </div>
  )
}

export default Entry
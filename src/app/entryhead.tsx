import React from 'react'
import './entry.css'

const EntryHead = () => {
  return (
    <div>
        <div className='main  border-black border-2 flex w-[80%] m-auto'>
            <div className='entry-item entry-item1'>Date</div>
            <div className='entry-item entry-heading'>Entry</div>
            <div className='entry-item entry-item3'>Debit</div>
            <div className='entry-item entry-item4'>Credit</div>
            <div className='entry-item entry-item5'>Up</div>
            <div className='entry-item entry-item6'>Down</div>
            <div className='entry-item entry-item7'>Delete</div>
        </div>
    </div>
  )
}

export default EntryHead
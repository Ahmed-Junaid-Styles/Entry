import React from 'react'
import './entry.css'

const EntryHead = () => {
  return (
    <div className='flex w-[80%] m-auto'>
        <div className='main  border-black border-2 flex w-[95%] m-auto'>
            <div className='entry-item entry-item1'>Date</div>
            <div className='entry-item entry-heading'>Entry</div>
            <div className='entry-item entry-item3'>Debit</div>
            <div className='entry-item entry-item4'>Credit</div>
        </div>
            <div className='entry-item entry-item7 w-[5%]'></div>
    </div>
  )
}

export default EntryHead
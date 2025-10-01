import React from 'react'
import Entry from './entry'
import EntryHead from './entryhead'
import HomePage from './allEntry'




const Page = () => {
  return (
    <div>
      <center><h1 className='mt-3 mb-3 text-[30px]'>General Journal</h1></center>
      <EntryHead></EntryHead>
      {/* <Entry date='2-Oct-2025' debitEntry={['Cash']} creditEntry={['A/C receivable']} debit={[700]} credit={[700]}></Entry>
      <Entry date='8-Oct-2025' debitEntry={['Cash']} creditEntry={['Sales']} debit={[200]} credit={[200]}></Entry>
      <Entry date='10-Oct-2025' debitEntry={['Cleaning', 'Salary']} creditEntry={['Cash']} debit={[200, 500000]} credit={[500200]}></Entry>
      <Entry date='22-Oct-2025' debitEntry={['Machine']} creditEntry={['A/C payable', 'Cash', 'Bank']} debit={[12000]} credit={[2000, 5000, 5000]}></Entry>
       */}
      <HomePage></HomePage>
    </div>
  )
}

export default Page
import { useState } from 'react'
import './App.css'

import { Expense } from './components/Expense-component'
import { useExpenseDataStore } from './stores/ExpenseData-store'

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  return (
    <>
    <div className='flex flex-col gap-3 w-screen h-screen px-3 pb-3'>
      <div className='flex flex-row justify-center gap-14 bg-[#ffffff] shadow-md shadow-[#b6b6b6] top-0 h-10 rounded-b-xl'>
        <button onClick={() => (setSelectedMonth('January'))}>Jan</button>
        <button onClick={() => (setSelectedMonth('February'))}>Feb</button>
        <button onClick={() => (setSelectedMonth('March'))}>Mar</button>
        <button onClick={() => (setSelectedMonth('April'))}>Apr</button>
        <button onClick={() => (setSelectedMonth('May'))}>May</button>
        <button onClick={() => (setSelectedMonth('June'))}>Jun</button>
        <button onClick={() => (setSelectedMonth('July'))}>Jul</button>
        <button onClick={() => (setSelectedMonth('August'))}>Aug</button>
        <button onClick={() => (setSelectedMonth('September'))}>Sep</button>
        <button onClick={() => (setSelectedMonth('October'))}>Oct</button>
        <button onClick={() => (setSelectedMonth('November'))}>Nov</button>
        <button onClick={() => (setSelectedMonth('December'))}>Dec</button>
        <button onClick={() => (setSelectedMonth('Yearly'))}>Yearly</button>
      </div>
      <p className='text-2xl font-semibold'>{selectedMonth}</p>
      <div className='flex flex-row gap-3 h-2/5'>
        <div className='bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-1/2 rounded-xl'>Graph</div>
        <div className='bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-[30%] rounded-xl'>Pie Chart</div>
        <div className='bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-[20%] rounded-xl'>Remaining Balance</div>
      </div>
      <div className='flex flex-col justify-between gap-6 h-1/2 bg-[#ffffff] shadow-md shadow-[#b6b6b6] rounded-xl p-6'>
        <div className='flex flex-col gap-6 overflow-x-hidden overflow-y-auto p-2'>
          <Expense></Expense>
        </div>
        <button className='w-[10%] p-1 ml-[90%] font-semibold bg-[#ffffff] shadow-md shadow-[#b6b6b6] rounded-md hover:bg-green-500 hover:text-white active:bg-green-700'>New Expense</button>
      </div>
    </div>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'

// Import components
import { Expense } from './components/Expense-component'
import { NewExpenseMenu } from './components/NewExpenseMenu-component'
// Import Stores
import { useNewExpenseMenu } from './stores/menuDisplay-store'
import { useMonthlyExpense } from './data/expenseData'

// Unique KeyID for expenses; this value does not change
let keyID: number = 0;

function App() {
  // useState to keep track of the currently selected month
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  // New expense menu store
  const newExpenseMenu = useNewExpenseMenu((state) => state.showMenu);
  const setNewExpenseMenu = useNewExpenseMenu((state) => state.setMenu);
  
  // Expense states
  const monthlyExpenses = useMonthlyExpense((state: any) => state.storeMonthlyExpenses)
  // const addNewExpense = useMonthlyExpense((state) => state.addExpense)

  return (
    <>
    <div className='flex flex-col gap-3 w-screen h-screen px-3 pb-3'>
      <div className='flex flex-row flex-wrap justify-center gap-y-4 gap-14 top-0 h-auto p-2 bg-[#ffffff] shadow-md shadow-[#b6b6b6] rounded-b-xl'>
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
          {/* Render monthlyExpenses components */}
          {monthlyExpenses.map((expenseItem: any, index: number) => (
            <Expense key={keyID += 1} id={index} expenseData={expenseItem}></Expense>
          ))}
        </div>
        <button className='w-[10%] p-1 ml-[90%] font-semibold text-ellipsis overflow-clip bg-[#ffffff] shadow-md shadow-[#b6b6b6] rounded-md hover:bg-green-500 hover:text-white active:bg-green-700' onClick={() => setNewExpenseMenu(!newExpenseMenu)}>New Expense</button>
      </div>
      
      {/* Render new expense menu */}
      {newExpenseMenu && <NewExpenseMenu></NewExpenseMenu>}
    </div>
    </>
  )
}

export default App
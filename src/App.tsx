import './App.css'

// Import Stores
import { useNewExpenseMenu } from './stores/menuDisplay-store'
import { useExpensesList, useMonthStore } from './data/expenseData'
// Import components
import { Expense } from './components/Expense-component'
import { NewExpenseMenu } from './components/NewExpenseMenu-component'
import { RemainingBalance } from './components/RemainingBalance-component'
import { DoubleClickInput } from './components/InputDoubleClick-component'
import { useMonthlyBudgetStore } from './stores/monthlyBalance-store'

// Unique KeyID for expenses; this value does not change
let keyID: number = 0;
// Array for currently displayed expenses
let expensesList: any = [];

function App() {
  // store to keep track of and update the selected month
  const selectedMonth = useMonthStore((state) => state.selectedMonth);
  const setSelectedMonth = useMonthStore((state) => state.setSelectedMonth);

  // New expense menu store
  const newExpenseMenu = useNewExpenseMenu((state) => state.showMenu);
  const setNewExpenseMenu = useNewExpenseMenu((state) => state.setMenu);
  
  // Expense states
  const monthlyExpenses = useExpensesList((state: any) => state.storeExpenses);

  // Budget store
  const budget = useMonthlyBudgetStore(state => state.budget);
  const updateBudget = useMonthlyBudgetStore(state => state.updateBudget);

  function renderExpenses(){
    // Empty expensesList array
    expensesList = [];

    // Add each element in monthlyExpenses for the current month into the expensesList array
    monthlyExpenses.map(function(expenseItem: any) {
      if(expenseItem.month === selectedMonth){
        expensesList.push(expenseItem);
      }
      else if(selectedMonth === 'Yearly'){
        expensesList.push(expenseItem);
      }
    });

    // Display an element indicating that there is currently no expenses for this month
    if(expensesList.length === 0) {
      return (<div className='m-auto text-center text-3xl text-[#b6b6b631]'><p>No Expenses For {selectedMonth} Currently...</p></div>);
    }
  }

  return (
    <>
    <div className='flex flex-col gap-3 w-screen h-screen px-3 pb-3'>
      <div className='flex flex-row flex-wrap justify-center gap-y-4 gap-14 top-0 h-auto p-2 bg-[#ffffff] shadow-md shadow-[#b6b6b6] rounded-b-xl'>
        <button onClick={() => (setSelectedMonth('January'))} className={`${selectedMonth == 'January' ? 'text-green-500 underline' : ''}`}>Jan</button>
        <button onClick={() => (setSelectedMonth('February'))} className={`${selectedMonth == 'February' ? 'text-green-500 underline' : ''}`}>Feb</button>
        <button onClick={() => (setSelectedMonth('March'))} className={`${selectedMonth == 'March' ? 'text-green-500 underline' : ''}`}>Mar</button>
        <button onClick={() => (setSelectedMonth('April'))} className={`${selectedMonth == 'April' ? 'text-green-500 underline' : ''}`}>Apr</button>
        <button onClick={() => (setSelectedMonth('May'))} className={`${selectedMonth == 'May' ? 'text-green-500 underline' : ''}`}>May</button>
        <button onClick={() => (setSelectedMonth('June'))} className={`${selectedMonth == 'June' ? 'text-green-500 underline' : ''}`}>Jun</button>
        <button onClick={() => (setSelectedMonth('July'))} className={`${selectedMonth == 'July' ? 'text-green-500 underline' : ''}`}>Jul</button>
        <button onClick={() => (setSelectedMonth('August'))} className={`${selectedMonth == 'August' ? 'text-green-500 underline' : ''}`}>Aug</button>
        <button onClick={() => (setSelectedMonth('September'))} className={`${selectedMonth == 'September' ? 'text-green-500 underline' : ''}`}>Sep</button>
        <button onClick={() => (setSelectedMonth('October'))} className={`${selectedMonth == 'October' ? 'text-green-500 underline' : ''}`}>Oct</button>
        <button onClick={() => (setSelectedMonth('November'))} className={`${selectedMonth == 'November' ? 'text-green-500 underline' : ''}`}>Nov</button>
        <button onClick={() => (setSelectedMonth('December'))} className={`${selectedMonth == 'December' ? 'text-green-500 underline' : ''}`}>Dec</button>
        <button onClick={() => (setSelectedMonth('Yearly'))} className={`${selectedMonth == 'Yearly' ? 'text-green-500 underline' : ''}`}>Yearly</button>
      </div>
      
      <div>
        <p className='text-2xl font-semibold'>{selectedMonth.toUpperCase()}</p>

        <div className='flex flex-row w-fit'>
          <label className='font-semibold'>Monthly Budget:</label>
          <DoubleClickInput type='number' step={0.01} pValue={budget} updateStore={updateBudget}></DoubleClickInput>
        </div>
      </div>

      <div className='flex flex-row gap-3 h-2/5'>
        <div className='bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-1/2 rounded-xl'>Graph</div>

        <div className='bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-[30%] rounded-xl'>Pie Chart</div>
        
        <div className='bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-[20%] rounded-xl'>
          <RemainingBalance></RemainingBalance>
        </div>
      </div>
      
      <div className='flex flex-col justify-between gap-6 h-1/2 bg-[#ffffff] shadow-md shadow-[#b6b6b6] rounded-xl p-6'>
        <div className='flex flex-col gap-6 overflow-x-hidden overflow-y-auto p-2 h-full'>
          {/* Render monthlyExpenses components */}
          {
            // Add expenses to expensesList for rendering
            renderExpenses()
          }
          {
            // Render a Expense component for each element in expensesList
            expensesList.map((expenseItem: any) => 
              <Expense key={keyID += 1} id={expenseItem.id} expenseData={expenseItem}></Expense>
            )
          }
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
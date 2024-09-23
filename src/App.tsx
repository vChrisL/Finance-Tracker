import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
    <div className='flex flex-col gap-3 w-screen h-screen'>
      <div className='bg-[#1b1b1b] top-0 h-10'>Month Navbar</div>
      <p>Month</p>
      <div className='flex flex-row gap-3 h-2/5'>
        <div className='bg-[#1b1b1b] w-1/2'>Graph</div>
        <div className='bg-[#1b1b1b] w-[30%]'>Pie Chart</div>
        <div className='bg-[#1b1b1b] w-[20%]'>Remaining Balance</div>
      </div>
      <div className='flex flex-col gap-3 bg-[#1b1b1b] h-1/2'>
        Expenses list
      </div>
    </div>
    </>
  )
}

export default App

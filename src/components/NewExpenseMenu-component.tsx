import { useNewExpenseMenu } from "../stores/menuDisplay-store"; 

export function NewExpenseMenu(){
    const menuState = useNewExpenseMenu((state) => state.showMenu);
    const setMenuState = useNewExpenseMenu((state) => state.setMenu);

    return(
        <>
        <div className='flex justify-center absolute top-0 right-0 w-screen h-screen backdrop-blur-sm bg-[#b6b6b648]'>
          <div className='flex flex-col justify-around items-center p-6 bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-fit h-fit top-0 right-0 translate-y-1/2 rounded-xl'>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-col gap-4 text-right font-semibold'>
                <p>Description:</p>
                <p>Amount:</p>
                <p>Date:</p>
                <p>Category:</p>
              </div>

              <div className='flex flex-col gap-4'>
                <input type="text" placeholder='desc'/>
                <input type="text" placeholder='amount'/>
                <input type="text" placeholder='date'/>
                <select name="category" id="category">
                  <option value="food">Food</option>
                  <option value="rent">Rent</option>
                  <option value="transportation">Transportation</option>
                  <option value="utilities">Utilities</option>
                  <option value="personal">Personal</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className='flex flex-row gap-8 mt-4'>
              <button className='hover:text-red-500' onClick={() => setMenuState(!menuState)}>Discard</button>
              <button>Add</button>
            </div>
          </div>
        </div>
        </>
    )
}
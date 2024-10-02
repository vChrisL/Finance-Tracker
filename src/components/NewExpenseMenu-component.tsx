import { useNewExpenseMenu } from "../stores/menuDisplay-store";
import { expenseCategories, useMonthlyExpense } from "../data/expenseData";
import { addExpensesMasterList } from "../data/expenseData";

export function NewExpenseMenu() {
  // New expense menu stores
  const menuState = useNewExpenseMenu((state) => state.showMenu);
  const setMenuState = useNewExpenseMenu((state) => state.setMenu);

  // expenses store
  const monthlyExpenses = useMonthlyExpense((state: any) => state.storeMonthlyExpenses);
  const updateMasterList = useMonthlyExpense((state: any) => state.updateMasterList);

  // variables to hold expense fields
  let desc: string = "";
  let amount: number = 0;
  let date: string = "yy-mm-dd";
  let month: string = "mm"
  let category: string = "Food";

  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  // Returns the month in string format according to numerical date
  function setMonth(): string {
    let dateList: string[] = date.split("-");
    return months[parseInt(dateList[1]) - 1]
  }

  // Handles adding new expenses on add button click
  function newExpense() {
    addExpensesMasterList({
      id: monthlyExpenses.length,
      month: setMonth(),
      desc: desc,
      amount: amount,
      date: date,
      category: category,
    });
    // Toggle the menu and update the master list
    setMenuState(!menuState);
    updateMasterList();
  }

  // Get todays date in yyyy-mm-dd format
  function getToday(): string {
    let dateObject = new Date();
    let day = String(dateObject.getDate()).padStart(2, '0');
    let month = String(dateObject.getMonth() + 1).padStart(2, '0');
    let year = dateObject.getFullYear();

    let formattedDate = `${year}-${month}-${day}`
    date = formattedDate;
    return formattedDate
  }

  return (
    <>
      <div className="flex justify-center absolute top-0 right-0 w-screen h-screen backdrop-blur-sm bg-[#b6b6b648]">
        <div className="flex flex-col justify-around items-center p-6 bg-[#ffffff] shadow-md shadow-[#b6b6b6] w-fit h-fit top-0 right-0 translate-y-1/2 rounded-xl">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4 text-right font-semibold">
              <p>Description:</p>
              <p>Amount:</p>
              <p>Date:</p>
              <p>Category:</p>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="desc"
                onChange={(e) => (desc = e.target.value)}
              />
              <input
                type="text"
                placeholder="0"
                onChange={(e) => (amount = parseInt(e.target.value))}
              />
              <input
                type="date"
                defaultValue={getToday()}
                onChange={(e) => (date = e.target.value)}
              />
              <select name="category" id="category" onChange={(e) => (category = e.target.value)}>
                {/* Create an option for each category in expenseCategories array */}
                {expenseCategories.map((category: string) => 
                  <option value={category}>{category}</option>
                )}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-8 mt-4">
            <button className="hover:text-red-500" onClick={() => setMenuState(!menuState)}>Discard</button>
            <button onClick={newExpense}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
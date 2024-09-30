import { useNewExpenseMenu } from "../stores/menuDisplay-store";
import { useMonthlyExpense } from "../data/expenseData";
import { addExpensesMasterList } from "../data/expenseData";

export function NewExpenseMenu() {
  const menuState = useNewExpenseMenu((state) => state.showMenu);
  const setMenuState = useNewExpenseMenu((state) => state.setMenu);

  const monthlyExpenses = useMonthlyExpense(
    (state: any) => state.storeMonthlyExpenses
  );
  const updateMasterList = useMonthlyExpense(
    (state: any) => state.updateMasterList
  );

  let desc: string = "";
  let amount: number = 0;
  let date: string = "yy-mm-dd";
  let category: string = "Food";

  function newExpense() {
    addExpensesMasterList({
      id: 1,
      month: "jan",
      desc: desc,
      amount: amount,
      date: date,
      category: category,
    });
    setMenuState(!menuState);
    console.log(monthlyExpenses);
    updateMasterList();
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
                placeholder="date"
                onChange={(e) => (date = e.target.value)}
              />
              <select name="category" id="category" onChange={(e) => (category = e.target.value)}>
                <option value="Food" selected>Food</option>
                <option value="Rent">Rent</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
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

// <button onClick={() => {addNewExpense({id: 1, month: 'jan', desc: 'yaaaay', amount: 1000, date: '202aa4!!', category: "fooaaad"}), console.log(monthlyExpenses)}}>asdsad</button>

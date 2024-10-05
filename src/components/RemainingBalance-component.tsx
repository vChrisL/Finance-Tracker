import { useExpensesList, expenseCategories } from "../data/expenseData";

export function RemainingBalance(){
    const masterExpenseList = useExpensesList(state => state.storeExpenses)

    return(
        <>
        <div className="p-4">
            <h2 className="font-semibold text-xl">Remaining Budget:</h2>

            <ul className="">
                {expenseCategories.map((category) => 
                    <p>{category}: $$$</p>
                )}
            </ul>
        </div>
        </>
    )
}
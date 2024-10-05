import { useExpensesList, expenseCategories, useMonthStore } from "../data/expenseData";

export function RemainingBalance(){
    // use storeExpenses store and selectedMonth store
    const masterExpenseList = useExpensesList(state => state.storeExpenses);
    const selectedMonth = useMonthStore(state => state.selectedMonth);

    // number format for currency
    const numberFormat = Intl.NumberFormat("en-CA", {style: "currency", currency: 'CAD'})

    // Handles getting the total for each category
    function getCategoryTotalSpending(targetCategory: string): number{
        let tempTotal: number = 0;

        // for each expense in the master expense list
        masterExpenseList.forEach(expense => {
            // if expense category is equal to the target category; add it's value to the total
            if(expense.category === targetCategory && expense.month === selectedMonth){
                tempTotal += expense.amount;
            }
        });

        return tempTotal;
    }

    return(
        <>
        <div className="p-4">
            <h2 className="font-semibold text-xl">Remaining Budget:</h2>

            <ul className="">
                {expenseCategories.map((category) => 
                    <p>{category}: {numberFormat.format(getCategoryTotalSpending(category))}</p>
                )}
            </ul>
        </div>
        </>
    )
}
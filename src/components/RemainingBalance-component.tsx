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
            <h2 className="font-semibold text-xl mb-2">Remaining Budget:</h2>
            <h2 className="font-semibold text-md">Spending Breakdown</h2>
            <div className="pl-5">
                <ul className="pl-5">
                    {expenseCategories.map((category) => 
                        <li className="list-disc mb-1"><p>{category}: {numberFormat.format(getCategoryTotalSpending(category))}</p></li>
                    )}
                </ul>
            </div>
        </div>
        </>
    )
}
import { useExpensesList, expenseCategories, useMonthStore } from "../data/expenseData";
import { ProgressBar } from "./Progressbar-component";

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
            if(expense.category === targetCategory && (expense.month === selectedMonth || selectedMonth === 'Yearly')){
                tempTotal += expense.amount;
            }
        });

        return tempTotal;
    }

    return(
        <>
        <div className="h-full p-4 overflow-y-auto">
            <h2 className="font-semibold text-xl">Remaining Budget: $000,000</h2>

            <ProgressBar value={91} low={50} mid={60} high={80}></ProgressBar>

            <h2 className="font-semibold text-md">Spending Breakdown For <span className="text-green-500">{selectedMonth}</span></h2>
            <div className="pl-5">
                <ul className="pl-5">
                    {expenseCategories.map((category) => 
                        <li className="list-disc mb-2 px-2 w-fit"><p>{category}: {numberFormat.format(getCategoryTotalSpending(category))}</p></li>
                    )}
                </ul>
            </div>
        </div>
        </>
    )
}
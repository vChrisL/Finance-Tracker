import { useExpensesList, expenseCategories, useMonthStore } from "../data/expenseData";
import { useMonthlyBudgetStore } from "../stores/monthlyBalance-store";
import { ProgressBar } from "./Progressbar-component";

export function RemainingBalance(){
    // use storeExpenses store and selectedMonth store
    const masterExpenseList = useExpensesList(state => state.storeExpenses);
    const selectedMonth = useMonthStore(state => state.selectedMonth);

    const budget = useMonthlyBudgetStore(state => state.budget);

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

    // Handles getting the sum of all expenses
    function getTotalSpending(): number{
        let spending: number = 0;

        // for each expense in the master expense list, sum expenses
        masterExpenseList.forEach(expense => {
            if(expense.month === selectedMonth || selectedMonth === 'Yearly'){
                spending += expense.amount;
            }
        });

        return spending;
    }

    // Handles displaying the proper text for remaining budget display text
    function setRemainingBudgetDisplay(): string{
        if(selectedMonth === 'Yearly'){
            return `Remaining Yearly Budget: ${numberFormat.format((budget * 12) - getTotalSpending())}`
        }
        else return `Remaining Budget: ${numberFormat.format(budget - getTotalSpending())}`
    }
    // Handles setting the proper value for the progress bar component
    function setProgressBarValue(): number{
        if(selectedMonth === 'Yearly'){
            return (getTotalSpending() / (budget * 12)) * 100
        }
        else return (getTotalSpending() / budget) * 100
    }

    return(
        <>
        <div className="h-full p-4 overflow-y-auto">
            <h2 className="font-semibold text-xl text-wrap">{setRemainingBudgetDisplay()}</h2>

            <ProgressBar value={setProgressBarValue()} low={50} mid={60} high={80}></ProgressBar>

            <h2 className="font-semibold text-md mb-1">Spending Breakdown For <span className="text-green-500">{selectedMonth}</span></h2>
            <div className="pl-5">
                <ul className="pl-5">
                    {expenseCategories.map((category) => 
                        <li key={category} className="list-disc mb-1 px-2 w-fit"><p>{category}: {numberFormat.format(getCategoryTotalSpending(category))}</p></li>
                    )}
                </ul>
            </div>
        </div>
        </>
    )
}
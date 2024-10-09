import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, TooltipProps } from "recharts";
import { expenseCategories } from "../data/expenseData";
import { useExpensesList, useMonthStore } from "../data/expenseData";
import { useMonthlyBudgetStore } from "../stores/monthlyBalance-store";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";


export function BarChartDisplay() {
    // use storeExpenses store and selectedMonth store
    const masterExpenseList = useExpensesList(state => state.storeExpenses);
    const selectedMonth = useMonthStore(state => state.selectedMonth);
    const budget = useMonthlyBudgetStore(state => state.budget);

    // use a map to populate this data dynamically depending on categories available
    let data: any = [];

    const BAR_COLORS = {
        'Food': '#0088FE', 
        'Rent': '#00C49F', 
        'Transportation':'#FFBB28', 
        'Utilities':'#FF8042', 
        'Personal':'#a500fe', 
        'Insurance':'#fe009d', 
        'Other':'#17e6d1'
    };

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
    // Handles populating the data array with data from the current month
    function PopulateMonthData(){
        let filteredMonths: any = [];

        // Skip sorting if selected month is Yearly
        if(selectedMonth != 'Yearly'){
            // Get all data for the current selected month and store it
            masterExpenseList.map(expense => {
                if(expense.month === selectedMonth){
                    filteredMonths.push(expense);
                }
            })
        }
        else{
            filteredMonths = masterExpenseList;
        }

        // Calculate the total spending for each category
        expenseCategories.map(category => {
            let categorySpendingSum = 0;

            for(let i = 0; i < filteredMonths.length; i++){
                if(category === filteredMonths[i].category){
                    categorySpendingSum += filteredMonths[i].amount;
                }
            }

            if(categorySpendingSum === 0) return;

            // push the data to data array
            const tempData = {name: category, value: categorySpendingSum};
            data.push(tempData);
        })
    }

    // Render entire pie chart spending breakdown 
    const renderBarChartDisplay = () => {
        PopulateMonthData();

        // Custom tooltip
        const CustomTooltip = ({active, payload}: TooltipProps<ValueType, NameType>)  => {
            if (active && payload && payload.length) {
                return (
                    <div className="bg-white shadow-md shadow-[#b6b6b6] rounded-md p-2">
                        <p>{`${payload[0].payload.name} : $${payload[0].payload.value?.toLocaleString()}`}</p>
                    </div>
                );
            }
            
            return null;
        };

        // if data is empty, display to user that there is no data to be displayed
        if(data === undefined || data.length === 0){
            return(<div className='flex justify-center items-center h-full w-full m-auto text-center text-3xl text-[#b6b6b631]'><p>Nothing To Be Displayed :(</p></div>)
        }
        else{
            return(
                <div className="flex flex-row w-full h-full gap-10 items-center">
                    <BarChart width={900} height={250} data={data}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="value" />
                        <Tooltip content={CustomTooltip} cursor={{opacity: '50%'}}/>
                        <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                </div>
            )
        }
    }

    return (
        <>
        {renderBarChartDisplay()}
        </>
    );
}

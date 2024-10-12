import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { expenseCategories } from "../data/expenseData";
import { useExpensesList, useMonthStore } from "../data/expenseData";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";


export function PieChartDisplay() {
    // use storeExpenses store and selectedMonth store
    const masterExpenseList = useExpensesList(state => state.storeExpenses);
    const selectedMonth = useMonthStore(state => state.selectedMonth);

    // pie chart data
    let data: any = [];

    const RADIAN = Math.PI / 180;
    const PIE_COLORS = {
        'Food': '#0088FE', 
        'Rent': '#00C49F', 
        'Transportation':'#FFBB28', 
        'Utilities':'#FF8042', 
        'Personal':'#a500fe', 
        'Insurance':'#fe009d', 
        'Other':'#d41e47'
    };

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
    // Handles returning the proper color to each category in the pie chart
    function SetPieSectionColor(data: any){
        switch(data.name){
            case 'Food':
                return PIE_COLORS.Food;
            case 'Rent':
                return PIE_COLORS.Rent;
            case 'Transportation':
                return PIE_COLORS.Transportation;
            case 'Utilities':
                return PIE_COLORS.Utilities;
            case 'Personal':
                return PIE_COLORS.Personal;
            case 'Insurance':
                return PIE_COLORS.Insurance;
            case 'Other':
                return PIE_COLORS.Other;
        }
    }

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}: any) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    // Render entire pie chart spending breakdown 
    const renderPieChartDisplay = () => {
        PopulateMonthData();

        // Custom tooltip
        const CustomTooltip = ({active, payload}: TooltipProps<ValueType, NameType>)  => {
            if (active && payload && payload.length) {
                return (
                    <div className="bg-white shadow-md shadow-[#b6b6b6] rounded-md p-2">
                        <p>{`${payload[0].name} : $${payload[0].value?.toLocaleString()}`}</p>
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
                <>
                <div className="flex flex-row w-full h-full gap-10 items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={125}
                            fill="#8884d8"
                            dataKey="value"
                            >
                                {data.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={SetPieSectionColor(entry)} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip/>} cursor={false}></Tooltip>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                </>
            )
        }
    }

    return (
        <>
        {renderPieChartDisplay()}
        </>
    );
}

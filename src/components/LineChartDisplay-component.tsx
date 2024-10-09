import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
    Tooltip,
    TooltipProps,
} from "recharts";
import { expenseCategories } from "../data/expenseData";
import { useExpensesList, useMonthStore } from "../data/expenseData";
import { useMonthlyBudgetStore } from "../stores/monthlyBalance-store";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export function LineChartDisplay() {
    // use storeExpenses store and selectedMonth store
    const masterExpenseList = useExpensesList((state) => state.storeExpenses);
    const selectedMonth = useMonthStore((state) => state.selectedMonth);
    const budget = useMonthlyBudgetStore((state) => state.budget);

    // number format for currency
    const numberFormat = Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    // use a map to populate this data dynamically depending on categories available
    let data: any = [];

    // Handles populating the data array with data from the current month
    function GetMonthlySpending() {
        let spendingByMonth = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };
        // go through each month and calculate the total spending, save this to data
        // this is horrific
        masterExpenseList.map((expense) => {
            switch (expense.month) {
                case "January":
                    spendingByMonth.January += expense.amount;
                    break;
                case "February":
                    spendingByMonth.February += expense.amount;
                    break;
                case "March":
                    spendingByMonth.March += expense.amount;
                    break;
                case "April":
                    spendingByMonth.April += expense.amount;
                    break;
                case "May":
                    spendingByMonth.May += expense.amount;
                    break;
                case "June":
                    spendingByMonth.June += expense.amount;
                    break;
                case "July":
                    spendingByMonth.July += expense.amount;
                    break;
                case "August":
                    spendingByMonth.August += expense.amount;
                    break;
                case "September":
                    spendingByMonth.September += expense.amount;
                    break;
                case "October":
                    spendingByMonth.October += expense.amount;
                    break;
                case "November":
                    spendingByMonth.November += expense.amount;
                    break;
                case "December":
                    spendingByMonth.December += expense.amount;
                    break;
            }
        });

        for(const [key, value] of Object.entries(spendingByMonth)){
            const tempObject = {name: key, value: value}
            data.push(tempObject);
        }
    }

    // Render entire pie chart spending breakdown
    const renderLineChartDisplay = () => {
        GetMonthlySpending();

        // Custom tooltip
        const CustomTooltip = ({active, payload,}: TooltipProps<ValueType, NameType>) => {
            if (active && payload && payload.length) {
                return (
                    <div className="bg-white shadow-md shadow-[#b6b6b6] rounded-md p-2">
                        <p>{`${
                            payload[0].payload.name
                        } : $${payload[0].payload.value?.toLocaleString()}`}</p>
                    </div>
                );
            }

            return null;
        };

        // if data is empty, display to user that there is no data to be displayed
        if (data === undefined || data.length === 0) {
            return (
                <div className="flex justify-center items-center h-full w-full m-auto text-center text-3xl text-[#b6b6b631]">
                    <p>Nothing To Be Displayed :(</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-row w-full h-full gap-10 items-center">
                    <LineChart width={900} height={250} data={data}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="value" />
                        <Tooltip
                            content={CustomTooltip}
                            cursor={{ opacity: "50%" }}
                        />
                        <Line dataKey="value" fill="#22c55e" />
                    </LineChart>
                </div>
            );
        }
    };

    return <>{renderLineChartDisplay()}</>;
}

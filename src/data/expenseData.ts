import { create } from "zustand"

export interface IExpenseData {
    id: number,
    month: string,
    desc: string,
    amount: number,
    date: string, //? change to date type
    category: string, //? change to custom type?
}

// Stores the different possible categories for an expense
export const expenseCategories: string[] = [
    'Food',
    'Rent',
    'Transportation',
    'Utilities',
    'Personal',
    'Insurance',
    'Other',
];


// Stores ALL expenses across every month
let expensesMasterList = [
    {id: 0, month: 'January', desc: 'my desc jan', amount: 100, date: '2024-01-20', category: 'Food'},
    {id: 1, month: 'January', desc: 'January Expense', amount: 1000, date: '2024-01-03', category: 'Other'},
    {id: 2, month: 'January', desc: 'January Expense3', amount: 13, date: '2024-01-02', category: 'Other'},
    {id: 3, month: 'February', desc: 'Feb expense', amount: 4.99, date: '2024-02-07', category: 'Personal'},
    {id: 4, month: 'February', desc: 'Feb expense2', amount: 499, date: '2024-02-06', category: 'Personal'},
    {id: 5, month: 'March', desc: 'Mar expense', amount: 60, date: '2024-03-23', category: 'Food'},
    {id: 6, month: 'March', desc: 'Mar expense2', amount: 1, date: '2024-03-20', category: 'Utilities'},
] as IExpenseData[]

// Define MonthlyExpenseStore type
type MonthlyExpenseStore = {
    storeMonthlyExpenses: IExpenseData[],
    updateMasterList: (masterList: [{}]) => void,
}
// Create zustand store
export const useMonthlyExpense = create((set) => ({
    // set store monthly expenses to be a copy of expensesMasterList
    storeMonthlyExpenses: [...expensesMasterList],
    // Update storeMonthlyExpenses to reflect expensesMasterList
    updateMasterList: (masterList: [{}]) => {
        set(() => ({storeMonthlyExpenses: expensesMasterList}));
    },
}));
// Handles adding new expenses to expensesMasterList
export function addExpensesMasterList({id, month, desc, amount, date, category}: IExpenseData){
    const newExpense = {id: id, month: month, desc: desc, amount: amount, date: date, category: category};
    expensesMasterList.push(newExpense);
    console.log(expensesMasterList)
}
// Handles deleting expenses from expensesMasterList
export function removeExpenseFromMasterList(id: number){
    expensesMasterList.splice(id, 1);
    expensesMasterList = [...expensesMasterList];

    // For each expense in expensesMasterList, if current expense.id != the index, shift the ID down by 1
    expensesMasterList.forEach((expense, index) => {
        if(expense.id != index){
            expense.id -= 1;
        }
    })
    console.log(expensesMasterList)
}

type MonthStore = {
    selectedMonth: string,
    setSelectedMonth: (newMonth: string) => void,
}

export const useMonthStore = create<MonthStore>((set) => ({
    selectedMonth: 'January',
    setSelectedMonth: (newMonth) => {
        set(() => ({selectedMonth: newMonth}))
    }
}))

// use local storage
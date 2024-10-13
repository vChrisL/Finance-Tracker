import { create } from "zustand"

export interface IExpenseData {
    id: number,
    month: string,
    desc: string,
    amount: number,
    date: string, 
    category: string,
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
let expensesMasterList = [] as IExpenseData[]

expensesMasterList = JSON.parse(localStorage.getItem('expenseData') ?? '[]');

// Define MonthlyExpenseStore type
type MonthlyExpenseStore = {
    storeExpenses: IExpenseData[],
    updateMasterList: () => void,
}

// Create zustand store
export const useExpensesList = create<MonthlyExpenseStore>((set) => ({
    // set store monthly expenses to be a copy of expensesMasterList
    storeExpenses: [...expensesMasterList],
    // Update storeMonthlyExpenses to reflect expensesMasterList
    updateMasterList: () => {
        set(() => ({storeExpenses: expensesMasterList}));
        // Add storeExpense to local storage
        localStorage.setItem('expenseData', JSON.stringify(expensesMasterList));
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


// Create month store type
type MonthStore = {
    selectedMonth: string,
    setSelectedMonth: (newMonth: string) => void,
}

// Create new store to store and update selected month
export const useMonthStore = create<MonthStore>((set) => ({
    selectedMonth: 'January',
    setSelectedMonth: (newMonth) => {
        set(() => ({selectedMonth: newMonth}))
    }
}))

// use local storage
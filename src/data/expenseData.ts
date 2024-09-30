import { create } from "zustand"

export interface IExpenseData {
    id: number,
    month: string,
    desc: string,
    amount: number,
    date: string, //? change to date type
    category: string, //? change to custom type?
}

// let MonthlyExpenses = [
//     {id: 0, desc: 'my desc', amount: 100, date: '2024-09-20', category: 'Food'}
// ] as IExpenseData[]

// Stores ALL expenses across every month
let expensesMasterList = [
    {id: 0, month: 'jan', desc: 'my desc jan', amount: 100, date: '2024-09-20', category: 'Food'},
    {id: 1, month: '1', desc: '1', amount: 1, date: '1', category: '1'},
    {id: 2, month: '2', desc: '2', amount: 2, date: '2', category: '2'},
]

// Define MonthlyExpenseStore type
type MonthlyExpenseStore = {
    storeMonthlyExpenses: IExpenseData[],
    updateMasterList: (masterList: [{}]) => void,
}
// Create zustand store
export const useMonthlyExpense = create((set) => ({
    storeMonthlyExpenses: [...expensesMasterList],

    // Update storeMonthlyExpenses to reflect expensesMasterList
    updateMasterList: (masterList: [{}]) => {
        set(() => ({storeMonthlyExpenses: expensesMasterList}));
    }
    
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
    console.log(expensesMasterList)
}

// use local storage
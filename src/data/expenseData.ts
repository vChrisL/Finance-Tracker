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

let expensesMasterList = [
    {id: 0, month: 'jan', desc: 'my desc jan', amount: 100, date: '2024-09-20', category: 'Food'},
]

type MonthlyExpenseStore = {
    storeMonthlyExpenses: IExpenseData[],
    updateMasterList: (masterList: [{}]) => void,
}
export const useMonthlyExpense = create((set) => ({
    storeMonthlyExpenses: [...expensesMasterList],

    updateMasterList: (masterList: [{}]) => {
        set(() => ({storeMonthlyExpenses: expensesMasterList}))
    }
    
}));

export function addExpensesMasterList({id, month, desc, amount, date, category}: IExpenseData){
    const newExpense = {id: id, month: month, desc: desc, amount: amount, date: date, category: category};
    expensesMasterList.push(newExpense);
}

// use local storage
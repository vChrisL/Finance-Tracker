import { create } from "zustand";

type ExpenseStore = {
    id: number,
    updateID: (newID: number) => void,
    desc: string,
    updateDesc: (newDesc: string) => void,
}

type MonthlyExpenseData = {
    id: number,
    month: string,
    expenses: [],
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
    id: 0,
    updateID: (newID: number) => set(() => ({id: newID})),
    desc: '',
    updateDesc: (newDesc: string) => set(() => ({desc: newDesc}))
}));

// const expenseID = useExpenseDataStore((state) => state.id);
// const updateExpenseID = useExpenseDataStore((state) => state.updateID);
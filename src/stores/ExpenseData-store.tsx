import { create } from "zustand";

type ExpenseDataStore = {
    id: number,
    updateID: (newID: number) => void,
    desc: string,
    updateDesc: (newDesc: string) => void,
}

export const useExpenseDataStore = create<ExpenseDataStore>((set) => ({
    id: 0,
    updateID: (newID: number) => set(() => ({id: newID})),
    desc: '',
    updateDesc: (newDesc: string) => set(() => ({desc: newDesc}))
}));

// const expenseID = useExpenseDataStore((state) => state.id);
// const updateExpenseID = useExpenseDataStore((state) => state.updateID);
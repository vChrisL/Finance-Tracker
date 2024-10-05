import { create } from "zustand";

type MonthlyBudget = {
    budget: number,
    updateBudget: (newBudget: number) => void,
}

export const useMonthlyBudgetStore = create<MonthlyBudget>((set) => ({
    budget: 5000,

    updateBudget: (newBudget) => {
        set(() => ({budget: newBudget}))
    }
}))
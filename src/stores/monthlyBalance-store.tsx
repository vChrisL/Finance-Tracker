import { create } from "zustand";

type MonthlyBudget = {
    budget: number,
    updateBudget: (newBudget: number) => void,
}

export const useMonthlyBudgetStore = create<MonthlyBudget>((set) => ({
    budget: JSON.parse(localStorage.getItem('monthlyBudget') ?? '5000'),

    updateBudget: (newBudget) => {
        set(() => ({budget: newBudget}));
        // Store monthly budget into localstorage
        localStorage.setItem('monthlyBudget', JSON.stringify(newBudget));
    }
}))
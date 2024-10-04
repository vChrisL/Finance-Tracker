import { create } from "zustand";

// New menu store type
type MenuStore = {
    showMenu: boolean,
    setMenu: (newValue: boolean) => void,
}
// Create a new store to store and update new expense creation menu state
export const useNewExpenseMenu = create<MenuStore>((set) => ({
    showMenu: false,
    setMenu: (newValue: boolean) => {
        set(() => ({showMenu: newValue}))
    }
}));

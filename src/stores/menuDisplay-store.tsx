import { create } from "zustand";

type MenuStore = {
    showMenu: boolean,
    setMenu: (newValue: boolean) => void,
}

export const useNewExpenseMenu = create<MenuStore>((set) => ({
    showMenu: false,
    setMenu: (newValue: boolean) => {
        set(() => ({showMenu: newValue}))
    }
}));

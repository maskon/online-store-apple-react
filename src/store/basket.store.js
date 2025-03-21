import {create} from 'zustand'

export const useStoreBasket = create((set) => ({
    basket: false,

    openBasket: () => set({ basket: true }),
    closeBasket: () => set({ basket: false })
}))
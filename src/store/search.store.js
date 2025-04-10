import {create} from 'zustand'

export const useStoreSearch = create((set) => ({
    change: '',

    setChange: (newValue) => set({ change: newValue })
}))
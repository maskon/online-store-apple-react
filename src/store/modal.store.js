import {create} from 'zustand'

export const useStoreModal = create((set) => ({
    modal: false,

    openModal: () => set({ modal: true }),
    closeModal: () => set({ modal: false })
}))
import {create} from 'zustand'
import axios from 'axios'

export const useStore = create((set) => ({
    products: [], // Хранение продуктов
    cart: [], // Хранение товаров в корзине
    filteres: [], // Фильтрация массивс продуктов products

    basket: false, // Состояние корзины
    modal: false, // Состояние модалки

    fetchProducts: async () => {
        try {
            const response = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product")
            set({ products: response.data });
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error)
        }
    },

    addToCart: (product) => set((state) => {
        const exists = state.cart.some(item => item.id === product.id)
        if (!exists) {
            return { cart: [...state.cart, product] }
        }
        return state
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(product => product.id !== productId)
    })),

    resetCart: () => set({ cart: [] }),

    filterProducts: (change) => set((state) => ({
        filteres: state.products.filter((product) => product.title.toLowerCase().includes(change))
    })),

    openBasket: () => set({ basket: true }),
    closeBasket: () => set({ basket: false }),

    openModal: () => set({ modal: true }),
    closeModal: () => set({ modal: false })
}))
import {create} from 'zustand'
import axios from 'axios'

export const useStore = create((set) => ({
    products: [], // Хранение продуктов
    cart: [], // Хранение товаров в корзине

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
    }))
}))

// export const useModal = create((set) => ({
//     confirm: {
//         show: false,
//         // Метод для открытия модального окна
//         open: () => {
//             set({ confirm: { show: true } })
//         },
//         // Метод для закрытия модального окна
//         close: () => {
//             set({ confirm: { show: false } })
//         },
//     }
// }))
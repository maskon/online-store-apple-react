import {create} from 'zustand'

export const useStore = create((set) => ({
    products: [], // Хранение продуктов
    cart: [], // Хранение товаров в корзине

    fetchProducts: async () => {
        const response = await fetch("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product");
        const data = await response.json();
        set({ products: data });
    },

    addToCart: (product) => set((state) => {
        const exists = state.cart.some(item => item.id === product.id);
        if (!exists) {
            return { cart: [...state.cart, product] };
        }
        return state;
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(product => product.id !== productId)
    }))
}))
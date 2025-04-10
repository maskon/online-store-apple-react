import {create} from 'zustand'

import { fetchProducts } from '../api/productApi'
import { filterSearch } from '../api/searchApi'

export const useStore = create((set) => ({
    products: [],
    currentProduct: null,
    cart: localStorage.getItem("storeCart") ? JSON.parse(localStorage.getItem("storeCart")) : [],
    favorites: localStorage.getItem("storeFavorites") ? JSON.parse(localStorage.getItem("storeFavorites")) : [],
    product: ["Все", "MacBook", "iPhone", "iMac"],
    loading: true,
    activeCategory: 0,
    currentPage: 1,
    isActive: 0,
    limit: 8, 

    fetchProducts: async (item = null, page = 1, limit = 8) => {
        set({ loading: true })
        try {
            const { products, totalPages } = await fetchProducts(item, page, limit)
            set({ 
                products,
                totalPages,
                loading: false
            })
        } catch (error) {
            set({ loading: false })
        }
    },
    
    filterSearch: async (searchQuery, page = 1, limit = 3) => {
        set({ loading: true })
        try {
            const { products, totalPages } = await filterSearch(searchQuery, page, limit)
            set({ products, totalPages, loading: false })
        } catch (error) {
            set({ loading: false })
        }
    },
    
    setCurrentProduct: (product) => set({ currentProduct: product }),

    addToCart: (product) => set((state) => {
        const exists = state.cart.some(item => item.id === product.id)
        if (!exists) {
            localStorage.setItem("storeCart", JSON.stringify([...state.cart, product]))
            return { cart: [...state.cart, product] }
        }
        return state
    }),

    removeFromCart: (productId) => set((state) => {
        const updatedCart = state.cart.filter(product => product.id !== productId)
        localStorage.setItem("storeCart", JSON.stringify(updatedCart))
        return { cart: updatedCart }
    }),

    resetCart: () => set({ cart: [] }),

    addToFavorites: (product) => set((state) => {
        const exists = state.favorites.some(item => item.id === product.id)
        if (!exists) {
            localStorage.setItem("storeFavorites", JSON.stringify([...state.favorites, product]))
            return { favorites: [...state.favorites, product] }
        }
        return state
    }),

    removeFromFavorites: (productId) => set((state) => {
        const updatedFavorites = state.favorites.filter(product => product.id !== productId)
        localStorage.setItem("storeFavorites", JSON.stringify(updatedFavorites))
        return { favorites: updatedFavorites }
    }),

    setActiveCategory: (index) => set({ activeCategory: index }),

    setCurrentPage: (index) => {
        set((state) => ({
          currentPage: Math.max(1, Math.min(index, state.totalPages))
        }))
      },

    setIsActive: (index) => set({ isActive: index }),
}))
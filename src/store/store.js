import {create} from 'zustand'

import { fetchProducts } from '../api/productApi'
import { filterSearch } from '../api/searchApi'

export const useStore = create((set) => ({
    products: [],
    cart: [],
    favorites: [],
    product: ["Все", "MacBook", "iPhone", "iMac"],
    loading: true,
    activeCategory: 0,
    currentPage: 1,
    isActive: 0,
    limit: 3,

    fetchProducts: async (item = null, page = 1, limit = 3) => {
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

    addToFavorites: (product) => set((state) => {
        const exists = state.favorites.some(item => item.id === product.id)
        if (!exists) {
            return { favorites: [...state.favorites, product] }
        }
        return state
    }),

    removeFromFavorites: (productId) => set((state) => ({
        favorites: state.favorites.filter(product => product.id !== productId)
    })),

    setActiveCategory: (index) => set({ activeCategory: index }),

    setCurrentPage: (index) => {
        set((state) => ({
          currentPage: Math.max(1, Math.min(index, state.totalPages))
        }))
      },

    setIsActive: (index) => set({ isActive: index }),

    //   goToNextPage: async () => {
        
    //     set((state) => ({
    //       currentPage: Math.min(state.currentPage + 1, state.totalPages)  
    //     }))
    //   },

    //   goToPreviousPage: () => {
    //     set((state) => ({
    //       currentPage: Math.max(state.currentPage - 1, 1)
    //     }))
    //   },
}))
import {create} from 'zustand'
import axios from 'axios'

export const useStore = create((set) => ({
    products: [], // Хранение продуктов
    cart: [], // Хранение товаров в корзине
    favorites: [], // Хранение избранного

    loading: true,

    basket: false, // Состояние корзины
    modal: false, // Состояние модалки

    activeCategory: 0,
    currentPage: 1,
    isActive: 0,

    product: ["Все", "MacBook", "iPhone", "iMac"],

    fetchProducts: async (item = null, page = 1, limit = 3) => {
        set({ loading: true }); // Начинаем загрузку
        try {
            const params = { page, limit };
    
            // Если категория "все", просто не передаем параметр category
            if (item && item !== 'все') {
                params.category = item; 
            }
    
            // Получаем продукты
            const response = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", { params });
    
            // Получаем общее количество элементов
            const totalResponse = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", {
                params: item && item !== 'все' ? { category: item } : {}
            });
    
            const totalCount = totalResponse.data.length;
    
            set({ 
                products: response.data, // Обновляем продукты
                totalPages: Math.ceil(totalCount / limit), // Рассчитываем общее количество страниц
                loading: false // Завершаем загрузку
            });
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
            set({ loading: false }); // Завершите загрузку в случае ошибки
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

    filterSearch: async (searchQuery, page = 1, limit = 10) => {
        set({ loading: true }); // Начните загрузку
        try {
            set({ products: [] }); // Очищаем продукты перед загрузкой новых
            const response = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", {
                params: {
                    search: searchQuery, // Параметр поиска
                    page,
                    limit,
                },
            });
            const responseDataAll = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product")
            const totalCount = Number(responseDataAll.data.length)
            set({ 
                products: response.data, // Обновляем продукты
                totalPages: Math.ceil(totalCount / limit), // Рассчитываем общее количество страниц
                loading: false // Завершите загрузку
            });
        } catch (error) {
            console.error("Ошибка при поиске продуктов:", error);
        }
    },  

    openBasket: () => set({ basket: true }),
    closeBasket: () => set({ basket: false }),

    openModal: () => set({ modal: true }),
    closeModal: () => set({ modal: false }),

    setActiveCategory: (index) => set({ activeCategory: index }),

    setCurrentPage: (index) => {
        set((state) => ({
          currentPage: Math.max(1, Math.min(index, state.totalPages))
        }))
      },

      goToNextPage: async () => {
        
        set((state) => ({
          currentPage: Math.min(state.currentPage + 1, state.totalPages)  
        }))
      },

      goToPreviousPage: () => {
        set((state) => ({
          currentPage: Math.max(state.currentPage - 1, 1)
        }))
      },

      setIsActive: (index) => set({ isActive: index })
}))
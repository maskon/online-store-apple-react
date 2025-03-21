import axios from 'axios'

export const filterSearch = async (searchQuery, page = 1, limit) => {
    try {
        const response = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", {
            params: {
                search: searchQuery,
                page,
                limit,
            },
        })
        
        const responseDataAll = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", {
            params: {
                search: searchQuery,
            },
        })
        
        const totalCount = Number(responseDataAll.data.length)
        
        return {
            products: response.data,
            totalPages: Math.ceil(totalCount / limit),
        }
    } catch (error) {
        console.error("Ошибка при поиске продуктов:", error)
        throw error
    }
}

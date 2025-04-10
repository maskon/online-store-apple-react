import axios from 'axios';

export const fetchProducts = async (item = null, page = 1, limit = 3) => {
    const params = { page, limit };
    
    if (item && item !== 'все') {
        params.category = item;
    }
    
    try {
        // Получаем продукты
        const response = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", { params });
        
        // Получаем общее количество элементов
        const totalResponse = await axios.get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product", {
            params: item && item !== 'все' ? { category: item } : {}
        });

        const totalCount = totalResponse.data.length;

        return {
            products: response.data,
            totalPages: Math.ceil(totalCount / limit),
        };
    } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
        throw error; // Бросаем ошибку для обработки в вызовах
    }
}

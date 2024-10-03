const API_BASE_URL = "https://localhost:7129"

export interface FavouriteRequest {
    userId: string
    animalId: string
}

export const FavouriteService = {
    async getAllFavourites() {
        const response = await fetch(`${API_BASE_URL}/Favourites`);

        return response.json();
    },

    async getFavouriteByUserIdAndAnimalId(favouriteRequest: FavouriteRequest) {
        const response = await fetch(`${API_BASE_URL}/Favourites/byUserAndAnimal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favouriteRequest)
        });
    
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Ошибка при получении избранного: ${error}`);
        }
    
        // Проверяем, есть ли вообще содержимое в ответе перед попыткой его парсить
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            try {
                const favouriteResponse = await response.json();
                return favouriteResponse;
            } catch (error) {
                throw new Error("Ошибка парсинга JSON: " + error);
            }
        } else {
            // Если содержимого нет или формат не JSON, возвращаем null или обрабатываем этот случай
            return null;
        }
    },

    async getFavouritesByUserId(id: string) {
        const response = await fetch(`${API_BASE_URL}/Favourites/byUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        });
    
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
    
        return response.json();
    },

    async createFavourite(favouriteRequest: FavouriteRequest) {
        await fetch(`${API_BASE_URL}/Favourites`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favouriteRequest),
        });
    },

    async updateFavourite(id: string, favouriteRequest: FavouriteRequest) {
        await fetch(`${API_BASE_URL}/Favourites/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favouriteRequest),
        });
    },

    async deleteFavourite(id: string) {
        await fetch(`${API_BASE_URL}/Favourites/${id}`, {
            method: "DELETE",
        });
    },
}
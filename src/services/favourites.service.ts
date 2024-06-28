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
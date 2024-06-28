const API_BASE_URL = "https://localhost:7129"

export interface BreedRequest {
    name: string
}

export const BreedService = {
    async getAllBreeds() {
        const response = await fetch(`${API_BASE_URL}/Breeds`);

        return response.json();
    },

    async createBreed(breedRequest: BreedRequest) {
        await fetch(`${API_BASE_URL}/Breeds`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(breedRequest),
        });
    },

    async updateBreed(id: string, breedRequest: BreedRequest) {
        await fetch(`${API_BASE_URL}/Breeds/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(breedRequest),
        });
    },

    async deleteBreed(id: string) {
        await fetch(`${API_BASE_URL}/Breeds/${id}`, {
            method: "DELETE",
        });
    },
}
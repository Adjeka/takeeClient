const API_BASE_URL = "https://localhost:7129"

export interface TypeOfAnimalsRequest {
    name: string
}

export const TypeOfAnimalsService = {
    async getAllTypesOfAnimals() {
        const response = await fetch(`${API_BASE_URL}/TypesOfAnimals`);

        return response.json();
    },

    async createTypeOfAnimals(typeOfAnimalsRequest: TypeOfAnimalsRequest) {
        await fetch(`${API_BASE_URL}/TypesOfAnimals`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(typeOfAnimalsRequest),
        });
    },

    async updateTypeOfAnimals(id: string, typeOfAnimalsRequest: TypeOfAnimalsRequest) {
        await fetch(`${API_BASE_URL}/TypesOfAnimals/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(typeOfAnimalsRequest),
        });
    },

    async deleteTypeOfAnimals(id: string) {
        await fetch(`${API_BASE_URL}/TypesOfAnimals/${id}`, {
            method: "DELETE",
        });
    },
}
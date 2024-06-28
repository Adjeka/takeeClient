const API_BASE_URL = "https://localhost:7129"

export interface CuratorRequest {
    surname: string
    name: string
    patronymic: string
    email: string
    phoneNumber: string
}

export const CuratorService = {
    async getAllCurators() {
        const response = await fetch(`${API_BASE_URL}/Curators`);

        return response.json();
    },

    async createCurator(curatorRequest: CuratorRequest) {
        await fetch(`${API_BASE_URL}/Curators`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(curatorRequest),
        });
    },

    async updateCurator(id: string, curatorRequest: CuratorRequest) {
        await fetch(`${API_BASE_URL}/Curators/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(curatorRequest),
        });
    },

    async deleteCurator(id: string) {
        await fetch(`${API_BASE_URL}/Curators/${id}`, {
            method: "DELETE",
        });
    },
}
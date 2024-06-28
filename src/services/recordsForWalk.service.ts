const API_BASE_URL = "https://localhost:7129"

export interface RecordForWalkRequest {
    userId: string
    animalId: string
}

export const RecordForWalkService = {
    async getAllRecordsForWalk() {
        const response = await fetch(`${API_BASE_URL}/RecordsForWalk`);

        return response.json();
    },

    async createRecordForWalk(recordForWalkRequest: RecordForWalkRequest) {
        await fetch(`${API_BASE_URL}/RecordsForWalk`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(recordForWalkRequest),
        });
    },

    async updateRecordForWalk(id: string, recordForWalkRequest: RecordForWalkRequest) {
        await fetch(`${API_BASE_URL}/RecordsForWalk/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(recordForWalkRequest),
        });
    },

    async deleteRecordForWalk(id: string) {
        await fetch(`${API_BASE_URL}/RecordsForWalk/${id}`, {
            method: "DELETE",
        });
    },
}
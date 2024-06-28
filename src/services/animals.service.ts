const API_BASE_URL = "https://localhost:7129"

export interface AnimalRequest {
    nickname: string
    typeOfAnimalsId: string
    breedId: string
    height: number
    weight: number
    gender: string
    dateOfBirth: Date
    color: string
    distinguishingMark: string
    description: string
    curatorId: string
    photo: File | null
}

export const AnimalService = {
    async getAllAnimals() {
        const response = await fetch(`${API_BASE_URL}/Animals`);

        return response.json();
    },

    async createAnimal(animalRequest: AnimalRequest) {
        const formData = new FormData();
        
        formData.append("nickname", animalRequest.nickname);
        formData.append("typeOfAnimalsId", animalRequest.typeOfAnimalsId);
        formData.append("breedId", animalRequest.breedId);
        formData.append("height", animalRequest.height.toString());
        formData.append("weight", animalRequest.weight.toString());
        formData.append("gender", animalRequest.gender);
        formData.append("dateOfBirth", animalRequest.dateOfBirth.toDateString());
        formData.append("color", animalRequest.color);
        formData.append("distinguishingMark", animalRequest.distinguishingMark);
        formData.append("description", animalRequest.description);
        formData.append("curatorId", animalRequest.curatorId);
        if (animalRequest.photo) {
            formData.append("photo", animalRequest.photo);
        }

        await fetch(`${API_BASE_URL}/Animals`, {
            method: "POST",
            body: formData,
        });
        
        // await fetch(`${API_BASE_URL}/Animals`, {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json", //"multipart/form-data"
        //     },
        //     body: JSON.stringify(animalRequest),
        // });
    },

    async updateAnimal(id: string, animalRequest: AnimalRequest) {
        const formData = new FormData();
        
        formData.append("nickname", animalRequest.nickname);
        formData.append("typeOfAnimalsId", animalRequest.typeOfAnimalsId);
        formData.append("breedId", animalRequest.breedId);
        formData.append("height", animalRequest.height.toString());
        formData.append("weight", animalRequest.weight.toString());
        formData.append("gender", animalRequest.gender);
        formData.append("dateOfBirth", animalRequest.dateOfBirth.toDateString());
        formData.append("color", animalRequest.color);
        formData.append("distinguishingMark", animalRequest.distinguishingMark);
        formData.append("description", animalRequest.description);
        formData.append("curatorId", animalRequest.curatorId);
        if (animalRequest.photo) {
            formData.append("photo", animalRequest.photo);
        }

        await fetch(`${API_BASE_URL}/Animals/${id}`, {
            method: "PUT",
            body: formData,
        });
        
        // await fetch(`${API_BASE_URL}/Animals/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "content-type": "application/json", //"multipart/form-data"
        //     },
        //     body: JSON.stringify(animalRequest),
        // });
    },

    async deleteAnimal(id: string) {
        await fetch(`${API_BASE_URL}/Animals/${id}`, {
            method: "DELETE",
        });
    },
}
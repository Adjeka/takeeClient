const API_BASE_URL = "https://localhost:7129"

export interface UserRequest {
    surname: string
    name: string
    patronymic: string
    dateOfBirth: Date
    email: string
    phoneNumber: string
    userRoleId: string
    login: string
    password: string
}

export interface LoginRequest {
    login: string
    password: string
}

export interface RegisterRequest {
    surname: string
    name: string
    patronymic: string
    dateOfBirth: Date
    email: string
    phoneNumber: string
    login: string
    password: string
}

export const UserService = {
    async getAllUsers() {
        const response = await fetch(`${API_BASE_URL}/Users`);

        return response.json();
    },

    async createUser(userRequest: UserRequest) {
        await fetch(`${API_BASE_URL}/Users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userRequest),
        });
    },

    async updateUser(id: string, userRequest: UserRequest) {
        await fetch(`${API_BASE_URL}/Users/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userRequest),
        });
    },

    async deleteUser(id: string) {
        await fetch(`${API_BASE_URL}/Users/${id}`, {
            method: "DELETE",
        });
    },

    async login(loginRequest: LoginRequest) {
        const response = await fetch(`${API_BASE_URL}/Users/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginRequest),
        });
    
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Ошибка при получении токена: ${error}`);
        }
    
        const tokenResponse = await response.json();
        return tokenResponse;
    },

    async register(registerRequest: RegisterRequest) {
        await fetch(`${API_BASE_URL}/Users/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(registerRequest),
        });
    },
}
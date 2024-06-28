const API_BASE_URL = "https://localhost:7129"

export interface UserRoleRequest {
    name: string
}

export const UserRoleService = {
    async getAllUserRoles() {
        const response = await fetch(`${API_BASE_URL}/UserRoles`);

        return response.json();
    },

    async createUserRole(userRoleRequest: UserRoleRequest) {
        await fetch(`${API_BASE_URL}/UserRoles`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userRoleRequest),
        });
    },

    async updateUserRole(id: string, userRoleRequest: UserRoleRequest) {
        await fetch(`${API_BASE_URL}/UserRoles/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userRoleRequest),
        });
    },

    async deleteUserRole(id: string) {
        await fetch(`${API_BASE_URL}/UserRoles/${id}`, {
            method: "DELETE",
        });
    },
}
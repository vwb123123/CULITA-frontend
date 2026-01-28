import { httpClient } from "./axios";
import type { User } from "../types/user";
import type {
    CreateUserRequest,
    UpdateUserRequest,
    UserListResponse,
} from "../types/admin.user.ts";

export const fetchUsers = async (page: number, limit: number) => {
    const response = await httpClient.get<UserListResponse>("/admin/users", {
        params: { page, limit },
    });
    return response.data;
};

export const fetchUser = async (userId: number) => {
    const response = await httpClient.get<{ data: User }>(
        `/admin/users/${userId}`,
    );
    return response.data.data;
};

export const createUser = async (data: CreateUserRequest) => {
    const response = await httpClient.post<{ message: string; data: User }>(
        "/admin/users",
        data,
    );
    return response.data;
};

export const updateUser = async (userId: number, data: UpdateUserRequest) => {
    const response = await httpClient.put<{ message: string; data: User }>(
        `/admin/users/${userId}`,
        data,
    );
    return response.data;
};

export const deleteUser = async (userId: number) => {
    const response = await httpClient.delete<{
        message: string;
        deletedId: number;
    }>(`/admin/users/${userId}`);
    return response.data;
};

import type { User } from "./user.ts";

export interface AdminUserPagination {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    name: string;
    password: string;
    phoneNumber?: string;
    birthdate?: string;
    gender?: "MALE" | "FEMALE";
    role?: "USER" | "ADMIN";
}

export interface UpdateUserRequest {
    email?: string;
    password?: string;
    name?: string;
    phoneNumber?: string;
    birthdate?: string;
    gender?: "MALE" | "FEMALE";
    role?: "USER" | "ADMIN";
}

export interface UserListResponse {
    data: User[];
    pagination: AdminUserPagination;
}

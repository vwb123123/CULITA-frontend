export interface AdminUserData {
    id: number;
    createdAt: string;
    updatedAt: string;
    username: string;
    name?: string;
    email: string;
    phoneNumber: string | null;
    role: "USER" | "ADMIN";
    gender: "MALE" | "FEMALE" | null;
    birthYear: string | null;
    birthMonth: string | null;
    birthDay: string | null;
    zipCode?: string;
    address1?: string;
    address2?: string;
}

export interface UserQueryParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface AdminUserPagination {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface UserListResponse {
    message: string;
    data: AdminUserData[];
    pagination: AdminUserPagination;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    name: string;
    password: string;
    phoneNumber?: string;
    role?: "USER" | "ADMIN";
    gender?: "MALE" | "FEMALE";
    zipCode?: string;
    address1?: string;
    address2?: string;
    birthYear?: string;
    birthMonth?: string;
    birthDay?: string;
}

export interface UpdateUserRequest {
    email?: string;
    password?: string;
    name?: string;
    phoneNumber?: string;
    role?: "USER" | "ADMIN";
    gender?: "MALE" | "FEMALE";
    zipCode?: string;
    address1?: string;
    address2?: string;
    birthYear?: string;
    birthMonth?: string;
    birthDay?: string;
}

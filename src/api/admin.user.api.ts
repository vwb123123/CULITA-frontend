import { httpClient } from "./axios";
import type {
    CreateUserRequest,
    UserListResponse,
    AdminUserData,
    UserQueryParams,
} from "../types/admin.user.ts";
import type { UpdateUserRequest } from "../types/user.ts";

// [관리자] 사용자 목록 조회
export const fetchUsers = async (params: UserQueryParams) => {
    const response = await httpClient.get<UserListResponse>("/admin/users", {
        params,
    });
    return response.data;
};

// [관리자] 사용자 상세 조회
export const fetchUser = async (userId: number) => {
    const response = await httpClient.get<{
        message: string;
        data: AdminUserData;
    }>(`/admin/users/${userId}`);
    return response.data.data;
};

// [관리자] 사용자 생성
export const createUser = async (data: CreateUserRequest) => {
    const response = await httpClient.post<{
        message: string;
        data: AdminUserData;
    }>("/admin/users", data);
    return response.data;
};

// [관리자] 사용자 정보 수정
export const updateUser = async (
    userId: number,
    data: Partial<UpdateUserRequest>,
) => {
    const response = await httpClient.put<{
        message: string;
        data: AdminUserData;
    }>(`/admin/users/${userId}`, data);
    return response.data;
};

// [관리자] 사용자 삭제
export const deleteUser = async (userId: number) => {
    const response = await httpClient.delete<{
        message: string;
        deletedId: number;
    }>(`/admin/users/${userId}`);
    return response.data;
};

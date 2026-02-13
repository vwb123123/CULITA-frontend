import { httpClient } from "./axios";
import type {
    UpdateUserRequest,
    UpdateUserResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from "../types/user";

// 내 정보 수정
export const updateMyInfo = async (data: UpdateUserRequest) => {
    const response = await httpClient.put<UpdateUserResponse>(
        "/users/me",
        data,
    );
    return response.data;
};

// 비밀번호 변경
export const updateMyPassword = async (data: UpdatePasswordRequest) => {
    const response = await httpClient.patch<UpdatePasswordResponse>(
        "/users/me/password",
        data,
    );
    return response.data;
};

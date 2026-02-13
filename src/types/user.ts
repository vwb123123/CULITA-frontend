export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    phoneNumber: string;
    zipCode: string;
    address1: string;
    address2?: string;
    role: "USER" | "ADMIN";
    gender: "MALE" | "FEMALE";
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    createdAt: string;
    updatedAt: string;
}

// 사용자 정보 수정 요청
export interface UpdateUserRequest {
    name?: string;
    phoneNumber?: string;
    gender?: "MALE" | "FEMALE";
    zipCode?: string;
    address1?: string;
    address2?: string;
    birthYear?: string;
    birthMonth?: string;
    birthDay: string;
}

// 사용자 정보 수정 응답
export interface UpdateUserResponse {
    message: string;
    data: User;
}

// 비밀번호 변경 요청
export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

// 비밀번호 변경 응답
export interface UpdatePasswordResponse {
    message: string;
}

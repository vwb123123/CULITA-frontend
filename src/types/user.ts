export interface RegisterResponse {
    message: string;
    data: User;
}

export interface User {
    id: number;
    username: string;
    password: string;
    password_confirm: string;
    name: string;
    phoneNumber: string;
    email: string;
    role: "USER" | "ADMIN";
    createdAt: string;
    updatedAt: string;
}

export interface LoginFormType {
    username: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    data: {
        token: string;
        user: User;
    };
}

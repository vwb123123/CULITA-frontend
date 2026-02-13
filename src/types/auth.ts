export interface RegisterResponse {
    message: string;
    data: Auth;
}

export interface Auth {
    id: number;
    username: string;
    password?: string;
    password_confirm?: string;
    name: string;
    phoneNumber: string;
    email: string;
    zipCode: string;
    address1: string;
    address2?: string;
    gender: "MALE" | "FEMALE";
    birthYear: string;
    birthMonth: string;
    birthDay: string;
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
        token?: string;
        user: Auth;
    };
}

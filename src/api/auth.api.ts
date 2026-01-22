import type {
    LoginFormType,
    LoginResponse,
    RegisterResponse,
} from "../types/user.ts";
import { httpClient } from "./axios.ts";
import type { RegisterFormType } from "../pages/account/Register.tsx";

export const registerUser = async (data: RegisterFormType) => {
    const response = await httpClient.post<RegisterResponse>(
        "auth/register",
        data,
        {
            headers: {
                Authorization: undefined,
            },
        },
    );
    return response.data;
};

export const loginUser = async (data: LoginFormType) => {
    const response = await httpClient.post<LoginResponse>("auth/login", data, {
        headers: {
            Authorization: undefined,
        },
    });
    return response.data;
};

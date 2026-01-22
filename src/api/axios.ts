import axios from "axios";
import useAuthStore from "../store/useAuthStore.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "X-client-key": API_KEY,
    },
});

httpClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    const isAuthRequest =
        config.url?.includes("/auth/login") ||
        config.url?.includes("/auth/register");

    if (token && !isAuthRequest) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

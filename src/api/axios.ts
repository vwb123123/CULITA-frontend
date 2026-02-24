import axios from "axios";

const BASE_URL = "/api";

export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use((config) => {
    config.headers["x-client-key"] =
        "b6J3jwUB5EPJ9bezM5m2teC2Y9LQXLmZshlPjvwiqHlHfjSea3boDKMCcPxE8xct";

    return config;
});

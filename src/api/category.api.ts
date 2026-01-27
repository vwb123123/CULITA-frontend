import { httpClient } from "./axios.ts";
import type { Category, CategoryResponse } from "../types/category.ts";

export const getCategories = async () => {
    const response = await httpClient.get<Category[]>("/categories");
    return response.data;
};

export const getCategoryByPath = async (path: string) => {
    const response = await httpClient.get<CategoryResponse>(
        `/categories/${path}`,
    );
    return response.data;
};

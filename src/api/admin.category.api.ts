import { httpClient } from "./axios";
import type {
    CreateCategoryRequest,
    UpdateCategoryRequest,
} from "../types/admin.category.ts";

export const createCategory = async (data: CreateCategoryRequest) => {
    const response = await httpClient.post("/admin/categories", data);
    return response.data;
};

export const updateCategory = async (
    id: number,
    data: UpdateCategoryRequest,
) => {
    const response = await httpClient.put(`/admin/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: number) => {
    const response = await httpClient.delete(`/admin/categories/${id}`);
    return response.data;
};

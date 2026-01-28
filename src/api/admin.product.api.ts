import { httpClient } from "./axios";
import type {
    CreateProductForm,
    ProductImageInput,
    UpdateProductForm,
} from "../types/admin.product";
export const createProduct = async (
    data: CreateProductForm,
    images: ProductImageInput[],
) => {
    const payload = {
        ...data,
        images: images,
    };

    const response = await httpClient.post("/admin/products", payload);
    return response.data;
};

export const updateProduct = async (
    id: number,
    data: UpdateProductForm,
    images?: ProductImageInput[],
) => {
    const payload = {
        ...data,
        images: images,
    };

    const response = await httpClient.put(`/admin/products/${id}`, payload);
    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await httpClient.delete(`/admin/products/${id}`);
    return response.data;
};

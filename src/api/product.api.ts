import { httpClient } from "./axios";
import type {
    ProductListParams,
    ProductListResponse,
    ProductDetail,
} from "../types/product";

export const fetchProducts = async (params: ProductListParams) => {
    const response = await httpClient.get<ProductListResponse>("/products", {
        params,
    });
    return response.data;
};

export const fetchProductDetail = async (id: number) => {
    const response = await httpClient.get<ProductDetail>(`/products/${id}`);
    return response.data;
};

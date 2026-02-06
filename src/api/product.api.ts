import { httpClient } from "./axios";
import {
    type ProductListParams,
    type ProductListResponse,
    type ProductDetail,
    PRODUCT_SCENTS,
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

// 상품명으로 향 정보 찾기
export const getScentByProductName = (productName: string): string | null => {
    const scentInfo = PRODUCT_SCENTS.find(
        (item) => item.productName === productName
    );
    return scentInfo?.scent || null;
};

// 부분 일치로 향 정보 찾기
export const getScentByPartialMatch = (productName: string): string | null => {
    const scentInfo = PRODUCT_SCENTS.find(
        (item) =>
            item.productName &&
            productName.includes(item.productName.split(' ')[1]) // "레몬러쉬", "에메랄드비치" 등으로 매칭
    );
    return scentInfo?.scent || null;
};
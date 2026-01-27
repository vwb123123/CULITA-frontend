import { httpClient } from "./axios.ts";
import type { CartResponse } from "../types/cart.ts";

export const getCart = async () => {
    const response = await httpClient.get<CartResponse>("/cart");
    return response.data;
};

export const addToCart = async (productId: number, quantity: number) => {
    return httpClient.post<CartResponse>("/cart", {
        productId,
        quantity,
    });
};

export const updateCartItem = async (itemId: number, quantity: number) => {
    return httpClient.put<CartResponse>(`/cart/items/${itemId}`, { quantity });
};

export const removeCartItem = async (itemId: number) => {
    return httpClient.delete<CartResponse>(`/cart/items/${itemId}`);
};

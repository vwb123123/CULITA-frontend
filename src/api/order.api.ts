import { httpClient } from "./axios.ts";
import type {
    Order,
    OrdersResponse,
    CreateOrderRequest,
    ConfirmOrderRequest,
} from "../types/order.ts";

export interface OrderFilterParams {
    status?: string;
    period?: string;
    page?: number;
    limit?: number;
}

export const checkoutOrder = async (data: CreateOrderRequest) => {
    const response = await httpClient.post<{ data: Order; message: string }>(
        "/orders/checkout",
        data,
    );
    return response.data;
};

export const confirmOrder = async (data: ConfirmOrderRequest) => {
    const response = await httpClient.post<void>("/orders/confirm", data);
    return response.data;
};

export const getOrders = async (params?: OrderFilterParams) => {
    const response = await httpClient.get<OrdersResponse>("/orders", {
        params: params,
    });
    return response.data;
};

export const getOrderById = async (id: number) => {
    const response = await httpClient.get<Order>(`/orders/${id}`);
    return response.data;
};

export const cancelOrder = async (id: number) => {
    const response = await httpClient.post<void>(`/orders/${id}/cancel`);
    return response.data;
};

export const returnOrder = async (id: number, reason: string) => {
    const response = await httpClient.post<void>(`/orders/${id}/return`, {
        reason,
    });
    return response.data;
};

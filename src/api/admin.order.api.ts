import type {
    AdminOrder,
    AdminOrderListResponse,
    AdminOrderQueryParams,
    UpdateOrderStatusRequest,
} from "../types/admin.order";
import { httpClient } from "./axios.ts";

// 관리자 - 주문 목록 조회
export const getAdminOrders = async (params: AdminOrderQueryParams) => {
    const response = await httpClient.get<AdminOrderListResponse>(
        "/admin/orders",
        {
            params,
        },
    );
    return response.data;
};

// 관리자 - 주문 상세 조회
export const getAdminOrderById = async (
    id: number,
): Promise<{ data: AdminOrder }> => {
    const response = await httpClient.get<{ data: AdminOrder }>(
        `/admin/orders/${id}`,
    );
    return response.data;
};

// 관리자 - 주문 상태 및 배송 정보 업데이트
export const updateOrderStatus = async (
    id: number,
    body: UpdateOrderStatusRequest,
): Promise<{ message: string; data: AdminOrder }> => {
    const response = await httpClient.patch<{
        message: string;
        data: AdminOrder;
    }>(`/admin/orders/${id}/status`, body);
    return response.data;
};

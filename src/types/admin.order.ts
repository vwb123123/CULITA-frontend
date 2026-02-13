export type OrderStatus =
    | "PENDING"
    | "PAID"
    | "PREPARING"
    | "SHIPPING"
    | "DELIVERED"
    | "CANCELED"
    | "EXCHANGE_REQUESTED"
    | "EXCHANGED"
    | "RETURN_REQUESTED"
    | "RETURNED";

export interface AdminOrderProduct {
    id: number;
    name: string;
    price: number;
    thumbnail?: string;
    images?: { url: string }[];
}
export interface AdminOrderItem {
    id: number;
    quantity: number;
    price: number;
    product: AdminOrderProduct;
    name?: string;
    productName?: string;
    thumbnail?: string;
}

export interface AdminOrder {
    id: number;
    orderNumber: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    items?: AdminOrderItem[];
    orderItems?: AdminOrderItem[];
    totalAmount?: number;
    totalPrice?: number;
    status: OrderStatus;
    carrier?: string;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminOrderQueryParams {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    search?: string;
    startDate?: string;
    endDate?: string;
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus;
    carrier?: string;
    trackingNumber?: string;
}

export interface AdminOrderListResponse {
    message: string;
    data: {
        orders: AdminOrder[];
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
            limit: number;
        };
    };
}

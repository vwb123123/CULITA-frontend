// 공통 상품 정보
interface OrderProduct {
    name: string;
    images: { url: string }[];
}

// 주문 아이템 상세
interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: OrderProduct;
}

// 결제 정보
interface PaymentInfo {
    method: string;
    amount: number;
    status: string;
    approvedAt: string | null;
}

// 주문 정보
export interface Order {
    id: number;
    createdAt: string;
    totalPrice: number;
    status: string;
    recipientName: string;
    trackingNumber: string | null;
    items: OrderItem[];
    payment: PaymentInfo;
}

// 주문 생성 요청 (Checkout)
export interface CreateOrderRequest {
    items: { productId: number; quantity: number }[];
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
    gatePassword?: string;
    deliveryRequest?: string;
}

// 주문 확정 요청 (Confirm)
export interface ConfirmOrderRequest {
    orderId: number;
    paymentKey: string;
    amount: number;
}

// API 공통 응답 구조 (목록 조회용)
export interface OrdersResponse {
    data: Order[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface CartResponse {
    id: number;
    items: CartItem[];
}

export interface ProductInCart {
    id: number;
    name: string;
    price: number;
    thumbnail: string | null;
}

export interface CartItem {
    id: number;
    quantity: number;
    product: ProductInCart;
    totalPrice: number;
}

export interface CartResponse {
    id: number;
    items: CartItem[];
    cartTotal: number;
}

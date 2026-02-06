import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/cart.ts";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
} from "../api/cart.api.ts";

interface CartState {
    cartId: number | null;
    items: CartItem[];
    cartTotal: number;
    loading: boolean;

    fetchCart: () => Promise<void>;

    //  장바구니 조작
    addItem: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;

    //  UI 계산용
    getTotalCount: () => number;
    getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartId: null,
            items: [],
            cartTotal: 0,
            loading: false,

            fetchCart: async () => {
                set({ loading: true });
                try {
                    const cart = await getCart();
                    set({
                        cartId: cart.id,
                        items: cart.items,
                        cartTotal: cart.cartTotal,
                    });
                } catch (e) {
                    console.log("장바구니 로드 실패", e);
                } finally {
                    set({ loading: false });
                }
            },

            addItem: async (productId, quantity) => {
                try {
                    await addToCart(productId, quantity);
                    await get().fetchCart(); // 서버 기준으로 재동기화
                } catch (e) {
                    console.log("장바구니 담기 실패", e);
                    throw e;
                }
            },

            updateQuantity: async (itemId, quantity) => {
                if (quantity < 1) return;

                const prevItems = get().items;
                set({
                    items: prevItems.map((item) =>
                        item.id === itemId
                            ? {
                                  ...item,
                                  quantity,
                                  totalPrice: item.product.price * quantity,
                              }
                            : item,
                    ),
                });

                try {
                    await updateCartItem(itemId, quantity);
                    await get().fetchCart();
                } catch (e) {
                    set({ items: prevItems });
                    console.log("장바구니 수량 변경 실패", e);
                }
            },

            removeItem: async (itemId) => {
                const prevItems = get().items;

                set({
                    items: prevItems.filter((item) => item.id !== itemId),
                });

                try {
                    await removeCartItem(itemId);
                    await get().fetchCart();
                } catch (e) {
                    set({ items: prevItems });
                    console.log("장바구니 삭제 실패", e);
                }
            },

            getTotalCount: () =>
                get().items.reduce((total, item) => total + item.quantity, 0),

            getTotalPrice: () => {
                const total = get().getTotalPrice();
                if (total === 0) return 0;
                const shippingFee = total >= 30000 ? 0 : 3000;
                return total + shippingFee;
            },
        }),
        {
            name: "cart-storage",
        },
    ),
);

export default useCartStore;

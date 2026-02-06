import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "../types/cart.ts";

interface OrderState {
    orderItems: CartItem[];
    setOrderItems: (items: CartItem[]) => void;
    clearOrder: () => void;

    getCartTotalPrice: () => number;
    getShippingFee: () => number; // 배송비
    getFinalAmount: () => number;
}

const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orderItems: [],
            setOrderItems: (items) => set({ orderItems: items }),
            clearOrder: () => set({ orderItems: [] }),

            getCartTotalPrice: () => {
                return get().orderItems.reduce((acc, item) => {
                    return acc + item.product.price * item.quantity;
                }, 0);
            },

            // 배송비 계산
            getShippingFee: () => {
                const total = get().getCartTotalPrice();
                if (total === 0 || total >= 30000) return 0;
                return 3000;
            },

            // 최종 결제 금액
            getFinalAmount: () => {
                return get().getCartTotalPrice() + get().getShippingFee();
            },
        }),
        {
            name: "order-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

export default useOrderStore;

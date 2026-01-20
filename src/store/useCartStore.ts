import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (i) => i.id === item.id,
                    );

                    if (existingItem) {
                        // 이미 있는 상품이면 수량만 증가
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? {
                                          ...i,
                                          quantity: i.quantity + item.quantity,
                                      }
                                    : i,
                            ),
                        };
                    } else {
                        // 새로운 상품 추가
                        return {
                            items: [...state.items, item],
                        };
                    }
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item,
                    ),
                })),

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                const state = get();
                return state.items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                );
            },

            getTotalPrice: () => {
                const state = get();
                return state.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                );
            },
        }),
        {
            name: "cart-storage",
        },
    ),
);

export default useCartStore;

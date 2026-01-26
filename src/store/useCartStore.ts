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
    getTotalItems: () => number; // 추가
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
                    }
                    return { items: [...state.items, item] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item,
                    ),
                })),
            clearCart: () => set({ items: [] }),

            // 헤더에서 사용할 총 수량 계산 로직
            getTotalItems: () => {
                return get().items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                );
            },

            getTotalPrice: () => {
                const items = get().items || [];
                return items.reduce(
                    (total, item) =>
                        total + (item.price || 0) * (item.quantity || 0),
                    0,
                );
            },
        }),
        { name: "cart-storage" },
    ),
);

export default useCartStore;

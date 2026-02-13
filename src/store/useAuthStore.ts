import type { Auth } from "../types/auth.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: Auth | null;
    login: (token: string, user: Auth) => void;
    logout: () => void;
    setUser: (user: Auth) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            token: null,
            user: null,
            login: (token: string, user: Auth) =>
                set({ isLoggedIn: true, token, user }),
            logout: () => set({ isLoggedIn: false, token: null, user: null }),
            setUser: (user: Auth) =>
                set((state) => ({
                    ...state,
                    user: user,
                })),
        }),
        { name: "auth-storage" },
    ),
);

export default useAuthStore;

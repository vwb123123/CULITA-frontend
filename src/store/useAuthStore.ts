import type { User } from "../types/user.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: true,
            token: null,
            user: null,
            login: (token: string, user: User) =>
                set({ isLoggedIn: true, token, user }),
            logout: () => set({ isLoggedIn: false, token: null, user: null }),
        }),
        { name: "auth-storage" },
    ),
);

export default useAuthStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (email: string, _password: string) => {
                // Temporary auth - accept any credentials
                set({
                    isAuthenticated: true,
                    user: { name: email.split('@')[0], email },
                });
            },
            signup: (name: string, email: string, _password: string) => {
                // Temporary signup - just store the data
                set({
                    isAuthenticated: false,
                    user: { name, email },
                });
            },
            logout: () => {
                set({ isAuthenticated: false, user: null });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

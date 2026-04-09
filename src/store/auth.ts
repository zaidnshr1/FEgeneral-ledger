import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserInfo, TokenResponse } from "@/types/api";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  isHydrated: boolean; 
  setTokens: (
    tokens: Pick<TokenResponse, "accessToken" | "refreshToken">,
  ) => void;
  setUser: (user: UserInfo) => void;
  setHydrated: (state: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: !!tokens.accessToken,
        }),
      setUser: (user) => set({ user }),
      setHydrated: (state) => set({ isHydrated: state }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "genledger-auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserInfo, TokenResponse } from "@/types/api";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  setTokens: (
    tokens: Pick<TokenResponse, "accessToken" | "refreshToken">,
  ) => void;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: !!tokens.accessToken,
        }),
      setUser: (user) => set({ user }),
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
    },
  ),
);

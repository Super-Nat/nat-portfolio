import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

type Role = "admin" | "viewer";

interface AuthState {
  user: User | null;
  role: Role | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user) =>
    set({
      user,
      role: (user?.app_metadata?.role as Role) ?? null,
    }),
  clearUser: () => set({ user: null, role: null }),
}));

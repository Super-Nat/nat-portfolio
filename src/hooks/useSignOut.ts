// src/hooks/useSignOut.ts
"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    router.push("/sign-in");
  };

  return { signOut };
};
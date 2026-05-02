"use client";

import { signInService } from "@/features/admin/sign-in/services/signInService";
import { useAuthStore } from "@/stores/authStore";
import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInSchema } from "../types/signInType";

type SignInError = AuthError | string | null;

export const useSignIn = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<SignInError>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInSchema) =>
      signInService(email, password),
    onMutate: () => {
      setError(null);
    },
    onSuccess: (data) => {
      if (data.data) {
        setUser(data.data.user);
        router.push("/admin/dashboard");
        setError(null);
      } else {
        setError(data.error);
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return {
    signIn: mutate,
    isPending,
    error,
  };
};

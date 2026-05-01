"use client";

import { signInService } from "@/features/admin/sign-in/services/SignInService";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInService(email, password),
    onSuccess: (data) => {
      if (data.data) {
        setUser(data.data.user);
        router.push("/admin/dashboard");
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return { signIn: mutate, isPending };
};

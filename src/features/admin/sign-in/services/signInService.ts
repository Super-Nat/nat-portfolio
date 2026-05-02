import { createClient } from "@/lib/supabase/client";
import { AuthError, AuthResponse } from "@supabase/supabase-js";

export const signInService = async (
  email: string,
  password: string,
): Promise<{ data: AuthResponse["data"] | null; error: AuthError | null }> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error, data: null };
  }

  return { data, error: null };
};

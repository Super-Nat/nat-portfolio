"use server";

import { createClient } from "@/lib/supabase/server";

export const requireAuth = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
};

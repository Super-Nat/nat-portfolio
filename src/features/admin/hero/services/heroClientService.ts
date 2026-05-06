import { createClient } from "@/lib/supabase/client";

export const getHeroService = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("hero").select("*").single();

  if (error) return { data: null, error };
  return { data, error: null };
};

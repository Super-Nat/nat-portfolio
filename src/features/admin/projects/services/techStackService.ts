import { createClient } from "@/lib/supabase/client";

export const getTechStackService = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("tech_stack").select("*");
  if (error) throw error;
  return data;
};

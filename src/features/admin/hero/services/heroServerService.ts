import { createClient } from "@/lib/supabase/server";
import { HeroReq } from "../types/heroType";

export const updateHeroService = async (id: string, data: HeroReq) => {
  const supabase = await createClient();
  const { error } = await supabase.from("hero").update(data).eq("id", id);
  if (error) return { error };
  return { error: null };
};

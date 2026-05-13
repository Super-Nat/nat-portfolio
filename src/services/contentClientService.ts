import { createClient } from "@/lib/supabase/client";

interface ContentServiceProps {
  table: string;
}

//client
export const getContentService = async ({ table }: ContentServiceProps) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(table).select("*").single();
  if (error) return { data: null, error };
  return { data, error: null };
};

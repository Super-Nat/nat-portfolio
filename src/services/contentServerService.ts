import { createClient } from "@/lib/supabase/server";

interface ContentServiceProps {
  id: string;
  data: Record<string, unknown>;
  table: string;
}

export const updateContentService = async ({
  id,
  data,
  table,
}: ContentServiceProps) => {
  const supabase = await createClient();
  const { error } = await supabase.from(table).update(data).eq("id", id);
  if (error) return { error };
  return { error: null };
};

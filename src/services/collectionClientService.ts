import { createClient } from "@/lib/supabase/client";

interface CollectionServiceProps {
  table: string;
}

interface CollectionItemServiceProps {
  table: string;
  id: string;
}

export const getCollectionService = async ({
  table,
}: CollectionServiceProps) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(table).select("*");
  if (error) return { data: null, error };
  return { data, error: null };
};

export const getCollectionItemService = async ({
  table,
  id,
}: CollectionItemServiceProps) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { data: null, error };
  return { data, error: null };
};

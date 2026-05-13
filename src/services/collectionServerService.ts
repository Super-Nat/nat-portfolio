import { createClient } from "@/lib/supabase/server";

import { CreateProps, DeleteProps, UpdateProps } from "@/types/collection";

export const createCollectionService = async ({ table, data }: CreateProps) => {
  const supabase = await createClient();
  const { data: createdData, error } = await supabase.from(table).insert(data);
  if (error) return { data: null, error };
  return { data: createdData, error: null };
};

export const updateCollectionService = async ({
  id,
  data,
  table,
}: UpdateProps) => {
  const supabase = await createClient();
  const { data: updatedData, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id);
  if (error) return { data: null, error };
  return { data: updatedData, error: null };
};

export const deleteCollectionService = async ({ id, table }: DeleteProps) => {
  const supabase = await createClient();
  const { data: deletedData, error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);
  if (error) return { data: null, error };
  return { data: deletedData, error: null };
};

import { createClient } from "@/lib/supabase/server";

import { CreateProps, DeleteProps, UpdateProps } from "@/types/collection";

export const createProjectService = async ({ table, data }: CreateProps) => {
  const supabase = await createClient();
  const { data: createdData, error } = await supabase.from(table).insert(data);
  if (error) return { data: null, error };
  return { data: createdData, error: null };
};

export const updateProjectService = async ({
  id,
  data,
  table,
}: UpdateProps) => {
  console.log(data);
  const supabase = await createClient();
  const { data: updatedData, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id);
  if (error) return { data: null, error };
  return { data: updatedData, error: null };
};

export const deleteProjectService = async ({ id, table }: DeleteProps) => {
  const supabase = await createClient();
  const { data: deletedData, error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);
  if (error) return { data: null, error };
  return { data: deletedData, error: null };
};

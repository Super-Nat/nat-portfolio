import { createClient } from "@/lib/supabase/client";

interface CollectionServiceProps {
  table: string;
}

interface CollectionItemServiceProps {
  table: string;
  id: string;
}

export const getProjectsService = async ({ table }: CollectionServiceProps) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .select(
      `
      *,
      project_tech_stack(
        tech_stack(*)
      )
    `,
    )
    .order("updated_at", { ascending: false });

  if (error) return { data: null, error };
  return { data, error: null };
};

export const getProjectItemService = async ({
  table,
  id,
}: CollectionItemServiceProps) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .select(
      `
      *,
      tech_stack(id)
    `,
    )
    .eq("id", id)
    .single();

  if (error) return { data: null, error };
  return { data, error: null };
};

//server

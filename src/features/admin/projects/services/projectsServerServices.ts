import { createClient } from "@/lib/supabase/server";

import { ProjectReq, UpdateProps } from "../types/projectsType";

export const createProjectService = async (data: ProjectReq) => {
  const supabase = await createClient();
  const { tech_stack, ...projectData } = data;
  const techStack = tech_stack as string[];

  const { data: createdData, error } = await supabase
    .from("projects")
    .insert({ ...projectData, created_at: new Date().toISOString() })
    .select()
    .single();
  if (error) return { data: null, error };

  if (techStack !== undefined) {
    const { error: projectTechStackError } = await supabase
      .from("project_tech_stack")
      .insert(
        techStack.map((tech: string) => ({
          project_id: createdData.id,
          tech_stack_id: tech,
        })),
      );
    if (projectTechStackError)
      return { data: null, error: projectTechStackError };
  }
  return { data: createdData, error: null };
};

export const updateProjectService = async ({ id, data }: UpdateProps) => {
  const supabase = await createClient();
  const { tech_stack, ...projectData } = data;
  const techStack = tech_stack as string[];

  const { data: updatedData, error } = await supabase
    .from("projects")
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { data: null, error };

  if (techStack !== undefined) {
    const { error: projectTechStackError } = await supabase
      .from("project_tech_stack")
      .delete()
      .eq("project_id", id);
    if (projectTechStackError)
      return { data: null, error: projectTechStackError };

    if (techStack?.length > 0) {
      const { error: projectTechStackError } = await supabase
        .from("project_tech_stack")
        .insert(
          techStack.map((tech: string) => ({
            project_id: id,
            tech_stack_id: tech,
          })),
        );
      if (projectTechStackError)
        return { data: null, error: projectTechStackError };
    }
  }
  return { data: updatedData, error: null };
};

export const deleteProjectService = async (id: string) => {
  const supabase = await createClient();
  const { data: deletedData, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);
  if (error) return { data: null, error };
  return { data: deletedData, error: null };
};

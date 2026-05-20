import { z } from "zod";
import type { createProjectAction } from "../actions/projectAction";

export type ProjectMutationResult = Awaited<
  ReturnType<typeof createProjectAction>
>;

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image_url: z.union([z.string(), z.instanceof(File)]),
  project_url: z.string().optional(),
  github_url: z.string().optional(),
  sort_order: z.preprocess((val) => {
    const n = Number(val);
    return Number.isNaN(n) ? 0 : n;
  }, z.number().int().min(0)),
  tech_stack: z.array(z.string()).optional(),
  is_published: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ProjectFormInput = z.input<typeof projectSchema>;
export type ProjectReq = z.output<typeof projectSchema>;

/** Project row from API (tech_stack is id strings, not full objects) */
export type ProjectItem = ProjectReq & {
  id?: string;
};

export interface UpdateProps {
  id: string;
  data: ProjectReq;
}

export interface ProjectCallbacks {
  updateProject: (props: UpdateProps) => Promise<ProjectMutationResult>;
  createProject: (data: ProjectReq) => Promise<ProjectMutationResult>;
}

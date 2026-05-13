import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image_url: z.string().optional(),
  project_url: z.string().optional(),
  github_url: z.string().optional(),
  tech_stack: z.array(z.string()).optional(),
  sort_order: z.number().optional(),
  is_published: z.boolean(),
});

export type ProjectReq = z.infer<typeof projectSchema>;

export interface ProjectCallbacks {
  updateProject: ({
    id,
    data,
  }: {
    id: string;
    data: Record<string, unknown>;
  }) => void;
  createProject: (data: Record<string, unknown>) => void;
}

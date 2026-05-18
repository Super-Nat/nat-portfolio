import { techStackSchema } from "@/types/techStack";
import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image_url: z.union([z.string(), z.instanceof(File)]),
  project_url: z.string().optional(),
  github_url: z.string().optional(),
  sort_order: z.number().optional(),
  tech_stack: z.array(z.string()).optional(),
  is_published: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ProjectReq = z.infer<typeof projectSchema>;

export const projectFormSchema = projectSchema.extend({
  tech_stack: z.array(techStackSchema),
});

export type ProjectFormType = z.infer<typeof projectFormSchema>;

export interface UpdateProps {
  id: string;
  data: ProjectReq;
}

export interface ProjectCallbacks {
  updateProject: ({ id, data }: UpdateProps) => void;
  createProject: (data: ProjectReq) => void;
}

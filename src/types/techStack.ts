import z from "zod";

export const techStackSchema = z.object({
  created_at: z.string().optional(),
  icon_url: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
});

export type TechStackType = z.infer<typeof techStackSchema>;

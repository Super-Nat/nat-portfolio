import z from "zod";

export const techStackSchema = z.object({
  created_at: z.string(),
  icon_url: z.string(),
  id: z.string(),
  name: z.string(),
});

export type TechStackType = z.infer<typeof techStackSchema>;

import { z } from "zod";

export const aboutSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  image_url: z.string().optional(),
  cv_url: z.string().optional(),
});

export type AboutReq = z.infer<typeof aboutSchema>;

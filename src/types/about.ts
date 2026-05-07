import { z } from "zod";

export const aboutSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  image_url: z.union([z.string(), z.instanceof(File)]),
  cv_url: z.union([z.string(), z.instanceof(File)]),
});

export type AboutReq = z.infer<typeof aboutSchema>;

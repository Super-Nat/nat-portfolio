import { z } from "zod";

export const contactSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export type ContactReq = z.infer<typeof contactSchema>;

import { z } from "zod";

export const heroSchema = z.object({
  greeting: z.string().min(1, "Greeting is required"),
  position: z.string().min(1, "Position is required"),
});

export type HeroReq = z.infer<typeof heroSchema>;

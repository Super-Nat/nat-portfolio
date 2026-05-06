"use server";

import { updateHeroService } from "../services/heroServerService";
import type { HeroReq } from "../types/heroType";

export const updateHeroAction = async (id: string, data: HeroReq) => {
  const { error } = await updateHeroService(id, data);
  if (error) return { error };
  return { error: null };
};

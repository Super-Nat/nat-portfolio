"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { updateContentService } from "@/services/contentServerService";

export const updateContentAction = async ({
  id,
  data,
  table,
}: {
  id: string;
  data: Record<string, unknown>;
  table: string;
}) => {
  await requireAuth();

  return await updateContentService({ id, data, table });
};

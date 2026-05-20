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

  const result = await updateContentService({ id, data, table });
  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
};

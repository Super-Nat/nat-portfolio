"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import {
  createCollectionService,
  deleteCollectionService,
  updateCollectionService,
} from "@/services/collectionServerService";

import { CreateProps, DeleteProps, UpdateProps } from "@/types/collection";

export const createCollectionAction = async ({ table, data }: CreateProps) => {
  await requireAuth();
  const result = await createCollectionService({ table, data });
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

export const updateCollectionAction = async ({
  id,
  data,
  table,
}: UpdateProps) => {
  await requireAuth();
  const result = await updateCollectionService({ id, data, table });
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

export const deleteCollectionAction = async ({ id, table }: DeleteProps) => {
  await requireAuth();
  const result = await deleteCollectionService({ id, table });
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

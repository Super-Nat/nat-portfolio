"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { CreateProps, DeleteProps, UpdateProps } from "@/types/collection";
import {
  createProjectService,
  deleteProjectService,
  updateProjectService,
} from "../services/projectsServerServices";

export const createProjectAction = async ({ table, data }: CreateProps) => {
  await requireAuth();
  const result = await createProjectService({ table, data });

  return result;
};

export const updateProjectAction = async ({ id, data, table }: UpdateProps) => {
  await requireAuth();
  const result = await updateProjectService({ id, data, table });

  return result;
};

export const deleteProjectAction = async ({ id, table }: DeleteProps) => {
  await requireAuth();
  const result = await deleteProjectService({ id, table });

  return result;
};

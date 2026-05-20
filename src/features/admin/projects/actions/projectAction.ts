"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import {
  createProjectService,
  deleteProjectService,
  updateProjectService,
} from "../services/projectsServerServices";
import { ProjectReq, UpdateProps } from "../types/projectsType";

export const createProjectAction = async (data: ProjectReq) => {
  await requireAuth();
  const result = await createProjectService(data);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

export const updateProjectAction = async ({ id, data }: UpdateProps) => {
  await requireAuth();
  const result = await updateProjectService({ id, data });
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

export const deleteProjectAction = async (id: string) => {
  await requireAuth();
  const result = await deleteProjectService(id);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

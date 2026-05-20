"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "../actions/projectAction";
import {
  getProjectItemService,
  getProjectsService,
} from "../services/projectClientServices";
import { ProjectReq, UpdateProps } from "../types/projectsType";

interface UseProjectProps {
  id?: string;
  fetchList?: boolean;
}

export const useProject = ({ id, fetchList = true }: UseProjectProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsService({ table: "projects" }),
    enabled: fetchList && !id,
  });

  const { data: itemData, isLoading: isItemLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () =>
      getProjectItemService({ table: "projects", id: id as string }),
    enabled: !!id,
  });

  const { mutateAsync: createProject, isPending: isCreating } = useMutation({
    mutationFn: (data: ProjectReq) => createProjectAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      toast.success("Project created successfully!");
      router.push(`/admin/projects`);
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      ),
  });

  const { mutateAsync: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: UpdateProps) =>
      updateProjectAction({ data, id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      toast.success("Project updated successfully!");
      router.push(`/admin/projects`);
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      ),
  });

  const { mutateAsync: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteProjectAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
      router.push(`/admin/projects`);
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      ),
  });

  return {
    projects: data?.data,
    item: itemData?.data,
    isLoading,
    isItemLoading,
    createProject,
    updateProject,
    deleteProject,
    isCreating,
    isUpdating,
    isDeleting,
  };
};

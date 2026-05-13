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
    mutationFn: (data: Record<string, unknown>) =>
      createProjectAction({ table: "projects", data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", "project"] });
      toast.success("Collection created successfully!");
      router.push(`/admin/projects`);
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const { mutateAsync: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      updateProjectAction({ table: "projects", data, id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", "project"] });
      toast.success("Collection updated successfully!");
      router.push(`/admin/projects`);
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const { mutateAsync: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteProjectAction({ table: "projects", id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", "project"] });
      toast.success("Collection deleted successfully!");
      router.push(`/admin/projects`);
    },
    onError: () => toast.error("Something went wrong!"),
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

"use client";

import {
  createCollectionAction,
  deleteCollectionAction,
  updateCollectionAction,
} from "@/actions/collectionAction";
import {
  getCollectionItemService,
  getCollectionService,
} from "@/services/collectionClientService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCollectionProps {
  key: string;
  table: string;
  id?: string;
  fetchList?: boolean;
}

export const useCollection = ({
  key,
  table,
  id,
  fetchList = true,
}: UseCollectionProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: () => getCollectionService({ table }),
    enabled: fetchList && !id,
  });

  const { data: itemData, isLoading: isItemLoading } = useQuery({
    queryKey: [key, id],
    queryFn: () => getCollectionItemService({ table, id: id as string }),
    enabled: !!id,
  });

  const { mutateAsync: createCollection, isPending: isCreating } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createCollectionAction({ table, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      toast.success("Collection created successfully!");
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      ),
  });

  const { mutateAsync: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      updateCollectionAction({ table, data, id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      toast.success("Collection updated successfully!");
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      ),
  });

  const { mutateAsync: deleteCollection, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteCollectionAction({ table, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      toast.success("Collection deleted successfully!");
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      ),
  });

  return {
    collection: data?.data,
    item: itemData?.data,
    isLoading,
    isItemLoading,
    createCollection,
    updateCollection,
    deleteCollection,
    isCreating,
    isUpdating,
    isDeleting,
  };
};

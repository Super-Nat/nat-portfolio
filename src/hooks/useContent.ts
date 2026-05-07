import { updateContentAction } from "@/actions/contentAction";
import { getContentService } from "@/services/contentClientService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseContentProps {
  key: string;
  table: string;
}

const useContent = ({ key, table }: UseContentProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: () => getContentService({ table }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      id,
      data,
      table,
    }: {
      id: string;
      data: Record<string, unknown>;
      table: string;
    }) => updateContentAction({ id, data, table }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      toast.success("Content updated successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return {
    content: data?.data,
    isLoading,
    updateContent: mutateAsync,
    isPending,
  };
};

export default useContent;

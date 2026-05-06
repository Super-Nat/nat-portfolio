"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateHeroAction } from "../actions/heroAction";
import { getHeroService } from "../services/heroClientService";
import type { HeroReq } from "../types/heroType";

export const useHero = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: getHeroService,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: HeroReq }) =>
      updateHeroAction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero updated successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return {
    hero: data?.data,
    isLoading,
    updateHero: mutate,
    isPending,
  };
};

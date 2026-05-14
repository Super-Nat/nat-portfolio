import { useQuery } from "@tanstack/react-query";
import { getTechStackService } from "../services/techStackService";

const useTechStack = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tech_stack"],
    queryFn: () => getTechStackService(),
  });

  return {
    techStack: data,
    isLoading,
  };
};

export { useTechStack };

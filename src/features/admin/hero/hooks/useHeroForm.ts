import useContent from "@/hooks/useContent";
import { HeroReq, heroSchema } from "@/types/hero";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useHeroForm = () => {
  const { content, isLoading, updateContent, isPending } = useContent({
    key: "hero",
    table: "hero",
  });

  const form = useForm<HeroReq>({
    defaultValues: {
      greeting: "",
      position: "",
    },
    resolver: zodResolver(heroSchema),
  });

  useEffect(() => {
    if (content) {
      form.reset({
        greeting: content.greeting,
        position: content.position,
      });
    }
  }, [content, form]);

  const handleSubmit = (data: HeroReq) => {
    if (!content?.id) return;
    updateContent({ id: content.id, data, table: "hero" });
  };

  return {
    form,
    handleSubmit,
    isPending,
    isLoading,
    content,
  };
};

export default useHeroForm;

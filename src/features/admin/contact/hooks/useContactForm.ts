import useContent from "@/hooks/useContent";
import { ContactReq, contactSchema } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useContactForm = () => {
  const { content, isLoading, updateContent, isPending } = useContent({
    key: "contact",
    table: "contact",
  });

  const form = useForm<ContactReq>({
    defaultValues: {
      email: "",
      github: "",
      linkedin: "",
    },
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (content) {
      form.reset({
        email: content.email,
        github: content.github,
        linkedin: content.linkedin,
      });
    }
  }, [content, form]);

  const handleSubmit = async (data: ContactReq) => {
    if (!content?.id) {
      return toast.error("Content not found!");
    }
    await updateContent({ id: content.id, data, table: "contact" });
  };

  return {
    form,
    handleSubmit,
    isPending,
    isLoading,
    content,
  };
};

export default useContactForm;

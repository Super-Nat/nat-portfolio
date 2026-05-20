import { deleteFileAction } from "@/actions/deleteFileAction";
import useContent from "@/hooks/useContent";
import { useUpload } from "@/hooks/useUpload";
import { AboutReq, aboutSchema } from "@/types/about";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useAboutForm = () => {
  const { content, isLoading, updateContent, isPending } = useContent({
    key: "about",
    table: "about",
  });

  const { upload, isUploading } = useUpload();

  const form = useForm<AboutReq>({
    defaultValues: {
      name: "",
      bio: "",
      image_url: "",
      cv_url: "",
    },
    resolver: zodResolver(aboutSchema),
  });

  useEffect(() => {
    if (content) {
      form.reset({
        name: content.name,
        bio: content.bio,
        image_url: content.image_url ?? "",
        cv_url: content.cv_url ?? "",
      });
    }
  }, [content, form]);

  const onSubmit = async (data: AboutReq) => {
    let image_url = data.image_url;
    let cv_url = data.cv_url;

    // เปลี่ยนรูปใหม่ครับ
    if (data.image_url instanceof File) {
      if (content?.image_url) {
        const { error: deleteFileError } = await deleteFileAction(
          content.image_url,
        );
        if (deleteFileError) {
          form.setError("image_url", { message: deleteFileError });
          return;
        }
      }
      const { key, error } = await upload(data.image_url, { profile: "image" });
      if (error) {
        form.setError("image_url", { message: error });
        return;
      }
      if (key) image_url = key;
    }

    // เปลี่ยน CV ใหม่ครับ
    if (data.cv_url instanceof File) {
      if (content?.cv_url) {
        const { error: deleteFileError } = await deleteFileAction(
          content.cv_url,
        );
        if (deleteFileError) {
          form.setError("cv_url", { message: deleteFileError });
          return;
        }
      }

      const { key, error } = await upload(data.cv_url, { profile: "pdf" });
      if (error) {
        form.setError("cv_url", { message: error });
        return;
      }
      if (key) cv_url = key;
    }

    const payload = { ...data, image_url, cv_url };

    if (!content?.id) {
      return toast.error("Content not found!");
    }

    await updateContent({
      id: content.id,
      data: payload,
      table: "about",
    });
  };

  return {
    form,
    isUploading,
    isPending,
    onSubmit,
    isLoading,
    content,
  };
};

export default useAboutForm;

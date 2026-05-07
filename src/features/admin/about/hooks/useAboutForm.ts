import { deleteFileAction } from "@/actions/deleteFileAction";
import useContent from "@/hooks/useContent";
import { useUpload } from "@/hooks/useUpload";
import { AboutReq, aboutSchema } from "@/types/about";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useAboutForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const [isRemovingCv, setIsRemovingCv] = useState(false);

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
      if (content?.image_url) {
        setImagePreview(
          `${process.env.NEXT_PUBLIC_R2_ENDPOINT_URL}/${content?.image_url}`,
        );
      }
      if (content?.cv_url) {
        setCvUrl(
          `${process.env.NEXT_PUBLIC_R2_ENDPOINT_URL}/${content?.cv_url}`,
        );
      }
    }
  }, [content, form]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setIsRemovingImage(true); // เก็บ flag
    setImageFile(null); // clear file
    setImagePreview(null); // clear preview
    form.setValue("image_url", ""); // clear form
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvFile(file);
  };

  const handleRemoveCv = () => {
    setIsRemovingCv(true);
    setCvFile(null);
    setCvUrl(null);
    form.setValue("cv_url", "");
  };

  const onSubmit = async (data: AboutReq) => {
    let image_url = data.image_url;
    let cv_url = data.cv_url;

    // ลบรูปครับ
    if (isRemovingImage && content?.image_url) {
      await deleteFileAction(content.image_url);
      image_url = "";
    }

    // ลบ CV ครับ
    if (isRemovingCv && content?.cv_url) {
      await deleteFileAction(content.cv_url);
      cv_url = "";
    }

    // เปลี่ยนรูปใหม่ครับ
    if (imageFile) {
      if (content?.image_url && !isRemovingImage) {
        await deleteFileAction(content.image_url);
      }
      const { url } = await upload(imageFile);
      if (url) image_url = url;
    }

    // เปลี่ยน CV ใหม่ครับ
    if (cvFile) {
      if (content?.cv_url && !isRemovingCv) {
        await deleteFileAction(content.cv_url);
      }
      const { url } = await upload(cvFile);
      if (url) cv_url = url;
    }

    await updateContent({
      id: content?.id,
      data: { ...data, image_url, cv_url },
      table: "about",
    });

    // reset flags ครับ
    setIsRemovingImage(false);
    setIsRemovingCv(false);
  };

  return {
    form,
    handleImageChange,
    handleRemoveImage,
    handleCvChange,
    handleRemoveCv,
    imagePreview,
    isUploading,
    isPending,
    onSubmit,
    isLoading,
    content,
    cvUrl,
    imageFile,
    cvFile,
    isRemovingImage,
    isRemovingCv,
  };
};

export default useAboutForm;

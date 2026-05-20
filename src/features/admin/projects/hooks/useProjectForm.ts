import { deleteFileAction } from "@/actions/deleteFileAction";
import { useUpload } from "@/hooks/useUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ProjectCallbacks,
  ProjectFormInput,
  ProjectItem,
  ProjectReq,
  projectSchema,
} from "../types/projectsType";

interface UseProjectFormProps extends ProjectCallbacks {
  item?: ProjectItem;
}

export const useProjectForm = ({
  item,
  updateProject,
  createProject,
}: UseProjectFormProps) => {
  const { upload, isUploading } = useUpload();

  const form = useForm<ProjectFormInput, unknown, ProjectReq>({
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      project_url: "",
      github_url: "",
      sort_order: 0,
      is_published: false,
      tech_stack: [],
    },
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (item) {
      form.reset({
        ...item,
        tech_stack: item.tech_stack ?? [],
      });
    }
  }, [item, form]);

  const handleSubmit = async (data: ProjectReq) => {
    let imageUrl = item?.image_url ?? "";

    if (data.image_url instanceof File) {
      if (item?.image_url) {
        const { error: deleteFileError } = await deleteFileAction(
          item.image_url as string,
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
      if (key) imageUrl = key;
    }

    const payload = { ...data, image_url: imageUrl };

    if (item?.id) {
      await updateProject({
        id: item.id,
        data: payload,
      });
    } else {
      await createProject(payload);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isUploading,
  };
};

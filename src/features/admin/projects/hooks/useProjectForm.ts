import { deleteFileAction } from "@/actions/deleteFileAction";
import { useUpload } from "@/hooks/useUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ProjectCallbacks,
  ProjectFormType,
  ProjectReq,
  projectSchema,
} from "../types/projectsType";

interface UseProjectFormProps extends ProjectCallbacks {
  item?: ProjectFormType;
}

export const useProjectForm = ({
  item,
  updateProject,
  createProject,
}: UseProjectFormProps) => {
  const { upload, isUploading } = useUpload();

  const form = useForm<ProjectReq>({
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
        tech_stack: item.tech_stack?.map((tech) => tech.id),
      });
    }
  }, [item, form]);

  const handleSubmit = async (data: ProjectReq) => {
    let imageUrl = item?.image_url ?? "";

    if (data.image_url instanceof File) {
      if (item?.image_url) {
        await deleteFileAction(item.image_url as string);
      }
      const { url } = await upload(data.image_url);
      if (url) imageUrl = url;
    }

    const payload = { ...data, image_url: imageUrl };

    if (item?.id) {
      updateProject({
        id: item.id as string,
        data: payload,
      });
    } else {
      createProject(payload);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isUploading,
  };
};

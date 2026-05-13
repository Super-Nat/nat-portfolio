import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ProjectCallbacks,
  ProjectReq,
  projectSchema,
} from "../types/projectsType";

interface UseProjectFormProps extends ProjectCallbacks {
  item?: Record<string, unknown>;
}

export const useProjectForm = ({
  item,
  updateProject,
  createProject,
}: UseProjectFormProps) => {
  const form = useForm<ProjectReq>({
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      project_url: "",
      github_url: "",
      tech_stack: [],
      sort_order: 0,
      is_published: false,
    },
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (item) {
      form.reset(item as unknown as ProjectReq);
    }
  }, [item, form]);

  const handleSubmit = (data: ProjectReq) => {
    if (item?.id) {
      updateProject({ id: item.id as string, data });
    } else {
      createProject(data);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
  };
};

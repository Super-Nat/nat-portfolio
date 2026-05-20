"use client";

import Content from "@/components/layout/Content";
import Loading from "@/components/ui/loading";
import ProjectForm from "./components/ProjectForm";
import { useProject } from "./hooks/useProject";

interface ProjectFeatureProps {
  id?: string;
}
const ProjectFeature = ({ id }: ProjectFeatureProps) => {
  const {
    item,
    updateProject,
    createProject,
    isCreating,
    isUpdating,
    isItemLoading,
  } = useProject({
    id,
    fetchList: false,
  });

  const title = id ? (item?.title ?? "Edit Project") : "Create Project";
  const description = id ? "Edit your project" : "Create a new project";

  return (
    <Content title={title} description={description}>
      {isItemLoading ? (
        <Loading />
      ) : (
        <ProjectForm
          item={item ?? undefined}
          updateProject={updateProject}
          createProject={createProject}
          isCreating={isCreating}
          isUpdating={isUpdating}
        />
      )}
    </Content>
  );
};

export default ProjectFeature;

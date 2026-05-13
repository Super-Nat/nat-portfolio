"use client";

import Content from "@/components/layout/Content";
import ProjectForm from "./components/ProjectForm";
import { useProject } from "./hooks/useProject";

interface ProjectFeatureProps {
  id?: string;
}
const ProjectFeature = ({ id }: ProjectFeatureProps) => {
  const { item, updateProject, createProject, isCreating, isUpdating } =
    useProject({
      id,
      fetchList: false,
    });

  const mode = id ? "update" : "create";
  const title = id ? item?.title : "Create Project";
  const description = id ? "Edit your project" : "Create a new project";

  return (
    <Content title={title} description={description}>
      <ProjectForm
        mode={mode}
        item={item}
        updateProject={updateProject}
        createProject={createProject}
        isCreating={isCreating}
        isUpdating={isUpdating}
      />
    </Content>
  );
};

export default ProjectFeature;

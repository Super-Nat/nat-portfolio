"use client";

import { DataTable } from "@/components/ui/data-table";
import { useProject } from "../hooks/useProject";
import { projectColumns } from "./ProjectsColumns";

const ProjectList = () => {
  const { projects, isLoading, deleteProject } = useProject({
    fetchList: true,
  });

  const columns = projectColumns((id: string) => deleteProject(id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={projects ?? []} />
    </div>
  );
};

export default ProjectList;

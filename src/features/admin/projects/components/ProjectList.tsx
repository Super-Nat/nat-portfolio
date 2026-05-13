"use client";

import { DataTable } from "@/components/ui/data-table";
import { useCollection } from "@/hooks/useCollection";
import { projectColumns } from "./ProjectsColumns";

const ProjectList = () => {
  const { collection, isLoading, deleteCollection } = useCollection({
    key: "projects",
    table: "projects",
  });

  const columns = projectColumns((id: string) => deleteCollection(id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={collection ?? []} />
    </div>
  );
};

export default ProjectList;

import Content from "@/components/layout/Content";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProjectList from "./components/ProjectList";

const ProjectsFeature = () => {
  return (
    <Content
      title="Projects"
      description="Manage your projects"
      actions={
        <Button>
          <Link
            href="/admin/projects/create"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      }
    >
      <ProjectList />
    </Content>
  );
};

export default ProjectsFeature;

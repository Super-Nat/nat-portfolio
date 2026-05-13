import ProjectFeature from "@/features/admin/projects/ProjectFeature";

const ProjectEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ProjectFeature id={id} />;
};

export default ProjectEditPage;

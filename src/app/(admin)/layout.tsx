import AdminProviders from "@/components/providers/AdminProviders";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminProviders>{children}</AdminProviders>;
};

export default AdminLayout;

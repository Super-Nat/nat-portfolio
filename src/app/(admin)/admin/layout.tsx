import DashboardLayout from "@/components/layout/DashboardLayout";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;

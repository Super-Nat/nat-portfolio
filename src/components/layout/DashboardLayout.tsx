"use client";

import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Container from "./Container";
import Header from "./Header";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Container>{children}</Container>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

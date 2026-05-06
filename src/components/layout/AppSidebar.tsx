import { navDashboard, navItems } from "@/config/ navConfig";
import NavHeader from "../nav/NavHeader";
import NavSection from "../nav/NavSection";
import NavUser from "../nav/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "../ui/sidebar";

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      variant="sidebar"
      className="overflow-hidden"
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavSection items={navDashboard} />
        <NavSection items={navItems} />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;

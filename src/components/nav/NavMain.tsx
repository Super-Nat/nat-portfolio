import { navItems } from "@/config/ navConfig";
import { SidebarGroup, SidebarMenu } from "../ui/sidebar";
import NavItem from "./NavItem";

const NavMain = ({ items }: { items: typeof navItems }) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;

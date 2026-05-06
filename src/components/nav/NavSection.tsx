import { NavItemType } from "@/types/nav";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "../ui/sidebar";
import NavItem from "./NavItem";

const NavSection = ({ items }: { items: NavItemType[] }) => {
  return (
    <>
      {items.map((item, index) => (
        <SidebarGroup key={index}>
          {item.label && <SidebarGroupLabel>{item.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {item.items.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
};

export default NavSection;

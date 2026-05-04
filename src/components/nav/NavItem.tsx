import { navItems } from "@/config/ navConfig";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const NavItem = ({ item }: { item: (typeof navItems)[number] }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <Link
          href={item.href}
          className="flex items-center gap-2 cursor-pointer"
        >
          <item.icon className="size-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavItem;

import { NavItemType } from "@/types/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

interface NavItemProps {
  item: NavItemType["items"][number];
}

const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={<Link href={item.href} className="flex items-center gap-2" />}
      >
        <item.icon className="size-4" />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavItem;

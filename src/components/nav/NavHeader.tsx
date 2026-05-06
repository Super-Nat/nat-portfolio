import Image from "next/image";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const NavHeader = () => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="flex items-center  py-[5px] gap-2 user-select-none hover:bg-transparent">
        <Image
          src="/logo.svg"
          alt="NAT PORTFOLIO ADMIN"
          width={30}
          height={30}
        />
        <div className="">
          <div className="text-sm font-bold">NAT PORTFOLIO</div>
          <div className="text-xs  text-gray-500">ADMIN</div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavHeader;

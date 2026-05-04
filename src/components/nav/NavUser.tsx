import { useSignOut } from "@/hooks/useSignOut";
import { useAuthStore } from "@/stores/authStore";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const NavUser = () => {
  const { user } = useAuthStore();
  const createAvatarFallback = user?.email?.split("@");
  const avatarFallback = `${createAvatarFallback?.[0]?.charAt(0).toUpperCase()}${createAvatarFallback?.[1]?.charAt(0).toUpperCase()}`;
  const { signOut } = useSignOut();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.email ?? ""}
          />
          <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user?.email}</span>
        <LogOutIcon
          className="size-4 ml-auto cursor-pointer"
          onClick={() => signOut()}
        />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavUser;

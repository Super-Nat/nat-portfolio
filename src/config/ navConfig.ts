// config/navConfig.ts
import {
  Briefcase,
  Code,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  User,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "About",
    href: "/admin/about",
    icon: User,
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Code,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
];

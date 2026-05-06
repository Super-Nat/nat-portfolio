// config/navConfig.ts
import {
  Code,
  FolderKanban,
  House,
  LayoutDashboard,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";

export const navDashboard = [
  {
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
];

export const navItems = [
  {
    label: "Content",
    items: [
      { title: "Hero", href: "/admin/hero", icon: House },
      { title: "About", href: "/admin/about", icon: User },
      { title: "Contact", href: "/admin/contact", icon: Mail },
    ],
  },
  {
    label: "Works",
    items: [
      { title: "Projects", href: "/admin/projects", icon: FolderKanban },
      { title: "Skills", href: "/admin/skills", icon: Code },
      {
        title: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquare,
      },
    ],
  },
];

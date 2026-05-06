import { LucideIcon } from "lucide-react";

export interface NavItemType {
  label?: string;
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}

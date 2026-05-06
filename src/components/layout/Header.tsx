import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  const pathname = usePathname();
  const breadcrumbItems = pathname.split("/").filter((item) => item !== "");
  const breadcrumbLinks = breadcrumbItems
    .filter((item) => item !== "admin")
    .map((item) => ({
      href: `/admin/${item}`,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    }));

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4 self-auto!" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbLinks.map((link, index) => (
              <div key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbLinks.length - 1 && index !== 0 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;

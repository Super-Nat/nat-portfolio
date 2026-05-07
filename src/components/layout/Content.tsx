import { Separator } from "@/components/ui/separator";

const Content = ({
  children,
  title,
  description,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  description: string;
}>) => {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
};

export default Content;

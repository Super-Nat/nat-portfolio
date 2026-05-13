import { Separator } from "@/components/ui/separator";

const Content = ({
  children,
  title,
  description,
  actions,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  description: string;
  actions?: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col gap-6 p-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {actions}
      </div>
      <Separator />
      {children}
    </div>
  );
};

export default Content;

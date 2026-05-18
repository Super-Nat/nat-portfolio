import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[calc(100vh-350px)]">
      <Loader2 className="w-10 h-10 animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
};

export default Loading;

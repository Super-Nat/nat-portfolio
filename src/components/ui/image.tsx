import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ImageComponentProps {
  filePreview: string;
  previewWidth: number;
  previewHeight: number;
  previewClassName: string;
}

const ImageComponent = ({
  filePreview,
  previewWidth,
  previewHeight,
  previewClassName,
}: ImageComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      <Image
        src={filePreview}
        alt="Preview"
        onLoad={() => setIsLoading(false)}
        className={cn(
          "rounded-lg object-cover transition-opacity duration-300",
          previewClassName,
          isLoading ? "opacity-0" : "opacity-100",
        )}
        width={previewWidth}
        height={previewHeight}
        loading="eager"
      />
    </div>
  );
};
export default ImageComponent;

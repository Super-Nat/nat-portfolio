import { FileIcon, PencilIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import ImageComponent from "./image";

interface UploadFileProps {
  fieldName: string;
  onFileChange?: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  previewHeight?: number;
  previewWidth?: number;
  previewClassName?: string;
  type?: "image" | "file";
  isLoading?: boolean;
}

const UploadFile = ({
  fieldName,
  accept,
  maxSize,
  previewHeight = 96,
  previewWidth = 96,
  previewClassName,
  type = "image",
  isLoading,
}: UploadFileProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const form = useFormContext();
  const imageUrl = form.watch(fieldName);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageUrl && typeof imageUrl === "string") {
      setFilePreview(`${process.env.NEXT_PUBLIC_R2_ENDPOINT_URL}/${imageUrl}`);
    }
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilePreview(URL.createObjectURL(file));
    form.setValue(fieldName, file);
  };

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  return (
    <>
      <input
        type="file"
        ref={ref}
        hidden
        onChange={handleImageChange}
        accept={accept ?? "image/*"}
        max={maxSize}
      />
      {filePreview &&
        (type === "image" ? (
          <div className="relative w-24 h-24 mb-2 overflow-hidden rounded-lg">
            <ImageComponent
              filePreview={filePreview ?? ""}
              previewWidth={previewWidth}
              previewHeight={previewHeight}
              previewClassName={previewClassName ?? ""}
            />
            <div
              className="absolute w-full h-full z-10 bg-black/50 flex items-center justify-center top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => ref.current?.click()}
            >
              <PencilIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2 relative w-25">
            <a
              href={filePreview}
              target="_blank"
              className="text-sm text-muted-foreground rounded-sm w-full"
            >
              <FileIcon className="w-25 h-25" />
              <p className="mt-2 w-full text-xs text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap ">
                {filePreview}
              </p>
            </a>
          </div>
        ))}
      {!filePreview && (
        <div
          className="flex items-center gap-2 mb-2 relative w-25 h-25 cursor-pointer justify-center  border border-dashed border-muted-foreground rounded-lg"
          onClick={() => ref.current?.click()}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <UploadIcon className="w-5 h-5 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">
              Click to upload {type === "image" ? "image" : "file"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFile;

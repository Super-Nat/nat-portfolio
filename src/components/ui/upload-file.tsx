import {
  resolveUploadOptions,
  type UploadProfile,
  validateFile,
} from "@/lib/upload/validateFile";
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
  onFileChange,
  accept,
  maxSize,
  previewHeight = 96,
  previewWidth = 96,
  previewClassName,
  type = "image",
}: UploadFileProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [blobPreview, setBlobPreview] = useState<string | null>(null);
  const form = useFormContext();
  const imageUrl = form.watch(fieldName);
  const ref = useRef<HTMLInputElement>(null);

  const profile: UploadProfile = type === "image" ? "image" : "pdf";
  const { maxSize: resolvedMaxSize, accept: resolvedAccept } =
    resolveUploadOptions(profile, { maxSize, accept });

  useEffect(() => {
    if (imageUrl && typeof imageUrl === "string") {
      setFilePreview(
        `${process.env.NEXT_PUBLIC_R2_ENDPOINT_URL}/${imageUrl}`,
      );
      setBlobPreview(null);
    }
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      if (blobPreview) URL.revokeObjectURL(blobPreview);
    };
  }, [blobPreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file, {
      maxSize: resolvedMaxSize,
      accept: resolvedAccept,
    });

    if (!validation.valid) {
      form.setError(fieldName, { type: "manual", message: validation.message });
      e.target.value = "";
      return;
    }

    form.clearErrors(fieldName);

    if (blobPreview) URL.revokeObjectURL(blobPreview);
    const objectUrl = URL.createObjectURL(file);
    setBlobPreview(objectUrl);
    setFilePreview(objectUrl);
    form.setValue(fieldName, file, { shouldValidate: true });
    onFileChange?.(file);
  };

  const displayPreview = filePreview;
  const fieldError = form.formState.errors[fieldName]?.message;

  return (
    <>
      <input
        type="file"
        ref={ref}
        hidden
        onChange={handleImageChange}
        accept={resolvedAccept}
      />
      {fieldError && (
        <p className="text-sm text-destructive mb-2">{String(fieldError)}</p>
      )}
      {displayPreview &&
        (type === "image" ? (
          <div className="relative w-24 h-24 mb-2 overflow-hidden rounded-lg">
            <ImageComponent
              filePreview={displayPreview}
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
              href={displayPreview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground rounded-sm w-full"
            >
              <FileIcon className="w-25 h-25" />
              <p className="mt-2 w-full text-xs text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
                {blobPreview ? "Selected file" : displayPreview}
              </p>
            </a>
          </div>
        ))}
      {!displayPreview && (
        <div
          className="flex items-center gap-2 mb-2 relative w-25 h-25 cursor-pointer justify-center border border-dashed border-muted-foreground rounded-lg"
          onClick={() => ref.current?.click()}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <UploadIcon className="w-5 h-5 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">
              Click to upload {type === "image" ? "image" : "file"} (max{" "}
              {resolvedMaxSize / (1024 * 1024)}MB)
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFile;

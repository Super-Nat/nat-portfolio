"use client";

import { uploadAction } from "@/actions/uploadFileAction";
import type { UploadProfile } from "@/lib/upload/validateFile";
import { useState } from "react";

interface UploadOptions {
  profile?: UploadProfile;
}

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, options?: UploadOptions) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("profile", options?.profile ?? "image");

    const { key, error } = await uploadAction(formData);

    if (error) {
      setError(error);
      setIsUploading(false);
      return { key: null, error };
    }

    setIsUploading(false);
    return { key, error: null };
  };

  return { upload, isUploading, error };
};

"use client";

import { uploadAction } from "@/actions/uploadFileAction";
import { useState } from "react";

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const { url, error } = await uploadAction(formData);

    if (error) {
      setError(error);
      setIsUploading(false);
      return { url: null, error };
    }

    setIsUploading(false);
    return { url, error: null };
  };

  return { upload, isUploading, error };
};

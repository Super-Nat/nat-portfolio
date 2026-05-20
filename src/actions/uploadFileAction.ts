"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { r2Client } from "@/lib/r2/r2Client";
import {
  type UploadProfile,
  resolveUploadOptions,
  validateFile,
} from "@/lib/upload/validateFile";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadAction = async (formData: FormData) => {
  await requireAuth();

  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided", key: null };

  const profile = (formData.get("profile") as UploadProfile) || "image";
  if (profile !== "image" && profile !== "pdf") {
    return { error: "Invalid upload profile", key: null };
  }

  const { maxSize, accept } = resolveUploadOptions(profile);
  const validation = validateFile(file, { maxSize, accept });

  if (!validation.valid) {
    return { error: validation.message, key: null };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return { key: filename, error: null };
};

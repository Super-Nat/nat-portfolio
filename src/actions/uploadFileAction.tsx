"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { r2Client } from "@/lib/r2/r2Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadAction = async (formData: FormData) => {
  await requireAuth();

  const file = formData.get("file") as File;
  if (!file) return { error: "No file provided", url: null };

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

  const url = filename;
  return { url, error: null };
};

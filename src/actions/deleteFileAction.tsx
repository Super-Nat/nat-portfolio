"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { r2Client } from "@/lib/r2/r2Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const deleteFileAction = async (url: string) => {
  await requireAuth();

  const key = url.replace(`${process.env.R2_PUBLIC_URL}/`, "");

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
    }),
  );

  return { error: null };
};

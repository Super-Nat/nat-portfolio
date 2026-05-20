"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { r2Client } from "@/lib/r2/r2Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const deleteFileAction = async (key: string) => {
  await requireAuth();

  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
      }),
    );
  } catch (error) {
    return { error: "Failed to delete file" };
  }

  return { error: null };
};

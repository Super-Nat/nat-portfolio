/** Matches next.config experimental.serverActions.bodySizeLimit */
export const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;

export type UploadProfile = "image" | "pdf";

export const UPLOAD_PROFILES: Record<
  UploadProfile,
  { accept: string; maxSize: number }
> = {
  image: { accept: "image/*", maxSize: DEFAULT_MAX_BYTES },
  pdf: { accept: ".pdf", maxSize: DEFAULT_MAX_BYTES },
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
}

function matchesAccept(
  file: { type: string; name: string },
  accept: string,
): boolean {
  const tokens = accept
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return file.name.toLowerCase().endsWith(token.toLowerCase());
    }
    if (token.endsWith("/*")) {
      const prefix = token.slice(0, -1);
      return file.type.startsWith(prefix);
    }
    return file.type === token;
  });
}

export function validateFile(
  file: { size: number; type: string; name: string },
  options: { maxSize: number; accept: string },
): { valid: true } | { valid: false; message: string } {
  if (file.size > options.maxSize) {
    return {
      valid: false,
      message: `File must be smaller than ${formatBytes(options.maxSize)}`,
    };
  }

  if (!matchesAccept(file, options.accept)) {
    return {
      valid: false,
      message: "File type is not allowed",
    };
  }

  return { valid: true };
}

export function resolveUploadOptions(
  profile: UploadProfile,
  overrides?: { maxSize?: number; accept?: string },
) {
  const defaults = UPLOAD_PROFILES[profile];
  const maxSize = Math.min(
    overrides?.maxSize ?? defaults.maxSize,
    DEFAULT_MAX_BYTES,
  );
  const accept = overrides?.accept ?? defaults.accept;

  return { maxSize, accept, profile };
}

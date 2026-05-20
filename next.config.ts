import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // ปรับตามต้องการครับ
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-fdc0357ef61f47c59d906cb58788fa0a.r2.dev",
      },
    ],
  },
};

export default nextConfig;

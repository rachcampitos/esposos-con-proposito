import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uhcffaizfyipikktabhk.supabase.co",
      },
    ],
  },
};

export default nextConfig;

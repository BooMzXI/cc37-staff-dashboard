import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://dev-api.comcamp.io/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;

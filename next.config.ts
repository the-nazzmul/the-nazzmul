import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      // Local CMS over HTTP during `next dev` only (production build omits these)
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              pathname: "/**",
            },
            {
              protocol: "http" as const,
              hostname: "127.0.0.1",
              pathname: "/**",
            },
          ]
        : []),
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;

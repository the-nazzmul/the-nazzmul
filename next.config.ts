import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      // Same-origin absolute URLs during dev (e.g. CMS stores http://localhost:3000/...).
      // Port must match `next dev` (default 3000) or Next/Image rejects the host.
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "3000",
              pathname: "/**",
            },
            {
              protocol: "http" as const,
              hostname: "127.0.0.1",
              port: "3000",
              pathname: "/**",
            },
          ]
        : []),
    ],
    minimumCacheTTL: 60,
    // Dev-only: DNS (VPN/NAT64/proxy) can make public hostnames resolve to addresses Next
    // treats as "private", which blocks the image optimizer. Not needed on Vercel builds.
    ...(process.env.NODE_ENV === "development"
      ? { dangerouslyAllowLocalIP: true }
      : {}),
  },
};

export default nextConfig;

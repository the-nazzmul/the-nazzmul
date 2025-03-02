import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghks3sgigz.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;

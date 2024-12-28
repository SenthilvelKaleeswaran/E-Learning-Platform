import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*"
      },
    ],
    unoptimized : true
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;

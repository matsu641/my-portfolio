import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/portfolio",
        destination: "/Misumi%20Matsudo%20UIUX%20Portfolio.pdf",
      },
    ];
  },
};

export default nextConfig;

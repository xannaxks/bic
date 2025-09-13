import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Enable standalone output for optimized Docker builds
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "localhost",
      "tongmyong.ac.kr",
      "i.namu.wiki",
      "i.pinimg.com",
      "www.tu.ac.kr",
      "media.licdn.com",
      "international.fpt.edu.vn",
      "encrypted-tbn0.gstatic.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: "/images/hero/:path*",
        destination: "/images/placeholder.svg",
      },
      {
        source: "/images/news/:path*",
        destination: "/images/placeholder.svg",
      },
      {
        source: "/images/videos/:path*",
        destination: "/images/placeholder.svg",
      },
    ];
  },
};

export default withNextIntl(nextConfig);

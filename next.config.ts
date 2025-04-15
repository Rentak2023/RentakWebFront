import createBundleAnalyzerPlugin from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Provide the path to the messages that you're using in `AppConfig`
    createMessagesDeclaration: "./messages/en.json",
  },
  // ...
});
const withBundleAnalyzer = createBundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "csb10032002912fe08a.blob.core.windows.net",
        port: "",
        pathname: "/transferimages/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    // typedRoutes: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      // old unit url
      {
        source: "/unit/:id",
        destination: "/units/:id",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rentakapp.com" }],
        destination: "https://rentakapp.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

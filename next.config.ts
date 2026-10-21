import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // Vape listing slug was renamed; keep old ad links working with a true 301.
    return [
      {
        source: "/listings/commercial-drive-vape-store",
        destination: "/listings/vancouver-vape-store",
        statusCode: 301,
      },
      {
        source: "/whatsapp/listings/commercial-drive-vape-store",
        destination: "/whatsapp/listings/vancouver-vape-store",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;

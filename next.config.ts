import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.ibb.co/**"),
      new URL("https://drive.google.com/**"),
      new URL("https://bxgsybgqqyseomtvxyzv.supabase.co/**"),
    ],
  },
};

export default nextConfig;

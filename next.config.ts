import type { NextConfig } from "next";

interface MyNextConfig extends NextConfig {
  eslint?: {
    dirs: string[];
  };
}

const nextConfig: NextConfig = {
    reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'eu-west-2.graphassets.com' }],
  },
  allowedDevOrigins: process.env.NEXT_DEV_LAN_HOST ? [process.env.NEXT_DEV_LAN_HOST] : [],
};


(nextConfig as MyNextConfig).eslint = { dirs: ['src'] };
export default nextConfig;

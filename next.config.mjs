import { redirects } from "./redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;

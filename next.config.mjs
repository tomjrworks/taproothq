import { withBotId } from "botid/next/config";
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

export default withBotId(nextConfig);

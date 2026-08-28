import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Content editors upload artwork in the Studio, which serves it from the
       Sanity CDN. Without this, the first image a client uploads would throw
       at runtime instead of rendering. */
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;

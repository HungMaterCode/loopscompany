import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/:path*",
        destination: "/bai-viet/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/:path*",
        destination: "/bai-viet/:path*",
        permanent: true,
      },
      {
        source: "/vi/team",
        destination: "/doi-ngu",
        permanent: true,
      },
      {
        source: "/vi/team/:path*",
        destination: "/doi-ngu",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/doi-ngu",
        permanent: true,
      },
      {
        source: "/team/:path*",
        destination: "/doi-ngu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

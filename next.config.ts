import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
    ],
  },
  // SEO Optimization
  compress: true,
  // Enable SWR (stale-while-revalidate) for better caching
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Configure redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        destination: '/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'www.rehas.in',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

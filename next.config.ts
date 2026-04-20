import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // =========== OUTPUT OPTIMIZATION ===========
  // Reduce build output size
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@next/swc',
      'node_modules/sharp',
      'node_modules/sharp-ico',
      'node_modules/pyright',
    ],
  },

  // =========== IMAGE OPTIMIZATION ===========
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
    // Image optimization settings
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // =========== COMPRESSION ===========
  compress: true,

  // =========== TURBOPACK CONFIGURATION (Next.js 16) ===========
  turbopack: {
    resolveAlias: {
      // Optimize MUI imports
      '@mui/material': '@mui/material',
    },
  },

  // =========== CACHING & PERFORMANCE ===========
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // =========== REDIRECTS ===========
  async redirects() {
    return [
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

  // =========== BUILD OPTIMIZATION ===========
  productionBrowserSourceMaps: false, // Disable source maps in production
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

export default nextConfig;

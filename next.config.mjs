// C:\Users\User1\abm2\next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  images: {
    // Serve static files directly — Vercel image optimizer returns 402 on this project
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    emotion: false,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Enable SWC minification
  swcMinify: true,

  // Optimize chunks
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-dialog'],
  },

  // Modern JavaScript output (reduces polyfills)
  transpilePackages: [],
  
  // Reduce JavaScript for better performance
  productionBrowserSourceMaps: false,

  // --- NEW: Add redirect configuration ---
  async redirects() {
    return [
      {
        source: '/fits', // The bad URL or typo
        destination: '/fitment', // The correct destination page
        permanent: true, // Use a 308 permanent redirect
      },
      {
        source: '/fitting', // Another common typo
        destination: '/fitment', 
        permanent: true,
      },
      {
        source: '/vehicles/mercedes-benz',
        destination: '/vehicles/mercedes',
        permanent: true,
      },
      {
        source: '/products/:id(\\d+)',
        destination: '/products/id/:id',
        permanent: true,
      },
      {
        source: '/products/automotive',
        destination: '/products/type/automotive',
        permanent: true,
      },
      {
        source: '/products/performance',
        destination: '/products/type/performance',
        permanent: true,
      },
      {
        source: '/products/truck-commercial',
        destination: '/products/type/truck-commercial',
        permanent: true,
      },
      {
        source: '/products/motorcycle',
        destination: '/products/type/motorcycle',
        permanent: true,
      },
      {
        source: '/products/deep-cycle',
        destination: '/products/type/deep-cycle',
        permanent: true,
      },
    ]
  },
  
  // Add headers for performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
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
        source: '/login',
        destination: '/studio',
        permanent: false,
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
      {
        source: '/power-plus',
        destination: '/products/brand/power-plus',
        permanent: true,
      },
      {
        source: '/eco-plus',
        destination: '/products/brand/eco-plus',
        permanent: true,
      },
      {
        source: '/brands',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/whatsapp',
        destination: 'https://wa.me/27823046926?text=Hi%20Alberton%20Battery%20Mart%2C%20I%20need%20a%20battery%20quote',
        permanent: false,
      },
      {
        source: '/store-hours',
        destination: '/contact#hours',
        permanent: false,
      },
      {
        source: '/agm-battery-alberton',
        destination: '/agm-battery',
        permanent: true,
      },
      {
        source: '/agm',
        destination: '/agm-battery',
        permanent: true,
      },
      {
        source: '/efb-battery-alberton',
        destination: '/efb-battery',
        permanent: true,
      },
      {
        source: '/efb',
        destination: '/efb-battery',
        permanent: true,
      },
      {
        source: '/start-stop-battery-alberton',
        destination: '/start-stop-battery',
        permanent: true,
      },
      {
        source: '/stop-start-battery',
        destination: '/start-stop-battery',
        permanent: true,
      },
      {
        source: '/start-stop',
        destination: '/start-stop-battery',
        permanent: true,
      },
      {
        source: '/bmw-battery',
        destination: '/vehicles/bmw',
        permanent: true,
      },
      {
        source: '/mercedes-battery',
        destination: '/vehicles/mercedes',
        permanent: true,
      },
      {
        source: '/drive-in',
        destination: '/visit',
        permanent: true,
      },
      {
        source: '/store',
        destination: '/visit',
        permanent: true,
      },
      {
        source: '/how-to-find-us',
        destination: '/visit',
        permanent: true,
      },
      {
        source: '/warranty-info',
        destination: '/warranty',
        permanent: true,
      },
      {
        source: '/willard-batteries',
        destination: '/products/brand/willard',
        permanent: true,
      },
      {
        source: '/exide-batteries',
        destination: '/products/brand/exide',
        permanent: true,
      },
      {
        source: '/enertec-batteries',
        destination: '/products/brand/enertec',
        permanent: true,
      },
      {
        source: '/battery-recycling',
        destination: '/recycle-battery',
        permanent: true,
      },
      {
        source: '/blog/fix-mercedes-auxiliary-battery-malfunction-alberton',
        destination: '/vehicles/mercedes',
        permanent: true,
      },
      {
        source: '/blog/mercedes-auxiliary-battery-malfunction-alberton',
        destination: '/vehicles/mercedes',
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
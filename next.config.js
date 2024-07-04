/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    // domains: ['res.cloudinary.com'],
    unoptimized: true,
    formats:['image/webp','image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental:{
    missingSuspenseWithCSRBailout:false
  }
};

module.exports = nextConfig;

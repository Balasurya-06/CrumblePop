import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com', // already added
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c8.alamy.com', // Add this domain here
        port: '',
        pathname: '/**', // This allows any path on this domain
      },
    ],
  },
};

export default nextConfig;

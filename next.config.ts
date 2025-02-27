import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'l1vj3qvmpc.ufs.sh',
        pathname: '/f/*',
      },
      {
        protocol: 'https',
        hostname: 'q1gpf5ptq4.ufs.sh',
        port: '',
        pathname: '/f/*',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

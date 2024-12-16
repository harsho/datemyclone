/** @type {import('next').NextConfig} */
//import type { NextConfig } from 'next';

const nextConfig = {
  typescript: {
    // !! WARN !!
    // This is a temporary solution to get the build working
    // Remove this when you've fixed all type errors
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  }, 
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
}

module.exports = nextConfig

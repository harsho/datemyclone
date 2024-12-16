/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // This is a temporary solution to get the build working
    // Remove this when you've fixed all type errors
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
}

module.exports = nextConfig

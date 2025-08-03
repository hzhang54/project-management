/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      // Disable ESLint during builds
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Disable TypeScript errors during builds (optional)
      ignoreBuildErrors: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hui-pm-image-s3.s3.us-west-2.amazonaws.com',
          port: '',
          pathname: '/**',
        }
      ]
    }
  }
  
  module.exports = nextConfig
  
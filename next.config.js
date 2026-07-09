/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs locally via `npm run lint`; skip during production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors are caught locally; allow build to complete for deployment
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig

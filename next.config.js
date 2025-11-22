/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['scontent.cdninstagram.com', 'scontent-iad3-2.cdninstagram.com', 'instagram.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig 
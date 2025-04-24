/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['plixon.s3.ap-south-1.amazonaws.com'], // Add your domains here if needed
    unoptimized: true,
  },
};

module.exports = nextConfig;

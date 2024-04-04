/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["tecjaunt.store"],
  },
};

export default nextConfig;

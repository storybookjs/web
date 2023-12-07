/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars3.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;

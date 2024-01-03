/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars3.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars2.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars0.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // This was added to fix the error with remarkExpressiveCode
  // https://stackoverflow.com/questions/77009138/module-has-no-exports-error-works-fine-on-stackblitz-but-fails-locally
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
};

module.exports = nextConfig;

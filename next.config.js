/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;

// module.exports = {
//   experimental: { appDir: true },
//   webpack(config) {
//     config.experiments = { ...config.experiments, topLevelAwait: true };
//     return config;
//   },
// };

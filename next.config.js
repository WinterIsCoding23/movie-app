/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;

// Solution from:
// https://stackoverflow.com/questions/72474803/error-the-top-level-await-experiment-is-not-enabled-set-experiments-toplevelaw

// module.exports = {
//   experimental: { appDir: true },
//   webpack(config) {
//     config.experiments = { ...config.experiments, topLevelAwait: true };
//     return config;
//   },
// };

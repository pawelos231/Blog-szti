/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  esmExternals: false,
  webpack: (config, { isServer }) => {
    if (!config.experiments) {
      config.experiments = {};
    }
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }

    config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = nextConfig;

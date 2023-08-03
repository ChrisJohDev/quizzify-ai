/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Configure webpack.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   * @see https://webpack.js.org/configuration/
   * @param {import('webpack').Configuration} config - The webpack configuration.
   * @returns {import('webpack').Configuration} - The webpack configuration.
   */
  webpack: (config) => {
    console.log('Webpack config:', config);
    // Exclude the unused-code folder
    config.module.rules.push({
      test: /unused-code/,
      use: 'null-loader'
    });

    return config;
  }
};

module.exports = nextConfig;

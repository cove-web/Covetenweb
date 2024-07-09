/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack(config, { isServer }) {
    // Add file-loader configuration for mp3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/audio/', // adjust the output path as needed
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;

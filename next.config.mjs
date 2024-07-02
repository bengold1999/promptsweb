/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Make sure this feature is supported by your Next.js version
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    }
  }
  
  export default nextConfig;
  
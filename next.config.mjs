/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable API routes for this project
  async rewrites() {
    return [];
  },
  webpack: (config) => {
    // Add React Native Web alias
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    };
    
    // Exclude all API routes by ignoring all files in the api directory
    config.module.rules.push({
      test: /src\/app\/api\/.*/,
      use: 'ignore-loader',
    });
    
    return config;
  },
  // Explicitly define page extensions to use
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;

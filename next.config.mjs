// next.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nextBuildId from 'next-build-id';
import withNextIntl from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntlConfig = withNextIntl('./i18n.ts');

const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  reactStrictMode: false,
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    PAGE_PROPS_REVALIDATE: process.env.PAGE_PROPS_REVALIDATE,
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dx66fumod/**',
      },
    ],
  },
};

export default withBundleAnalyzerConfig(withNextIntlConfig(nextConfig));

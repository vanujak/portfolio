/** @type {import('next').NextConfig} */
const isStatic = process.env.IS_STATIC_EXPORT === 'true' || process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true';

const nextConfig = {
  ...(isStatic ? { output: 'export' } : {}),
  basePath: isStatic ? '/portfolio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

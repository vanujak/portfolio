import os from 'os';

// Collect local network IPv4 addresses so mobile devices on the same Wi-Fi can load Next.js 16 dev assets
const localOrigins = ['localhost', '127.0.0.1'];
const interfaces = os.networkInterfaces();
for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name] || []) {
    if (net.family === 'IPv4' && !net.internal) {
      localOrigins.push(net.address);
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: localOrigins,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
      },
    ],
  },
};

export default nextConfig;

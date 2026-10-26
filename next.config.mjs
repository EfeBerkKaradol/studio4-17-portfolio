/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Eski adresler yeni yapıya kalıcı olarak yönlendirilir
    return [
      { source: '/projeler', destination: '/portfolyo', permanent: true },
      { source: '/projeler/:path*', destination: '/portfolyo', permanent: true },
      { source: '/uzmanliklar', destination: '/hizmetler', permanent: true },
      { source: '/hakkimda', destination: '/hakkimizda', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;

module.exports = {
  reactStrictMode: true,
  images: { domains: ['images.unsplash.com','avatars.githubusercontent.com'] },
  async headers() {
    return [
      { source: '/(.*)', headers: [{ key: 'Permissions-Policy', value: 'geolocation=()' }] }
    ]
  },
  experimental: { scrollRestoration: true }
};

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['rb.gy', 'image.tmdb.org']
  },
  redirects: async () => [
    { source: '/', destination: '/home', permanent: true }
  ]
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/prep' : '/',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trade',
        permanent: false,
      }
    ]
  } 
}

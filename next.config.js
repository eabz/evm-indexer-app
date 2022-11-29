// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const plugins = []

plugins.push(withPWA)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/block',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tx',
        destination: '/',
        permanent: true,
      },
      {
        source: '/address',
        destination: '/',
        permanent: true,
      },
      {
        source: '/api',
        destination: '/api-doc',
        permanent: true,
      },
      {
        source: '/api/block',
        destination: '/api-doc',
        permanent: true,
      },
      {
        source: '/api/address',
        destination: '/api-doc',
        permanent: true,
      },
      {
        source: '/api/tx',
        destination: '/api-doc',
        permanent: true,
      },
    ]
  },
}

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig)

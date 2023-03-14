/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images : {domains : ["i.dummyjson.com" ,"m.media-amazon.com"]},
  eslint: {
    ignoreDuringBuilds: true,
},
typescript: {
  ignoreBuildErrors: true,
},
env: {
  SERVER: process.env.domain,
},
}

module.exports = nextConfig

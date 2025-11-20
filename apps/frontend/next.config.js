/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: 'http://localhost:4000/graphql',
  },
  reactStrictMode: true,
}

export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/graphql": ["./graphql/schemas/**/*.graphql"],
  },
};

export default nextConfig;

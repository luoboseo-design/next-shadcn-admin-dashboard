/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/home",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/home",
        permanent: false,
      },
      {
        source: "/dashboard/services/backlinks",
        destination: "/dashboard/services/seo/backlinks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

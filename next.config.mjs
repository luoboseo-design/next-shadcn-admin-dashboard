/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      // 登录后默认落在任务中心
      {
        source: "/dashboard",
        destination: "/dashboard/tasks",
        permanent: false,
      },
      // 旧营销站路由 → 新路由（营销站已移出 /dashboard）
      {
        source: "/dashboard/home",
        destination: "/",
        permanent: false,
      },
      {
        source: "/dashboard/services/backlinks",
        destination: "/services/seo/backlinks",
        permanent: true,
      },
      {
        source: "/dashboard/services/:path*",
        destination: "/services/:path*",
        permanent: false,
      },
      {
        source: "/dashboard/reports/:path*",
        destination: "/reports/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

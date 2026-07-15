import type { ReactNode } from "react";

import { AppShell } from "@/components/layouts/app-shell";

/**
 * 营销站路由组：首页、服务页、审计报告页。
 * 免登录即可浏览，具体操作（下单/付款）在页面内部引导登录。
 */
export default function MarketingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}

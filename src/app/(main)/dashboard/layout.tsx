import type { ReactNode } from "react";

import { DashboardGuard } from "@/components/auth/dashboard-guard";
import { AppShell } from "@/components/layouts/app-shell";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AppShell>
      <DashboardGuard>{children}</DashboardGuard>
    </AppShell>
  );
}

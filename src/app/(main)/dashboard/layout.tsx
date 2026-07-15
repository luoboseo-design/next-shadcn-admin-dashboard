import type { ReactNode } from "react";

import { AppShell } from "@/components/layouts/app-shell";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}

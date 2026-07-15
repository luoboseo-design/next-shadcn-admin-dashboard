"use client";

import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import { LogIn, ShieldAlert } from "lucide-react";

import { useAuthDialog } from "@/components/auth/auth-dialog-provider";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

/**
 * 仪表盘守卫：包裹需要登录的 /dashboard 页面。
 * - 会话恢复中：渲染空白避免闪烁
 * - 未登录：显示提示占位并自动弹出登录框，登录成功后原地展示内容
 */
export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const { openAuthDialog } = useAuthDialog();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (isHydrated && !user && !promptedRef.current) {
      promptedRef.current = true;
      openAuthDialog({ reason: "此页面需要登录后才能访问" });
    }
    if (user) {
      promptedRef.current = false;
    }
  }, [isHydrated, user, openAuthDialog]);

  // 会话恢复中，避免闪烁
  if (!isHydrated) {
    return null;
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <ShieldAlert className="size-7 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">需要登录</h2>
          <p className="text-sm text-muted-foreground text-pretty">登录后即可查看任务、账单和账户信息</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/")}>
            返回首页
          </Button>
          <Button size="sm" onClick={() => openAuthDialog({ reason: "此页面需要登录后才能访问" })}>
            <LogIn className="size-4" />
            立即登录
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import type { ReactNode } from "react";

import { useAuthDialog } from "@/components/auth/auth-dialog-provider";
import { useIsAuthenticated } from "@/stores/auth-store";

interface AuthGateProps {
  children: ReactNode;
  /** 弹窗中展示的场景化文案 */
  reason?: string;
  className?: string;
}

/**
 * 认证拦截包装器：未登录时，拦截内部所有输入框/复选框等控件的
 * 聚焦与点击操作，并弹出登录框；已登录时完全透明不影响交互。
 */
export function AuthGate({ children, reason, className }: AuthGateProps) {
  const isAuthenticated = useIsAuthenticated();
  const { openAuthDialog } = useAuthDialog();

  const intercept = (target: EventTarget | null) => {
    // 让当前聚焦的控件立即失焦，避免弹窗弹出后仍可输入
    if (target instanceof HTMLElement) {
      target.blur();
    }
    openAuthDialog({
      reason: reason ?? "请先登录后再填写任务信息",
    });
  };

  if (isAuthenticated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      onPointerDownCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
        intercept(e.target);
      }}
      onFocusCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
        intercept(e.target);
      }}
      onKeyDownCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
        intercept(e.target);
      }}
    >
      {children}
    </div>
  );
}

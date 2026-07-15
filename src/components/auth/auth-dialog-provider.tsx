"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { AuthDialog } from "./auth-dialog";

interface OpenAuthDialogOptions {
  /** 弹窗顶部提示文案，说明为什么需要登录 */
  reason?: string;
  /** 默认展示登录还是注册面板 */
  mode?: "login" | "register";
  /** 登录/注册成功后的回调（如继续提交表单） */
  onSuccess?: () => void;
}

interface AuthDialogContextValue {
  openAuthDialog: (options?: OpenAuthDialogOptions) => void;
}

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function useAuthDialog() {
  const ctx = useContext(AuthDialogContext);
  if (!ctx) {
    throw new Error("useAuthDialog 必须在 AuthDialogProvider 内使用");
  }
  return ctx;
}

export function AuthDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OpenAuthDialogOptions>({});

  const openAuthDialog = useCallback((opts?: OpenAuthDialogOptions) => {
    setOptions(opts ?? {});
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openAuthDialog }), [openAuthDialog]);

  return (
    <AuthDialogContext.Provider value={value}>
      {children}
      <AuthDialog
        key={`${options.mode ?? "login"}-${open}`}
        open={open}
        onOpenChange={setOpen}
        reason={options.reason}
        defaultMode={options.mode}
        onSuccess={options.onSuccess}
      />
    </AuthDialogContext.Provider>
  );
}

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

/** 演示账户（模拟环境：任意邮箱密码均可登录，均映射到该账户） */
export const DEMO_USER: AuthUser = {
  id: "demo-user",
  name: "演示用户",
  email: "demo@luoboseo.com",
  avatar: "",
  role: "会员",
};

interface AuthState {
  user: AuthUser | null;
  /** persist 恢复完成标记，避免刷新后瞬间闪烁未登录态 */
  isHydrated: boolean;
  login: (user?: Partial<AuthUser>) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      login: (user) =>
        set({
          user: {
            ...DEMO_USER,
            ...user,
            // 用登录邮箱生成显示名，让演示更真实
            name: user?.name ?? (user?.email ? user.email.split("@")[0] : DEMO_USER.name),
          },
        }),
      logout: () => set({ user: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "demo-auth-session",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

/** 便捷选择器：是否已登录 */
export function useIsAuthenticated() {
  return useAuthStore((s) => !!s.user);
}

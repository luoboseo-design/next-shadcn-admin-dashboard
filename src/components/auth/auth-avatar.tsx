"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BadgeCheck, ClipboardList, CreditCard, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

import { useAuthDialog } from "@/components/auth/auth-dialog-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

/**
 * 顶栏头像区域：
 * - 未登录：显示"登录"按钮，点击唤起登录弹窗
 * - 已登录：显示头像 + 用户菜单（任务中心 / 账单 / 账户设置 / 退出登录）
 */
export function AuthAvatar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { openAuthDialog } = useAuthDialog();

  if (!user) {
    return (
      <Button
        size="sm"
        onClick={() => openAuthDialog({ reason: "登录后即可管理任务、查看账单和账户信息" })}
      >
        <LogIn className="size-4" />
        登录
      </Button>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("已退出登录");
    // 退出后若停留在需要登录的仪表盘页面，跳回首页
    if (pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="打开用户菜单" className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={user.avatar || undefined} alt={user.name} />
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-2 px-1 py-1.5">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/tasks">
              <ClipboardList />
              任务中心
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/billing">
              <CreditCard />
              账单中心
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account">
              <BadgeCheck />
              账户设置
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOut />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

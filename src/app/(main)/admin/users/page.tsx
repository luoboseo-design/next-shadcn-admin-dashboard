"use client";

import { useState } from "react";

import { Download, MoreHorizontal, Search, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserOrderStats } from "@/data/admin-orders";
import { DEMO_USER_ID, platformUsers, userStatusLabels, type PlatformUserStatus } from "@/data/platform-users";
import { cn } from "@/lib/utils";

const statusColors: Record<PlatformUserStatus, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-muted text-muted-foreground",
  banned: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

// 用户 + 派生的订单统计（与订单管理页同源）
const usersWithStats = platformUsers.map((user) => ({
  ...user,
  ...getUserOrderStats(user.id),
}));

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = usersWithStats.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: usersWithStats.length,
    active: usersWithStats.filter((u) => u.status === "active").length,
    totalBalance: usersWithStats.reduce((sum, u) => sum + u.balance, 0),
    runningOrders: usersWithStats.reduce((sum, u) => sum + u.runningOrders, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">用户管理</h1>
          <p className="text-muted-foreground mt-1">管理平台用户账户</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加用户</DialogTitle>
                <DialogDescription>创建一个新的用户账户</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">用户名</Label>
                  <Input id="name" placeholder="输入用户名" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input id="email" type="email" placeholder="输入邮箱地址" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">手机号</Label>
                  <Input id="phone" placeholder="输入手机号" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">初始密码</Label>
                  <Input id="password" type="password" placeholder="设置初始密码" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="balance">初始余额（USD）</Label>
                  <Input id="balance" type="number" placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">创建用户</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">总用户数</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">活跃用户</p>
            <p className="text-2xl font-bold mt-1">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">用户总余额</p>
            <p className="text-2xl font-bold mt-1">${stats.totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">进行中订单</p>
            <p className="text-2xl font-bold mt-1">{stats.runningOrders}</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>共 {filteredUsers.length} 个用户</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索用户名、邮箱或手机号..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">正常</SelectItem>
                <SelectItem value="inactive">未激活</SelectItem>
                <SelectItem value="banned">已封禁</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 用户表格 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">用户</th>
                  <th className="pb-3 font-medium">手机号</th>
                  <th className="pb-3 font-medium text-right">余额</th>
                  <th className="pb-3 font-medium text-right">消费总额</th>
                  <th className="pb-3 font-medium text-right">订单数</th>
                  <th className="pb-3 font-medium text-right">进行中</th>
                  <th className="pb-3 font-medium">状态</th>
                  <th className="pb-3 font-medium">最后登录</th>
                  <th className="pb-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {user.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium">{user.name}</p>
                            {user.id === DEMO_USER_ID && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0">
                                演示账户
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-sm">{user.phone}</td>
                    <td className="py-3 text-right font-medium">${user.balance.toLocaleString()}</td>
                    <td className="py-3 text-right">${user.totalSpent.toLocaleString()}</td>
                    <td className="py-3 text-right">{user.ordersCount}</td>
                    <td className="py-3 text-right">
                      {user.runningOrders > 0 ? (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                          {user.runningOrders}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" className={cn("text-xs", statusColors[user.status])}>
                        {userStatusLabels[user.status]}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{user.lastLoginAt}</td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuItem>查看订单</DropdownMenuItem>
                          <DropdownMenuItem>调整余额</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>重置密码</DropdownMenuItem>
                          {user.status === "banned" ? (
                            <DropdownMenuItem>解除封禁</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">封禁账户</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

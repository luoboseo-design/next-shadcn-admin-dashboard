"use client";

import { useState } from "react";

import { Download, MoreHorizontal, Plus, Search, UserPlus } from "lucide-react";

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
import { cn } from "@/lib/utils";

// 模拟用户数据
const mockUsers = [
  {
    id: "U001",
    name: "张三",
    email: "zhangsan@example.com",
    phone: "138****1234",
    balance: 2500,
    totalSpent: 15600,
    orders: 12,
    status: "active",
    role: "user",
    registeredAt: "2024-01-20",
    lastLogin: "2024-01-25 14:30",
  },
  {
    id: "U002",
    name: "李四",
    email: "lisi@example.com",
    phone: "139****5678",
    balance: 1800,
    totalSpent: 8900,
    orders: 8,
    status: "active",
    role: "user",
    registeredAt: "2024-01-22",
    lastLogin: "2024-01-25 10:15",
  },
  {
    id: "U003",
    name: "王五",
    email: "wangwu@example.com",
    phone: "137****9012",
    balance: 5000,
    totalSpent: 45000,
    orders: 25,
    status: "active",
    role: "vip",
    registeredAt: "2024-01-10",
    lastLogin: "2024-01-25 09:00",
  },
  {
    id: "U004",
    name: "赵六",
    email: "zhaoliu@example.com",
    phone: "136****3456",
    balance: 800,
    totalSpent: 2400,
    orders: 3,
    status: "inactive",
    role: "user",
    registeredAt: "2024-01-24",
    lastLogin: "2024-01-24 18:00",
  },
  {
    id: "U005",
    name: "钱七",
    email: "qianqi@example.com",
    phone: "135****7890",
    balance: 3200,
    totalSpent: 28000,
    orders: 15,
    status: "active",
    role: "vip",
    registeredAt: "2023-12-15",
    lastLogin: "2024-01-25 16:45",
  },
  {
    id: "U006",
    name: "孙八",
    email: "sunba@example.com",
    phone: "134****2345",
    balance: 0,
    totalSpent: 500,
    orders: 1,
    status: "banned",
    role: "user",
    registeredAt: "2024-01-25",
    lastLogin: "2024-01-25 08:30",
  },
  {
    id: "U007",
    name: "周九",
    email: "zhoujiu@example.com",
    phone: "133****6789",
    balance: 12000,
    totalSpent: 89000,
    orders: 56,
    status: "active",
    role: "enterprise",
    registeredAt: "2023-06-01",
    lastLogin: "2024-01-25 11:20",
  },
  {
    id: "U008",
    name: "吴十",
    email: "wushi@example.com",
    phone: "132****0123",
    balance: 600,
    totalSpent: 3600,
    orders: 5,
    status: "active",
    role: "user",
    registeredAt: "2024-01-18",
    lastLogin: "2024-01-24 22:15",
  },
];

const statusLabels: Record<string, string> = {
  active: "正常",
  inactive: "未激活",
  banned: "已封禁",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-muted text-muted-foreground",
  banned: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const roleLabels: Record<string, string> = {
  user: "普通用户",
  vip: "VIP用户",
  enterprise: "企业用户",
};

const roleColors: Record<string, string> = {
  user: "bg-muted text-muted-foreground",
  vip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  enterprise: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    vip: mockUsers.filter((u) => u.role === "vip" || u.role === "enterprise").length,
    totalBalance: mockUsers.reduce((sum, u) => sum + u.balance, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">用户管理</h1>
          <p className="text-muted-foreground mt-1">管理平台所有用户账户</p>
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
                <DialogTitle>添加新用户</DialogTitle>
                <DialogDescription>手动创建一个新的用户账户</DialogDescription>
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
                  <Label htmlFor="role">用户角色</Label>
                  <Select defaultValue="user">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">普通用户</SelectItem>
                      <SelectItem value="vip">VIP用户</SelectItem>
                      <SelectItem value="enterprise">企业用户</SelectItem>
                    </SelectContent>
                  </Select>
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
            <p className="text-sm text-muted-foreground">VIP/企业用户</p>
            <p className="text-2xl font-bold mt-1">{stats.vip}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">用户总余额</p>
            <p className="text-2xl font-bold mt-1">${stats.totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>共 {filteredUsers.length} 名用户</CardDescription>
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
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部角色</SelectItem>
                <SelectItem value="user">普通用户</SelectItem>
                <SelectItem value="vip">VIP用户</SelectItem>
                <SelectItem value="enterprise">企业用户</SelectItem>
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
                  <th className="pb-3 font-medium">角色</th>
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
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{user.phone}</td>
                    <td className="py-3 text-right font-medium">${user.balance.toLocaleString()}</td>
                    <td className="py-3 text-right">${user.totalSpent.toLocaleString()}</td>
                    <td className="py-3 text-right">{user.orders}</td>
                    <td className="py-3">
                      <Badge variant="secondary" className={cn("text-xs", roleColors[user.role])}>
                        {roleLabels[user.role]}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" className={cn("text-xs", statusColors[user.status])}>
                        {statusLabels[user.status]}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
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

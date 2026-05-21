"use client";

import { useState } from "react";

import { Download, MoreHorizontal, Search, UserPlus, Building2 } from "lucide-react";

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

// 模拟企业用户数据
const mockUsers = [
  {
    id: "U001",
    companyName: "北京科技有限公司",
    contactName: "张总",
    email: "zhang@bjtech.com",
    phone: "138****1234",
    balance: 25000,
    totalSpent: 156000,
    orders: 89,
    runningOrders: 5,
    status: "active",
    registeredAt: "2023-08-15",
    lastLogin: "2024-01-25 14:30",
  },
  {
    id: "U002",
    companyName: "上海营销策划公司",
    contactName: "李经理",
    email: "li@shmarketing.com",
    phone: "139****5678",
    balance: 18000,
    totalSpent: 89000,
    orders: 56,
    runningOrders: 3,
    status: "active",
    registeredAt: "2023-10-22",
    lastLogin: "2024-01-25 10:15",
  },
  {
    id: "U003",
    companyName: "深圳电商科技公司",
    contactName: "王总监",
    email: "wang@szecom.com",
    phone: "137****9012",
    balance: 50000,
    totalSpent: 450000,
    orders: 235,
    runningOrders: 12,
    status: "active",
    registeredAt: "2023-03-10",
    lastLogin: "2024-01-25 09:00",
  },
  {
    id: "U004",
    companyName: "杭州互联网公司",
    contactName: "赵经理",
    email: "zhao@hznet.com",
    phone: "136****3456",
    balance: 8000,
    totalSpent: 24000,
    orders: 18,
    runningOrders: 2,
    status: "active",
    registeredAt: "2024-01-05",
    lastLogin: "2024-01-24 18:00",
  },
  {
    id: "U005",
    companyName: "广州贸易有限公司",
    contactName: "钱总",
    email: "qian@gztrade.com",
    phone: "135****7890",
    balance: 32000,
    totalSpent: 280000,
    orders: 156,
    runningOrders: 8,
    status: "active",
    registeredAt: "2023-06-15",
    lastLogin: "2024-01-25 16:45",
  },
  {
    id: "U006",
    companyName: "成都软件开发公司",
    contactName: "孙经理",
    email: "sun@cdsoft.com",
    phone: "134****2345",
    balance: 0,
    totalSpent: 5000,
    orders: 5,
    runningOrders: 0,
    status: "inactive",
    registeredAt: "2024-01-20",
    lastLogin: "2024-01-22 08:30",
  },
  {
    id: "U007",
    companyName: "南京数据科技公司",
    contactName: "周总",
    email: "zhou@njdata.com",
    phone: "133****6789",
    balance: 120000,
    totalSpent: 890000,
    orders: 458,
    runningOrders: 25,
    status: "active",
    registeredAt: "2022-11-01",
    lastLogin: "2024-01-25 11:20",
  },
  {
    id: "U008",
    companyName: "武汉网络传媒公司",
    contactName: "吴经理",
    email: "wu@whmedia.com",
    phone: "132****0123",
    balance: 6000,
    totalSpent: 36000,
    orders: 28,
    runningOrders: 1,
    status: "active",
    registeredAt: "2024-01-08",
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

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    totalBalance: mockUsers.reduce((sum, u) => sum + u.balance, 0),
    runningOrders: mockUsers.reduce((sum, u) => sum + u.runningOrders, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">用户管理</h1>
          <p className="text-muted-foreground mt-1">管理平台企业用户账户</p>
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
                <DialogTitle>添加企业用户</DialogTitle>
                <DialogDescription>创建一个新的企业用户账户</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">企业名称</Label>
                  <Input id="company" placeholder="输入企业名称" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact">联系人</Label>
                  <Input id="contact" placeholder="输入联系人姓名" />
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
                  <Label htmlFor="balance">初始余额</Label>
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
          <CardTitle>企业用户列表</CardTitle>
          <CardDescription>共 {filteredUsers.length} 个企业用户</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索企业名称、联系人、邮箱或手机号..."
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
                  <th className="pb-3 font-medium">企业</th>
                  <th className="pb-3 font-medium">联系人</th>
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
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.companyName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div>
                        <p className="text-sm">{user.contactName}</p>
                        <p className="text-xs text-muted-foreground">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium">${user.balance.toLocaleString()}</td>
                    <td className="py-3 text-right">${user.totalSpent.toLocaleString()}</td>
                    <td className="py-3 text-right">{user.orders}</td>
                    <td className="py-3 text-right">
                      {user.runningOrders > 0 ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {user.runningOrders}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
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

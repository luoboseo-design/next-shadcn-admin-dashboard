"use client";

import { useState } from "react";

import { ArrowDownRight, ArrowUpRight, DollarSign, FileText, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// 模拟数据
const stats = {
  totalUsers: 2856,
  userGrowth: 12.5,
  totalOrders: 1234,
  orderGrowth: 8.2,
  totalRevenue: 89650,
  revenueGrowth: 15.3,
  activeUsers: 856,
  activeGrowth: -2.1,
};

const recentOrders = [
  {
    id: "ORD-001",
    user: "张三",
    service: "SEO 服务",
    subService: "外链代发",
    amount: 180,
    status: "running",
    createdAt: "2024-01-25 14:30",
  },
  {
    id: "ORD-002",
    user: "李四",
    service: "GEO 服务",
    subService: "关键词优化",
    amount: 600,
    status: "pending",
    createdAt: "2024-01-25 13:15",
  },
  {
    id: "ORD-003",
    user: "王五",
    service: "社交媒体",
    subService: "Reddit",
    amount: 300,
    status: "completed",
    createdAt: "2024-01-25 11:45",
  },
  {
    id: "ORD-004",
    user: "赵六",
    service: "发稿服务",
    subService: "新闻稿发布",
    amount: 1000,
    status: "running",
    createdAt: "2024-01-25 10:20",
  },
  {
    id: "ORD-005",
    user: "钱七",
    service: "SEO 服务",
    subService: "客座文章",
    amount: 1500,
    status: "completed",
    createdAt: "2024-01-25 09:00",
  },
];

const recentUsers = [
  { id: "U001", name: "张三", email: "zhangsan@example.com", balance: 2500, orders: 12, registeredAt: "2024-01-20" },
  { id: "U002", name: "李四", email: "lisi@example.com", balance: 1800, orders: 8, registeredAt: "2024-01-22" },
  { id: "U003", name: "王五", email: "wangwu@example.com", balance: 5000, orders: 25, registeredAt: "2024-01-23" },
  { id: "U004", name: "赵六", email: "zhaoliu@example.com", balance: 800, orders: 3, registeredAt: "2024-01-24" },
  { id: "U005", name: "钱七", email: "qianqi@example.com", balance: 3200, orders: 15, registeredAt: "2024-01-25" },
];

const serviceStats = [
  { name: "SEO 服务", orders: 456, revenue: 35600, percentage: 40 },
  { name: "GEO 服务", orders: 234, revenue: 28400, percentage: 32 },
  { name: "社交媒体", orders: 312, revenue: 15600, percentage: 17 },
  { name: "发稿服务", orders: 232, revenue: 10050, percentage: 11 },
];

const statusLabels: Record<string, string> = {
  pending: "待处理",
  running: "运行中",
  completed: "已完成",
};

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  running: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("7d");

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">管理仪表盘</h1>
          <p className="text-muted-foreground mt-1">平台运营数据概览</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">最近24小时</SelectItem>
            <SelectItem value="7d">最近7天</SelectItem>
            <SelectItem value="30d">最近30天</SelectItem>
            <SelectItem value="90d">最近90天</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI 卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总用户数</p>
                <p className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+{stats.userGrowth}%</span>
              <span className="text-muted-foreground">vs 上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总订单数</p>
                <p className="text-2xl font-bold mt-1">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+{stats.orderGrowth}%</span>
              <span className="text-muted-foreground">vs 上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总收入</p>
                <p className="text-2xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+{stats.revenueGrowth}%</span>
              <span className="text-muted-foreground">vs 上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">活跃用户</p>
                <p className="text-2xl font-bold mt-1">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <span className="text-red-500 font-medium">{stats.activeGrowth}%</span>
              <span className="text-muted-foreground">vs 上周</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 服务统计和最近订单 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 服务分布 */}
        <Card>
          <CardHeader>
            <CardTitle>服务收入分布</CardTitle>
            <CardDescription>各服务类别收入占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStats.map((service) => (
                <div key={service.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-muted-foreground">
                      ${service.revenue.toLocaleString()} ({service.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最近订单 */}
        <Card>
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>最新5笔订单</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {order.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.service} - {order.subService}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${order.amount}</p>
                    <Badge variant="secondary" className={cn("text-xs", statusColors[order.status])}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近注册用户 */}
      <Card>
        <CardHeader>
          <CardTitle>最近注册用户</CardTitle>
          <CardDescription>新注册用户列表</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">用户</th>
                  <th className="pb-3 font-medium">邮箱</th>
                  <th className="pb-3 font-medium text-right">余额</th>
                  <th className="pb-3 font-medium text-right">订单数</th>
                  <th className="pb-3 font-medium text-right">注册时间</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{user.email}</td>
                    <td className="py-3 text-right font-medium">${user.balance.toLocaleString()}</td>
                    <td className="py-3 text-right">{user.orders}</td>
                    <td className="py-3 text-right text-muted-foreground">{user.registeredAt}</td>
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

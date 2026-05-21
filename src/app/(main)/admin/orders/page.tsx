"use client";

import { useState } from "react";

import { Download, ExternalLink, Eye, MoreHorizontal, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// 模拟订单数据
const mockOrders = [
  {
    id: "ORD-20240125-001",
    userId: "U001",
    userName: "张三",
    service: "seo",
    subService: "backlink",
    serviceName: "外链代发",
    package: "成长版",
    quantity: 50,
    amount: 180,
    status: "running",
    progress: 65,
    createdAt: "2024-01-25 14:30",
    updatedAt: "2024-01-25 16:45",
  },
  {
    id: "ORD-20240125-002",
    userId: "U002",
    userName: "李四",
    service: "geo",
    subService: "keyword",
    serviceName: "关键词优化",
    package: "3关键词套餐",
    quantity: 3,
    amount: 600,
    status: "pending",
    progress: 0,
    createdAt: "2024-01-25 13:15",
    updatedAt: "2024-01-25 13:15",
  },
  {
    id: "ORD-20240125-003",
    userId: "U003",
    userName: "王五",
    service: "social",
    subService: "reddit",
    serviceName: "Reddit推广",
    package: "10帖子套餐",
    quantity: 10,
    amount: 300,
    status: "completed",
    progress: 100,
    createdAt: "2024-01-25 11:45",
    updatedAt: "2024-01-25 15:30",
  },
  {
    id: "ORD-20240125-004",
    userId: "U004",
    userName: "赵六",
    service: "news",
    subService: "press_release",
    serviceName: "新闻稿发布",
    package: "5媒体套餐",
    quantity: 5,
    amount: 1000,
    status: "running",
    progress: 40,
    createdAt: "2024-01-25 10:20",
    updatedAt: "2024-01-25 14:00",
  },
  {
    id: "ORD-20240125-005",
    userId: "U005",
    userName: "钱七",
    service: "seo",
    subService: "guest_post",
    serviceName: "客座文章",
    package: "3媒体套餐",
    quantity: 3,
    amount: 1500,
    status: "completed",
    progress: 100,
    createdAt: "2024-01-25 09:00",
    updatedAt: "2024-01-25 12:00",
  },
  {
    id: "ORD-20240124-001",
    userId: "U007",
    userName: "周九",
    service: "seo",
    subService: "backlink",
    serviceName: "外链代发",
    package: "企业版",
    quantity: 500,
    amount: 2400,
    status: "running",
    progress: 80,
    createdAt: "2024-01-24 16:30",
    updatedAt: "2024-01-25 10:00",
  },
  {
    id: "ORD-20240124-002",
    userId: "U003",
    userName: "王五",
    service: "geo",
    subService: "authority",
    serviceName: "权威建设",
    package: "标准套餐",
    quantity: 1,
    amount: 500,
    status: "completed",
    progress: 100,
    createdAt: "2024-01-24 14:00",
    updatedAt: "2024-01-25 08:00",
  },
  {
    id: "ORD-20240124-003",
    userId: "U008",
    userName: "吴十",
    service: "social",
    subService: "twitter",
    serviceName: "Twitter/X推广",
    package: "20推文套餐",
    quantity: 20,
    amount: 300,
    status: "pending",
    progress: 0,
    createdAt: "2024-01-24 11:30",
    updatedAt: "2024-01-24 11:30",
  },
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

const serviceLabels: Record<string, string> = {
  seo: "SEO 服务",
  geo: "GEO 服务",
  social: "社交媒体",
  news: "发稿服务",
};

const serviceColors: Record<string, string> = {
  seo: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  geo: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  social: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  news: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesService = serviceFilter === "all" || order.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    running: mockOrders.filter((o) => o.status === "running").length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
    totalAmount: mockOrders.reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">订单管理</h1>
          <p className="text-muted-foreground mt-1">管理平台所有服务订单</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          导出订单
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">总订单</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">待处理</p>
            <p className="text-2xl font-bold mt-1 text-amber-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">运行中</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{stats.running}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">已完成</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{stats.completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">订单总额</p>
            <p className="text-2xl font-bold mt-1">${stats.totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* 订单列表 */}
      <Card>
        <CardHeader>
          <CardTitle>订单列表</CardTitle>
          <CardDescription>共 {filteredOrders.length} 笔订单</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索订单号或用户名..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="服务类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部服务</SelectItem>
                <SelectItem value="seo">SEO 服务</SelectItem>
                <SelectItem value="geo">GEO 服务</SelectItem>
                <SelectItem value="social">社交媒体</SelectItem>
                <SelectItem value="news">发稿服务</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="running">运行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 订单表格 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">订单号</th>
                  <th className="pb-3 font-medium">用户</th>
                  <th className="pb-3 font-medium">服务</th>
                  <th className="pb-3 font-medium">套餐</th>
                  <th className="pb-3 font-medium text-right">金额</th>
                  <th className="pb-3 font-medium">进度</th>
                  <th className="pb-3 font-medium">状态</th>
                  <th className="pb-3 font-medium">创建时间</th>
                  <th className="pb-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3">
                      <span className="font-mono text-sm">{order.id}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {order.userName.charAt(0)}
                        </div>
                        <span className="font-medium">{order.userName}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className={cn("text-xs w-fit", serviceColors[order.service])}>
                          {serviceLabels[order.service]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{order.serviceName}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm">{order.package}</span>
                    </td>
                    <td className="py-3 text-right font-medium">${order.amount}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              order.progress === 100 ? "bg-green-500" : "bg-primary",
                            )}
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{order.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" className={cn("text-xs", statusColors[order.status])}>
                        {statusLabels[order.status]}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{order.createdAt}</td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            查看发布结果
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {order.status === "pending" && <DropdownMenuItem>开始执行</DropdownMenuItem>}
                          {order.status === "running" && (
                            <>
                              <DropdownMenuItem>更新进度</DropdownMenuItem>
                              <DropdownMenuItem>标记完成</DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-red-600">取消订单</DropdownMenuItem>
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

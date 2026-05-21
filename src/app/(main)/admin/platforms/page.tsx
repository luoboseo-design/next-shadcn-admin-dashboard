"use client";

import { useState } from "react";

import { ExternalLink, MoreHorizontal, Plus, Search } from "lucide-react";

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

// 模拟媒体资源数据
const mockPlatforms = [
  {
    id: "P001",
    name: "TechCrunch",
    url: "https://techcrunch.com",
    type: "news",
    category: "科技",
    da: 92,
    dr: 91,
    language: "en",
    price: 500,
    status: "active",
    usageCount: 156,
    successRate: 98,
  },
  {
    id: "P002",
    name: "36氪",
    url: "https://36kr.com",
    type: "news",
    category: "科技",
    da: 78,
    dr: 75,
    language: "zh",
    price: 300,
    status: "active",
    usageCount: 234,
    successRate: 95,
  },
  {
    id: "P003",
    name: "虎嗅",
    url: "https://huxiu.com",
    type: "news",
    category: "科技",
    da: 72,
    dr: 70,
    language: "zh",
    price: 250,
    status: "active",
    usageCount: 189,
    successRate: 92,
  },
  {
    id: "P004",
    name: "Medium",
    url: "https://medium.com",
    type: "blog",
    category: "综合",
    da: 95,
    dr: 93,
    language: "en",
    price: 150,
    status: "active",
    usageCount: 456,
    successRate: 99,
  },
  {
    id: "P005",
    name: "简书",
    url: "https://jianshu.com",
    type: "blog",
    category: "综合",
    da: 65,
    dr: 62,
    language: "zh",
    price: 50,
    status: "active",
    usageCount: 789,
    successRate: 97,
  },
  {
    id: "P006",
    name: "知乎",
    url: "https://zhihu.com",
    type: "forum",
    category: "问答",
    da: 88,
    dr: 85,
    language: "zh",
    price: 100,
    status: "active",
    usageCount: 567,
    successRate: 94,
  },
  {
    id: "P007",
    name: "Reddit",
    url: "https://reddit.com",
    type: "social",
    category: "社区",
    da: 91,
    dr: 90,
    language: "en",
    price: 80,
    status: "active",
    usageCount: 345,
    successRate: 88,
  },
  {
    id: "P008",
    name: "Forbes",
    url: "https://forbes.com",
    type: "news",
    category: "商业",
    da: 95,
    dr: 94,
    language: "en",
    price: 800,
    status: "inactive",
    usageCount: 45,
    successRate: 100,
  },
  {
    id: "P009",
    name: "InfoQ",
    url: "https://infoq.cn",
    type: "news",
    category: "技术",
    da: 70,
    dr: 68,
    language: "zh",
    price: 200,
    status: "active",
    usageCount: 123,
    successRate: 96,
  },
  {
    id: "P010",
    name: "Dev.to",
    url: "https://dev.to",
    type: "blog",
    category: "技术",
    da: 80,
    dr: 78,
    language: "en",
    price: 100,
    status: "active",
    usageCount: 234,
    successRate: 98,
  },
];

const typeLabels: Record<string, string> = {
  news: "新闻媒体",
  blog: "博客平台",
  forum: "论坛社区",
  social: "社交媒体",
};

const typeColors: Record<string, string> = {
  news: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  blog: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  forum: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  social: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const statusLabels: Record<string, string> = {
  active: "启用",
  inactive: "停用",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-muted text-muted-foreground",
};

export default function AdminPlatformsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPlatforms = mockPlatforms.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || platform.type === typeFilter;
    const matchesStatus = statusFilter === "all" || platform.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: mockPlatforms.length,
    active: mockPlatforms.filter((p) => p.status === "active").length,
    avgDa: Math.round(mockPlatforms.reduce((sum, p) => sum + p.da, 0) / mockPlatforms.length),
    totalUsage: mockPlatforms.reduce((sum, p) => sum + p.usageCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">媒体资源</h1>
          <p className="text-muted-foreground mt-1">管理平台发布渠道和媒体资源</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加媒体
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加媒体资源</DialogTitle>
              <DialogDescription>添加新的发布渠道或媒体平台</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">媒体名称</Label>
                <Input id="name" placeholder="输入媒体名称" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">网址</Label>
                <Input id="url" placeholder="https://example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">类型</Label>
                  <Select defaultValue="blog">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">新闻媒体</SelectItem>
                      <SelectItem value="blog">博客平台</SelectItem>
                      <SelectItem value="forum">论坛社区</SelectItem>
                      <SelectItem value="social">社交媒体</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="language">语言</Label>
                  <Select defaultValue="zh">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="en">英文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="da">DA 值</Label>
                  <Input id="da" type="number" placeholder="0-100" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">单价 (USD)</Label>
                  <Input id="price" type="number" placeholder="输入价格" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">添加媒体</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">总媒体数</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">启用中</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">平均 DA</p>
            <p className="text-2xl font-bold mt-1">{stats.avgDa}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">总使用次数</p>
            <p className="text-2xl font-bold mt-1">{stats.totalUsage.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* 媒体列表 */}
      <Card>
        <CardHeader>
          <CardTitle>媒体列表</CardTitle>
          <CardDescription>共 {filteredPlatforms.length} 个媒体资源</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索媒体名称或网址..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="news">新闻媒体</SelectItem>
                <SelectItem value="blog">博客平台</SelectItem>
                <SelectItem value="forum">论坛社区</SelectItem>
                <SelectItem value="social">社交媒体</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">启用</SelectItem>
                <SelectItem value="inactive">停用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 媒体表格 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">媒体</th>
                  <th className="pb-3 font-medium">类型</th>
                  <th className="pb-3 font-medium">分类</th>
                  <th className="pb-3 font-medium text-center">DA/DR</th>
                  <th className="pb-3 font-medium">语言</th>
                  <th className="pb-3 font-medium text-right">单价</th>
                  <th className="pb-3 font-medium text-right">使用次数</th>
                  <th className="pb-3 font-medium text-right">成功率</th>
                  <th className="pb-3 font-medium">状态</th>
                  <th className="pb-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlatforms.map((platform) => (
                  <tr key={platform.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                          {platform.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{platform.name}</p>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                          >
                            {platform.url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" className={cn("text-xs", typeColors[platform.type])}>
                        {typeLabels[platform.type]}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm">{platform.category}</td>
                    <td className="py-3 text-center">
                      <span className="font-medium">{platform.da}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="font-medium">{platform.dr}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm uppercase">{platform.language}</span>
                    </td>
                    <td className="py-3 text-right font-medium">${platform.price}</td>
                    <td className="py-3 text-right">{platform.usageCount}</td>
                    <td className="py-3 text-right">
                      <span
                        className={cn(
                          "font-medium",
                          platform.successRate >= 95
                            ? "text-green-600"
                            : platform.successRate >= 90
                              ? "text-amber-600"
                              : "text-red-600",
                        )}
                      >
                        {platform.successRate}%
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" className={cn("text-xs", statusColors[platform.status])}>
                        {statusLabels[platform.status]}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuItem>查看统计</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {platform.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">停用</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>启用</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
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

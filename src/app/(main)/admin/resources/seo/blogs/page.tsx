"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// 模拟博客站点数据
const mockBlogs = [
  {
    id: "blog-001",
    name: "Medium",
    url: "https://medium.com",
    da: 96,
    dr: 94,
    canRegister: true,
    registrationUrl: "https://medium.com/m/signin",
    status: "active",
    accountsCount: 45,
    availableAccounts: 38,
    successRate: 98,
    lastUsed: "2024-01-25 14:30",
    category: "技术博客",
    language: "英文",
    dofollow: true,
  },
  {
    id: "blog-002",
    name: "WordPress.com",
    url: "https://wordpress.com",
    da: 93,
    dr: 91,
    canRegister: true,
    registrationUrl: "https://wordpress.com/start",
    status: "active",
    accountsCount: 62,
    availableAccounts: 55,
    successRate: 95,
    lastUsed: "2024-01-25 14:25",
    category: "通用博客",
    language: "多语言",
    dofollow: true,
  },
  {
    id: "blog-003",
    name: "Blogger",
    url: "https://blogger.com",
    da: 89,
    dr: 87,
    canRegister: true,
    registrationUrl: "https://blogger.com/create-blog",
    status: "warning",
    accountsCount: 30,
    availableAccounts: 8,
    successRate: 75,
    lastUsed: "2024-01-25 13:50",
    category: "通用博客",
    language: "多语言",
    dofollow: false,
  },
  {
    id: "blog-004",
    name: "简书",
    url: "https://jianshu.com",
    da: 78,
    dr: 75,
    canRegister: true,
    registrationUrl: "https://jianshu.com/sign_up",
    status: "active",
    accountsCount: 40,
    availableAccounts: 35,
    successRate: 92,
    lastUsed: "2024-01-25 14:10",
    category: "中文博客",
    language: "中文",
    dofollow: true,
  },
  {
    id: "blog-005",
    name: "CSDN",
    url: "https://csdn.net",
    da: 82,
    dr: 80,
    canRegister: true,
    registrationUrl: "https://passport.csdn.net/register",
    status: "active",
    accountsCount: 55,
    availableAccounts: 48,
    successRate: 94,
    lastUsed: "2024-01-25 14:20",
    category: "技术博客",
    language: "中文",
    dofollow: true,
  },
  {
    id: "blog-006",
    name: "知乎专栏",
    url: "https://zhuanlan.zhihu.com",
    da: 91,
    dr: 89,
    canRegister: true,
    registrationUrl: "https://zhihu.com/signup",
    status: "inactive",
    accountsCount: 25,
    availableAccounts: 0,
    successRate: 0,
    lastUsed: "2024-01-20 10:00",
    category: "问答平台",
    language: "中文",
    dofollow: false,
  },
  {
    id: "blog-007",
    name: "Dev.to",
    url: "https://dev.to",
    da: 85,
    dr: 83,
    canRegister: true,
    registrationUrl: "https://dev.to/enter",
    status: "active",
    accountsCount: 38,
    availableAccounts: 32,
    successRate: 96,
    lastUsed: "2024-01-25 13:45",
    category: "技术博客",
    language: "英文",
    dofollow: true,
  },
  {
    id: "blog-008",
    name: "Hashnode",
    url: "https://hashnode.com",
    da: 80,
    dr: 78,
    canRegister: true,
    registrationUrl: "https://hashnode.com/onboard",
    status: "active",
    accountsCount: 28,
    availableAccounts: 25,
    successRate: 97,
    lastUsed: "2024-01-25 12:30",
    category: "技术博客",
    language: "英文",
    dofollow: true,
  },
];

const statusConfig = {
  active: { label: "正常", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  warning: { label: "警告", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  inactive: { label: "停用", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

export default function SeoBlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch = blog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: mockBlogs.length,
    active: mockBlogs.filter(b => b.status === "active").length,
    totalAccounts: mockBlogs.reduce((acc, b) => acc + b.accountsCount, 0),
    availableAccounts: mockBlogs.reduce((acc, b) => acc + b.availableAccounts, 0),
  };

  const categories = [...new Set(mockBlogs.map(b => b.category))];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">博客站点管理</h1>
          <p className="text-muted-foreground mt-1">管理外链发布的博客平台资源</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            批量导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                添加站点
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>添加博客站点</DialogTitle>
                <DialogDescription>添加新的博客平台到资源库</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">站点名称</Label>
                  <Input id="name" placeholder="例如: Medium" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">站点地址</Label>
                  <Input id="url" placeholder="https://example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="regUrl">注册地址</Label>
                  <Input id="regUrl" placeholder="https://example.com/signup" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="da">DA 值</Label>
                    <Input id="da" type="number" placeholder="0-100" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dr">DR 值</Label>
                    <Input id="dr" type="number" placeholder="0-100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">分类</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">技术博客</SelectItem>
                        <SelectItem value="general">通用博客</SelectItem>
                        <SelectItem value="chinese">中文博客</SelectItem>
                        <SelectItem value="qa">问答平台</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="language">语言</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择语言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="en">英文</SelectItem>
                        <SelectItem value="multi">多语言</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dofollow" />
                  <Label htmlFor="dofollow" className="text-sm font-normal">支持 Dofollow 链接</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
                <Button onClick={() => setShowAddDialog(false)}>添加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">总站点数</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">正常运行</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">总账号数</p>
            <p className="text-2xl font-bold">{stats.totalAccounts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">可用账号</p>
            <p className="text-2xl font-bold text-blue-600">{stats.availableAccounts}</p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索站点名称或地址..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">正常</SelectItem>
                <SelectItem value="warning">警告</SelectItem>
                <SelectItem value="inactive">停用</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 站点列表 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="p-4 font-medium">站点</th>
                  <th className="p-4 font-medium">DA/DR</th>
                  <th className="p-4 font-medium">账号池</th>
                  <th className="p-4 font-medium">成功率</th>
                  <th className="p-4 font-medium">分类</th>
                  <th className="p-4 font-medium">状态</th>
                  <th className="p-4 font-medium">最后使用</th>
                  <th className="p-4 font-medium w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                          {blog.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{blog.name}</span>
                            {blog.dofollow && (
                              <Badge variant="outline" className="text-xs">Dofollow</Badge>
                            )}
                          </div>
                          <a
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:underline flex items-center gap-1"
                          >
                            {blog.url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{blog.da}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="font-medium">{blog.dr}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <span className="font-medium text-green-600">{blog.availableAccounts}</span>
                        <span className="text-muted-foreground"> / {blog.accountsCount}</span>
                      </div>
                      {blog.availableAccounts < 10 && blog.status === "active" && (
                        <span className="text-xs text-amber-600">库存不足</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={blog.successRate >= 90 ? "text-green-600 font-medium" : blog.successRate >= 70 ? "text-amber-600" : "text-red-600"}>
                        {blog.successRate}%
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className="text-xs">{blog.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={statusConfig[blog.status as keyof typeof statusConfig].color}>
                        {statusConfig[blog.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {blog.lastUsed}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            验证站点
                          </DropdownMenuItem>
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuItem>管理账号</DropdownMenuItem>
                          <DropdownMenuItem>查看发布记录</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {blog.status === "active" ? (
                            <DropdownMenuItem className="text-amber-600">暂停使用</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">启用站点</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">删除站点</DropdownMenuItem>
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

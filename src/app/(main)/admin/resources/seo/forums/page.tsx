"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Download,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// 模拟论坛站点数据
const mockForums = [
  {
    id: "1",
    name: "天涯社区",
    url: "https://tianya.cn",
    category: "综合论坛",
    accountPool: 50,
    availableAccounts: 42,
    dailyLimit: 10,
    successRate: 94,
    avgResponseTime: "2小时",
    status: "active",
    lastUsed: "2024-01-25",
  },
  {
    id: "2",
    name: "百度贴吧",
    url: "https://tieba.baidu.com",
    category: "综合论坛",
    accountPool: 80,
    availableAccounts: 65,
    dailyLimit: 20,
    successRate: 88,
    avgResponseTime: "1小时",
    status: "active",
    lastUsed: "2024-01-25",
  },
  {
    id: "3",
    name: "知乎",
    url: "https://zhihu.com",
    category: "问答社区",
    accountPool: 30,
    availableAccounts: 25,
    dailyLimit: 5,
    successRate: 92,
    avgResponseTime: "4小时",
    status: "active",
    lastUsed: "2024-01-24",
  },
  {
    id: "4",
    name: "豆瓣小组",
    url: "https://douban.com",
    category: "兴趣社区",
    accountPool: 25,
    availableAccounts: 20,
    dailyLimit: 8,
    successRate: 90,
    avgResponseTime: "3小时",
    status: "active",
    lastUsed: "2024-01-24",
  },
  {
    id: "5",
    name: "V2EX",
    url: "https://v2ex.com",
    category: "技术论坛",
    accountPool: 20,
    availableAccounts: 15,
    dailyLimit: 3,
    successRate: 96,
    avgResponseTime: "30分钟",
    status: "active",
    lastUsed: "2024-01-25",
  },
  {
    id: "6",
    name: "虎扑",
    url: "https://hupu.com",
    category: "体育论坛",
    accountPool: 15,
    availableAccounts: 0,
    dailyLimit: 5,
    successRate: 85,
    avgResponseTime: "2小时",
    status: "exhausted",
    lastUsed: "2024-01-23",
  },
];

export default function ForumsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredForums = mockForums.filter((forum) => {
    const matchesSearch =
      forum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || forum.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockForums.length,
    active: mockForums.filter((f) => f.status === "active").length,
    totalAccounts: mockForums.reduce((sum, f) => sum + f.accountPool, 0),
    availableAccounts: mockForums.reduce((sum, f) => sum + f.availableAccounts, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">论坛站点管理</h1>
          <p className="text-muted-foreground mt-1">管理外链发布的论坛资源，配置账号池和发布策略</p>
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                添加论坛
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加论坛站点</DialogTitle>
                <DialogDescription>添加新的论坛站点到资源库</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>论坛名称</Label>
                  <Input placeholder="如：天涯社区" />
                </div>
                <div className="grid gap-2">
                  <Label>论坛地址</Label>
                  <Input placeholder="https://example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">综合论坛</SelectItem>
                      <SelectItem value="tech">技术论坛</SelectItem>
                      <SelectItem value="qa">问答社区</SelectItem>
                      <SelectItem value="interest">兴趣社区</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>每日发布上限</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div className="grid gap-2">
                    <Label>初始账号数</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>添加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">论坛总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">可用论坛</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">账号总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAccounts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">可用账号</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.availableAccounts}</div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索论坛名称或地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">可用</SelectItem>
            <SelectItem value="exhausted">账号耗尽</SelectItem>
            <SelectItem value="disabled">已禁用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 论坛列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>论坛</TableHead>
              <TableHead>分类</TableHead>
              <TableHead className="text-center">账号池</TableHead>
              <TableHead className="text-center">可用账号</TableHead>
              <TableHead className="text-center">每日上限</TableHead>
              <TableHead className="text-center">成功率</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredForums.map((forum) => (
              <TableRow key={forum.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium">{forum.name}</div>
                      <a
                        href={forum.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {forum.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{forum.category}</Badge>
                </TableCell>
                <TableCell className="text-center">{forum.accountPool}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      forum.availableAccounts === 0
                        ? "text-red-600 font-medium"
                        : forum.availableAccounts < 10
                          ? "text-amber-600 font-medium"
                          : ""
                    }
                  >
                    {forum.availableAccounts}
                  </span>
                </TableCell>
                <TableCell className="text-center">{forum.dailyLimit}/天</TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      forum.successRate >= 90
                        ? "text-green-600"
                        : forum.successRate >= 80
                          ? "text-amber-600"
                          : "text-red-600"
                    }
                  >
                    {forum.successRate}%
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {forum.status === "active" ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      可用
                    </Badge>
                  ) : forum.status === "exhausted" ? (
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      账号耗尽
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      <XCircle className="h-3 w-3 mr-1" />
                      已禁用
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>编辑配置</DropdownMenuItem>
                      <DropdownMenuItem>管理账号</DropdownMenuItem>
                      <DropdownMenuItem>补充账号</DropdownMenuItem>
                      <DropdownMenuItem>查看日志</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">禁用论坛</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

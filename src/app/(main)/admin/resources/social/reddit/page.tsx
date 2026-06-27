"use client";

import { useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  MoreHorizontal,
  Plus,
  RefreshCw,
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
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// 模拟Reddit账号数据
const mockRedditAccounts = [
  {
    id: "1",
    username: "tech_enthusiast_88",
    email: "acc1@proton.me",
    karma: 15420,
    postKarma: 8500,
    commentKarma: 6920,
    accountAge: "2年3个月",
    subreddits: ["technology", "programming", "startups"],
    dailyLimit: 5,
    usedToday: 2,
    totalPosts: 156,
    successRate: 94,
    status: "active",
    lastActive: "2024-01-25 14:30",
  },
  {
    id: "2",
    username: "startup_guru_2024",
    email: "acc2@proton.me",
    karma: 8750,
    postKarma: 4200,
    commentKarma: 4550,
    accountAge: "1年8个月",
    subreddits: ["entrepreneur", "smallbusiness", "SaaS"],
    dailyLimit: 3,
    usedToday: 1,
    totalPosts: 89,
    successRate: 91,
    status: "active",
    lastActive: "2024-01-25 12:15",
  },
  {
    id: "3",
    username: "digital_marketer_pro",
    email: "acc3@proton.me",
    karma: 22100,
    postKarma: 12000,
    commentKarma: 10100,
    accountAge: "3年1个月",
    subreddits: ["marketing", "SEO", "socialmedia"],
    dailyLimit: 8,
    usedToday: 5,
    totalPosts: 320,
    successRate: 96,
    status: "active",
    lastActive: "2024-01-25 15:00",
  },
  {
    id: "4",
    username: "crypto_watcher_99",
    email: "acc4@proton.me",
    karma: 5200,
    postKarma: 2800,
    commentKarma: 2400,
    accountAge: "1年2个月",
    subreddits: ["cryptocurrency", "Bitcoin", "ethereum"],
    dailyLimit: 3,
    usedToday: 3,
    totalPosts: 45,
    successRate: 88,
    status: "cooldown",
    lastActive: "2024-01-25 10:00",
  },
  {
    id: "5",
    username: "ai_researcher_2023",
    email: "acc5@proton.me",
    karma: 31500,
    postKarma: 18000,
    commentKarma: 13500,
    accountAge: "4年5个月",
    subreddits: ["MachineLearning", "artificial", "deeplearning"],
    dailyLimit: 10,
    usedToday: 3,
    totalPosts: 450,
    successRate: 98,
    status: "active",
    lastActive: "2024-01-25 14:45",
  },
  {
    id: "6",
    username: "product_hunter_01",
    email: "acc6@proton.me",
    karma: 2100,
    postKarma: 800,
    commentKarma: 1300,
    accountAge: "8个月",
    subreddits: ["ProductHunt", "SideProject", "webdev"],
    dailyLimit: 2,
    usedToday: 0,
    totalPosts: 28,
    successRate: 85,
    status: "active",
    lastActive: "2024-01-24 18:00",
  },
  {
    id: "7",
    username: "banned_user_test",
    email: "acc7@proton.me",
    karma: 500,
    postKarma: 200,
    commentKarma: 300,
    accountAge: "6个月",
    subreddits: ["test"],
    dailyLimit: 0,
    usedToday: 0,
    totalPosts: 12,
    successRate: 50,
    status: "banned",
    lastActive: "2024-01-20 09:00",
  },
];

export default function RedditAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAccounts = mockRedditAccounts.filter((account) => {
    const matchesSearch =
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockRedditAccounts.length,
    active: mockRedditAccounts.filter((a) => a.status === "active").length,
    totalKarma: mockRedditAccounts.reduce((sum, a) => sum + a.karma, 0),
    avgSuccessRate: Math.round(
      mockRedditAccounts.reduce((sum, a) => sum + a.successRate, 0) / mockRedditAccounts.length,
    ),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            正常
          </Badge>
        );
      case "cooldown":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            冷却中
          </Badge>
        );
      case "banned":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="h-3 w-3 mr-1" />
            已封禁
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reddit 账号管理</h1>
          <p className="text-muted-foreground mt-1">管理Reddit发帖账号池，监控账号状态和使用情况</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            同步状态
          </Button>
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
                添加账号
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加Reddit账号</DialogTitle>
                <DialogDescription>添加新的Reddit账号到资源池</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>用户名</Label>
                  <Input placeholder="Reddit用户名" />
                </div>
                <div className="grid gap-2">
                  <Label>密码</Label>
                  <Input type="password" placeholder="账号密码" />
                </div>
                <div className="grid gap-2">
                  <Label>关联邮箱</Label>
                  <Input placeholder="注册邮箱" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>每日发帖上限</Label>
                    <Input type="number" placeholder="5" />
                  </div>
                  <div className="grid gap-2">
                    <Label>目标Subreddits</Label>
                    <Input placeholder="用逗号分隔" />
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
            <CardTitle className="text-sm font-medium text-muted-foreground">账号总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">可用账号</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总Karma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalKarma.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgSuccessRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索用户名或邮箱..."
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
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="cooldown">冷却中</SelectItem>
            <SelectItem value="banned">已封禁</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 账号列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>账号</TableHead>
              <TableHead className="text-center">Karma</TableHead>
              <TableHead className="text-center">账龄</TableHead>
              <TableHead>活跃板块</TableHead>
              <TableHead className="text-center">今日额度</TableHead>
              <TableHead className="text-center">成功率</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">u/{account.username}</div>
                    <div className="text-xs text-muted-foreground">{account.email}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div>
                    <div className="font-medium">{account.karma.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      帖: {account.postKarma.toLocaleString()} / 评: {account.commentKarma.toLocaleString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{account.accountAge}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {account.subreddits.slice(0, 2).map((sub) => (
                      <Badge key={sub} variant="secondary" className="text-xs">
                        r/{sub}
                      </Badge>
                    ))}
                    {account.subreddits.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{account.subreddits.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-24 mx-auto">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{account.usedToday}</span>
                      <span>{account.dailyLimit}</span>
                    </div>
                    <Progress value={(account.usedToday / account.dailyLimit) * 100} className="h-1.5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      account.successRate >= 95
                        ? "text-green-600 font-medium"
                        : account.successRate >= 85
                          ? "text-blue-600"
                          : "text-amber-600"
                    }
                  >
                    {account.successRate}%
                  </span>
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(account.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>编辑配置</DropdownMenuItem>
                      <DropdownMenuItem>查看发帖记录</DropdownMenuItem>
                      <DropdownMenuItem>测试登录</DropdownMenuItem>
                      <DropdownMenuItem>重置冷却</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">删除账号</DropdownMenuItem>
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

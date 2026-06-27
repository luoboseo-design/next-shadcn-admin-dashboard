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
  Twitter,
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

// 模拟Twitter账号数据
const mockTwitterAccounts = [
  {
    id: "1",
    username: "tech_insights_daily",
    displayName: "Tech Insights",
    email: "tw1@proton.me",
    followers: 15200,
    following: 850,
    tweets: 2450,
    accountAge: "3年2个月",
    verified: false,
    niche: ["科技", "AI", "创业"],
    dailyLimit: 10,
    usedToday: 4,
    totalPosts: 320,
    engagementRate: 3.2,
    status: "active",
    lastActive: "2024-01-25 15:30",
  },
  {
    id: "2",
    username: "startup_wisdom_hub",
    displayName: "Startup Wisdom",
    email: "tw2@proton.me",
    followers: 28500,
    following: 1200,
    tweets: 4800,
    accountAge: "4年8个月",
    verified: true,
    niche: ["创业", "投资", "商业"],
    dailyLimit: 15,
    usedToday: 8,
    totalPosts: 580,
    engagementRate: 4.5,
    status: "active",
    lastActive: "2024-01-25 14:45",
  },
  {
    id: "3",
    username: "ai_news_updates",
    displayName: "AI News Updates",
    email: "tw3@proton.me",
    followers: 42000,
    following: 500,
    tweets: 8200,
    accountAge: "2年5个月",
    verified: false,
    niche: ["AI", "机器学习", "科技新闻"],
    dailyLimit: 20,
    usedToday: 12,
    totalPosts: 950,
    engagementRate: 5.8,
    status: "active",
    lastActive: "2024-01-25 15:00",
  },
  {
    id: "4",
    username: "marketing_pro_tips",
    displayName: "Marketing Pro",
    email: "tw4@proton.me",
    followers: 8900,
    following: 650,
    tweets: 1800,
    accountAge: "1年10个月",
    verified: false,
    niche: ["营销", "SEO", "内容策略"],
    dailyLimit: 8,
    usedToday: 3,
    totalPosts: 210,
    engagementRate: 2.8,
    status: "active",
    lastActive: "2024-01-25 12:00",
  },
  {
    id: "5",
    username: "crypto_market_watch",
    displayName: "Crypto Watch",
    email: "tw5@proton.me",
    followers: 5200,
    following: 420,
    tweets: 980,
    accountAge: "1年3个月",
    verified: false,
    niche: ["加密货币", "区块链", "DeFi"],
    dailyLimit: 5,
    usedToday: 5,
    totalPosts: 125,
    engagementRate: 2.1,
    status: "limited",
    lastActive: "2024-01-25 10:30",
  },
  {
    id: "6",
    username: "suspended_acc_test",
    displayName: "Test Account",
    email: "tw6@proton.me",
    followers: 1200,
    following: 300,
    tweets: 250,
    accountAge: "8个月",
    verified: false,
    niche: ["测试"],
    dailyLimit: 0,
    usedToday: 0,
    totalPosts: 35,
    engagementRate: 0.5,
    status: "suspended",
    lastActive: "2024-01-18 09:00",
  },
];

export default function TwitterAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAccounts = mockTwitterAccounts.filter((account) => {
    const matchesSearch =
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockTwitterAccounts.length,
    active: mockTwitterAccounts.filter((a) => a.status === "active").length,
    totalFollowers: mockTwitterAccounts.reduce((sum, a) => sum + a.followers, 0),
    avgEngagement:
      (mockTwitterAccounts.reduce((sum, a) => sum + a.engagementRate, 0) / mockTwitterAccounts.length).toFixed(1) + "%",
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
      case "limited":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            受限
          </Badge>
        );
      case "suspended":
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
          <h1 className="text-2xl font-bold">Twitter/X 账号管理</h1>
          <p className="text-muted-foreground mt-1">管理Twitter发帖账号池，监控账号状态和互动数据</p>
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
                <DialogTitle>添加Twitter账号</DialogTitle>
                <DialogDescription>添加新的Twitter账号到资源池</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>用户名</Label>
                  <Input placeholder="@username" />
                </div>
                <div className="grid gap-2">
                  <Label>密码</Label>
                  <Input type="password" placeholder="账号密码" />
                </div>
                <div className="grid gap-2">
                  <Label>关联邮箱/手机</Label>
                  <Input placeholder="注册邮箱或手机号" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>每日发帖上限</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div className="grid gap-2">
                    <Label>内容领域</Label>
                    <Input placeholder="科技, AI, 创业" />
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
            <CardTitle className="text-sm font-medium text-muted-foreground">总粉丝数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFollowers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均互动率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgEngagement}</div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索用户名..."
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
            <SelectItem value="limited">受限</SelectItem>
            <SelectItem value="suspended">已封禁</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 账号列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>账号</TableHead>
              <TableHead className="text-center">粉丝</TableHead>
              <TableHead className="text-center">账龄</TableHead>
              <TableHead>内容领域</TableHead>
              <TableHead className="text-center">今日额度</TableHead>
              <TableHead className="text-center">互动率</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                      <Twitter className="h-4 w-4 text-sky-500" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        {account.displayName}
                        {account.verified && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />}
                      </div>
                      <div className="text-xs text-muted-foreground">@{account.username}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div>
                    <div className="font-medium">{account.followers.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">关注 {account.following.toLocaleString()}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{account.accountAge}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[160px]">
                    {account.niche.slice(0, 2).map((n) => (
                      <Badge key={n} variant="secondary" className="text-xs">
                        {n}
                      </Badge>
                    ))}
                    {account.niche.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{account.niche.length - 2}
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
                    <Progress
                      value={account.dailyLimit > 0 ? (account.usedToday / account.dailyLimit) * 100 : 0}
                      className="h-1.5"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      account.engagementRate >= 4
                        ? "text-green-600 font-medium"
                        : account.engagementRate >= 2.5
                          ? "text-blue-600"
                          : "text-muted-foreground"
                    }
                  >
                    {account.engagementRate}%
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
                      <DropdownMenuItem>解除限制</DropdownMenuItem>
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

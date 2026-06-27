"use client";

import { useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  Instagram,
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

// 模拟Instagram账号数据
const mockInstagramAccounts = [
  {
    id: "1",
    username: "tech_daily_digest",
    displayName: "Tech Daily",
    email: "ig1@proton.me",
    followers: 25800,
    following: 450,
    posts: 680,
    accountAge: "2年8个月",
    verified: false,
    niche: ["科技", "数码", "评测"],
    dailyLimit: 5,
    usedToday: 2,
    totalPosts: 180,
    engagementRate: 4.2,
    status: "active",
    lastActive: "2024-01-25 14:00",
  },
  {
    id: "2",
    username: "startup_stories_hub",
    displayName: "Startup Stories",
    email: "ig2@proton.me",
    followers: 48200,
    following: 320,
    posts: 1250,
    accountAge: "4年2个月",
    verified: true,
    niche: ["创业", "企业家", "商业"],
    dailyLimit: 8,
    usedToday: 4,
    totalPosts: 420,
    engagementRate: 5.8,
    status: "active",
    lastActive: "2024-01-25 15:30",
  },
  {
    id: "3",
    username: "ai_insights_2024",
    displayName: "AI Insights",
    email: "ig3@proton.me",
    followers: 18500,
    following: 280,
    posts: 450,
    accountAge: "1年6个月",
    verified: false,
    niche: ["AI", "机器学习", "未来科技"],
    dailyLimit: 5,
    usedToday: 3,
    totalPosts: 150,
    engagementRate: 3.9,
    status: "active",
    lastActive: "2024-01-25 12:45",
  },
  {
    id: "4",
    username: "marketing_mastery_tips",
    displayName: "Marketing Mastery",
    email: "ig4@proton.me",
    followers: 35600,
    following: 520,
    posts: 920,
    accountAge: "3年4个月",
    verified: false,
    niche: ["营销", "品牌", "社媒"],
    dailyLimit: 6,
    usedToday: 2,
    totalPosts: 280,
    engagementRate: 4.5,
    status: "active",
    lastActive: "2024-01-25 11:00",
  },
  {
    id: "5",
    username: "limited_reach_acc",
    displayName: "Limited Account",
    email: "ig5@proton.me",
    followers: 8200,
    following: 380,
    posts: 220,
    accountAge: "1年1个月",
    verified: false,
    niche: ["测试"],
    dailyLimit: 2,
    usedToday: 2,
    totalPosts: 45,
    engagementRate: 1.8,
    status: "shadowban",
    lastActive: "2024-01-24 18:00",
  },
  {
    id: "6",
    username: "disabled_account_01",
    displayName: "Disabled",
    email: "ig6@proton.me",
    followers: 3500,
    following: 200,
    posts: 85,
    accountAge: "10个月",
    verified: false,
    niche: ["测试"],
    dailyLimit: 0,
    usedToday: 0,
    totalPosts: 20,
    engagementRate: 0.5,
    status: "disabled",
    lastActive: "2024-01-15 09:00",
  },
];

export default function InstagramAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAccounts = mockInstagramAccounts.filter((account) => {
    const matchesSearch =
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockInstagramAccounts.length,
    active: mockInstagramAccounts.filter((a) => a.status === "active").length,
    totalFollowers: mockInstagramAccounts.reduce((sum, a) => sum + a.followers, 0),
    avgEngagement:
      (mockInstagramAccounts.reduce((sum, a) => sum + a.engagementRate, 0) / mockInstagramAccounts.length).toFixed(1) +
      "%",
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
      case "shadowban":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            影子封禁
          </Badge>
        );
      case "disabled":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="h-3 w-3 mr-1" />
            已禁用
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
          <h1 className="text-2xl font-bold">Instagram 账号管理</h1>
          <p className="text-muted-foreground mt-1">管理Instagram发帖账号池，监控账号状态和互动数据</p>
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
                <DialogTitle>添加Instagram账号</DialogTitle>
                <DialogDescription>添加新的Instagram账号到资源池</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>用户名</Label>
                  <Input placeholder="Instagram用户名" />
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
                    <Input type="number" placeholder="5" />
                  </div>
                  <div className="grid gap-2">
                    <Label>内容领域</Label>
                    <Input placeholder="科技, 创业, 营销" />
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
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="shadowban">影子封禁</SelectItem>
            <SelectItem value="disabled">已禁用</SelectItem>
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
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                      <Instagram className="h-4 w-4 text-white" />
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
                    <div className="text-xs text-muted-foreground">{account.posts} 帖子</div>
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
                      <DropdownMenuItem>检测影子封禁</DropdownMenuItem>
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

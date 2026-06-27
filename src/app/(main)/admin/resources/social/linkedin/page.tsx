"use client";

import { useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  Linkedin,
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

// 模拟LinkedIn账号数据
const mockLinkedInAccounts = [
  {
    id: "1",
    name: "张明",
    headline: "AI创业者 | 技术顾问 | 连续创业者",
    email: "li1@proton.me",
    connections: 8500,
    followers: 12800,
    posts: 320,
    accountAge: "5年2个月",
    premium: true,
    industry: ["科技", "AI", "创业"],
    dailyLimit: 5,
    usedToday: 2,
    totalPosts: 180,
    engagementRate: 4.8,
    status: "active",
    lastActive: "2024-01-25 16:00",
  },
  {
    id: "2",
    name: "李华",
    headline: "数字营销专家 | SEO顾问 | 品牌策略师",
    email: "li2@proton.me",
    connections: 5200,
    followers: 8900,
    posts: 450,
    accountAge: "4年8个月",
    premium: true,
    industry: ["营销", "SEO", "品牌"],
    dailyLimit: 5,
    usedToday: 3,
    totalPosts: 220,
    engagementRate: 5.2,
    status: "active",
    lastActive: "2024-01-25 15:30",
  },
  {
    id: "3",
    name: "王强",
    headline: "产品经理 | SaaS专家 | B2B营销",
    email: "li3@proton.me",
    connections: 3800,
    followers: 5600,
    posts: 180,
    accountAge: "3年4个月",
    premium: false,
    industry: ["产品", "SaaS", "B2B"],
    dailyLimit: 3,
    usedToday: 1,
    totalPosts: 95,
    engagementRate: 3.8,
    status: "active",
    lastActive: "2024-01-25 14:00",
  },
  {
    id: "4",
    name: "陈静",
    headline: "投资人 | VC合伙人 | 创业导师",
    email: "li4@proton.me",
    connections: 15000,
    followers: 28500,
    posts: 680,
    accountAge: "8年1个月",
    premium: true,
    industry: ["投资", "VC", "创业"],
    dailyLimit: 8,
    usedToday: 5,
    totalPosts: 380,
    engagementRate: 6.5,
    status: "active",
    lastActive: "2024-01-25 15:45",
  },
  {
    id: "5",
    name: "刘洋",
    headline: "软件工程师 | 全栈开发 | 开源贡献者",
    email: "li5@proton.me",
    connections: 2200,
    followers: 3500,
    posts: 120,
    accountAge: "2年6个月",
    premium: false,
    industry: ["技术", "开发", "开源"],
    dailyLimit: 3,
    usedToday: 3,
    totalPosts: 65,
    engagementRate: 3.2,
    status: "restricted",
    lastActive: "2024-01-25 10:00",
  },
  {
    id: "6",
    name: "赵敏",
    headline: "HR总监 | 人才战略 | 组织发展",
    email: "li6@proton.me",
    connections: 6800,
    followers: 9200,
    posts: 280,
    accountAge: "6年3个月",
    premium: true,
    industry: ["HR", "人才", "管理"],
    dailyLimit: 5,
    usedToday: 2,
    totalPosts: 145,
    engagementRate: 4.1,
    status: "active",
    lastActive: "2024-01-25 13:30",
  },
];

export default function LinkedInAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAccounts = mockLinkedInAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.headline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockLinkedInAccounts.length,
    active: mockLinkedInAccounts.filter((a) => a.status === "active").length,
    totalConnections: mockLinkedInAccounts.reduce((sum, a) => sum + a.connections, 0),
    avgEngagement:
      (mockLinkedInAccounts.reduce((sum, a) => sum + a.engagementRate, 0) / mockLinkedInAccounts.length).toFixed(1) +
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
      case "restricted":
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
          <h1 className="text-2xl font-bold">LinkedIn 账号管理</h1>
          <p className="text-muted-foreground mt-1">管理LinkedIn发帖账号池，监控账号状态和职业影响力</p>
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
                <DialogTitle>添加LinkedIn账号</DialogTitle>
                <DialogDescription>添加新的LinkedIn账号到资源池</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>姓名</Label>
                  <Input placeholder="LinkedIn显示姓名" />
                </div>
                <div className="grid gap-2">
                  <Label>邮箱</Label>
                  <Input placeholder="LinkedIn登录邮箱" />
                </div>
                <div className="grid gap-2">
                  <Label>密码</Label>
                  <Input type="password" placeholder="账号密码" />
                </div>
                <div className="grid gap-2">
                  <Label>职业头衔</Label>
                  <Input placeholder="如：AI创业者 | 技术顾问" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>每日发帖上限</Label>
                    <Input type="number" placeholder="5" />
                  </div>
                  <div className="grid gap-2">
                    <Label>行业领域</Label>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">总人脉数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConnections.toLocaleString()}</div>
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
            placeholder="搜索姓名或头衔..."
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
            <SelectItem value="restricted">受限</SelectItem>
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
              <TableHead className="text-center">人脉/粉丝</TableHead>
              <TableHead className="text-center">账龄</TableHead>
              <TableHead>行业领域</TableHead>
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
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                      <Linkedin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        {account.name}
                        {account.premium && (
                          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] px-1">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground max-w-[200px] truncate">{account.headline}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div>
                    <div className="font-medium">{account.connections.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{account.followers.toLocaleString()} 关注者</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{account.accountAge}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[140px]">
                    {account.industry.slice(0, 2).map((ind) => (
                      <Badge key={ind} variant="secondary" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                    {account.industry.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{account.industry.length - 2}
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
                      account.engagementRate >= 5
                        ? "text-green-600 font-medium"
                        : account.engagementRate >= 3.5
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

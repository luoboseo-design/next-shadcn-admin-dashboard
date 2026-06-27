"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Download,
  ExternalLink,
  FolderOpen,
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

// 模拟目录站点数据
const mockDirectories = [
  {
    id: "1",
    name: "DMOZ",
    url: "https://dmoz-odp.org",
    category: "综合目录",
    da: 85,
    dr: 82,
    submissionType: "免费",
    approvalTime: "7-14天",
    successRate: 65,
    totalSubmissions: 120,
    status: "active",
  },
  {
    id: "2",
    name: "Best of the Web",
    url: "https://botw.org",
    category: "综合目录",
    da: 72,
    dr: 70,
    submissionType: "付费",
    approvalTime: "1-3天",
    successRate: 95,
    totalSubmissions: 85,
    status: "active",
  },
  {
    id: "3",
    name: "Jasmine Directory",
    url: "https://jasminedirectory.com",
    category: "综合目录",
    da: 58,
    dr: 55,
    submissionType: "免费",
    approvalTime: "3-7天",
    successRate: 78,
    totalSubmissions: 200,
    status: "active",
  },
  {
    id: "4",
    name: "Business.com",
    url: "https://business.com",
    category: "商业目录",
    da: 80,
    dr: 78,
    submissionType: "付费",
    approvalTime: "1-2天",
    successRate: 92,
    totalSubmissions: 50,
    status: "active",
  },
  {
    id: "5",
    name: "Yelp",
    url: "https://yelp.com",
    category: "本地商业",
    da: 94,
    dr: 92,
    submissionType: "免费",
    approvalTime: "即时",
    successRate: 88,
    totalSubmissions: 300,
    status: "active",
  },
  {
    id: "6",
    name: "Clutch",
    url: "https://clutch.co",
    category: "B2B目录",
    da: 78,
    dr: 75,
    submissionType: "免费",
    approvalTime: "5-10天",
    successRate: 70,
    totalSubmissions: 45,
    status: "active",
  },
  {
    id: "7",
    name: "G2",
    url: "https://g2.com",
    category: "软件目录",
    da: 91,
    dr: 89,
    submissionType: "免费",
    approvalTime: "3-5天",
    successRate: 85,
    totalSubmissions: 60,
    status: "active",
  },
  {
    id: "8",
    name: "Capterra",
    url: "https://capterra.com",
    category: "软件目录",
    da: 89,
    dr: 87,
    submissionType: "免费",
    approvalTime: "2-4天",
    successRate: 90,
    totalSubmissions: 55,
    status: "active",
  },
];

export default function DirectoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredDirectories = mockDirectories.filter((dir) => {
    const matchesSearch =
      dir.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dir.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || dir.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockDirectories.length,
    avgDa: Math.round(mockDirectories.reduce((sum, d) => sum + d.da, 0) / mockDirectories.length),
    totalSubmissions: mockDirectories.reduce((sum, d) => sum + d.totalSubmissions, 0),
    avgSuccessRate: Math.round(mockDirectories.reduce((sum, d) => sum + d.successRate, 0) / mockDirectories.length),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">目录站点管理</h1>
          <p className="text-muted-foreground mt-1">管理网站目录提交资源，用于SEO外链建设</p>
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
                添加目录站
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加目录站点</DialogTitle>
                <DialogDescription>添加新的目录站点到资源库</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>站点名称</Label>
                  <Input placeholder="如：DMOZ" />
                </div>
                <div className="grid gap-2">
                  <Label>站点地址</Label>
                  <Input placeholder="https://example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>分类</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">综合目录</SelectItem>
                        <SelectItem value="business">商业目录</SelectItem>
                        <SelectItem value="local">本地商业</SelectItem>
                        <SelectItem value="b2b">B2B目录</SelectItem>
                        <SelectItem value="software">软件目录</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>提交类型</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">免费</SelectItem>
                        <SelectItem value="paid">付费</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>DA 值</Label>
                    <Input type="number" placeholder="0-100" />
                  </div>
                  <div className="grid gap-2">
                    <Label>DR 值</Label>
                    <Input type="number" placeholder="0-100" />
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
            <CardTitle className="text-sm font-medium text-muted-foreground">目录站总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均 DA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgDa}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总提交次数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.avgSuccessRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索目录站名称或地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            <SelectItem value="综合目录">综合目录</SelectItem>
            <SelectItem value="商业目录">商业目录</SelectItem>
            <SelectItem value="本地商业">本地商业</SelectItem>
            <SelectItem value="B2B目录">B2B目录</SelectItem>
            <SelectItem value="软件目录">软件目录</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 目录站列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>目录站</TableHead>
              <TableHead>分类</TableHead>
              <TableHead className="text-center">DA</TableHead>
              <TableHead className="text-center">DR</TableHead>
              <TableHead className="text-center">提交类型</TableHead>
              <TableHead className="text-center">审核时间</TableHead>
              <TableHead className="text-center">成功率</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDirectories.map((dir) => (
              <TableRow key={dir.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FolderOpen className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">{dir.name}</div>
                      <a
                        href={dir.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {dir.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{dir.category}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className={dir.da >= 80 ? "text-green-600 font-medium" : dir.da >= 60 ? "text-blue-600" : ""}>
                    {dir.da}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className={dir.dr >= 80 ? "text-green-600 font-medium" : dir.dr >= 60 ? "text-blue-600" : ""}>
                    {dir.dr}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={
                      dir.submissionType === "免费"
                        ? "border-green-500 text-green-600"
                        : "border-amber-500 text-amber-600"
                    }
                  >
                    {dir.submissionType}
                  </Badge>
                </TableCell>
                <TableCell className="text-center text-sm">{dir.approvalTime}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      dir.successRate >= 85
                        ? "text-green-600"
                        : dir.successRate >= 70
                          ? "text-amber-600"
                          : "text-red-600"
                    }
                  >
                    {dir.successRate}%
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {dir.status === "active" ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      可用
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
                      <DropdownMenuItem>查看提交记录</DropdownMenuItem>
                      <DropdownMenuItem>测试提交</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">禁用站点</DropdownMenuItem>
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

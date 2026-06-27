"use client";

import { useState } from "react";

import {
  CheckCircle2,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
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
import { Textarea } from "@/components/ui/textarea";

// 模拟客座媒体数据
const mockGuestPostSites = [
  {
    id: "1",
    name: "TechCrunch",
    url: "https://techcrunch.com",
    category: "科技媒体",
    da: 94,
    dr: 92,
    monthlyTraffic: "50M+",
    publishCost: 2500,
    turnaround: "5-7天",
    dofollow: true,
    guidelines: "原创内容，1500字以上，科技/创业主题",
    totalPublished: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Forbes",
    url: "https://forbes.com",
    category: "商业媒体",
    da: 95,
    dr: 94,
    monthlyTraffic: "100M+",
    publishCost: 3500,
    turnaround: "7-10天",
    dofollow: true,
    guidelines: "原创内容，2000字以上，商业/领导力主题",
    totalPublished: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Entrepreneur",
    url: "https://entrepreneur.com",
    category: "创业媒体",
    da: 91,
    dr: 89,
    monthlyTraffic: "30M+",
    publishCost: 1800,
    turnaround: "3-5天",
    dofollow: true,
    guidelines: "创业经验分享，1200字以上",
    totalPublished: 25,
    status: "active",
  },
  {
    id: "4",
    name: "HubSpot Blog",
    url: "https://blog.hubspot.com",
    category: "营销媒体",
    da: 89,
    dr: 87,
    monthlyTraffic: "20M+",
    publishCost: 1200,
    turnaround: "3-5天",
    dofollow: true,
    guidelines: "营销/销售实战内容，数据支撑",
    totalPublished: 35,
    status: "active",
  },
  {
    id: "5",
    name: "36氪",
    url: "https://36kr.com",
    category: "科技媒体",
    da: 78,
    dr: 75,
    monthlyTraffic: "15M+",
    publishCost: 800,
    turnaround: "2-3天",
    dofollow: true,
    guidelines: "科技/创业/投融资，中文内容",
    totalPublished: 50,
    status: "active",
  },
  {
    id: "6",
    name: "虎嗅",
    url: "https://huxiu.com",
    category: "科技媒体",
    da: 72,
    dr: 70,
    monthlyTraffic: "10M+",
    publishCost: 600,
    turnaround: "1-2天",
    dofollow: true,
    guidelines: "深度分析，商业观点，中文内容",
    totalPublished: 42,
    status: "active",
  },
  {
    id: "7",
    name: "Medium",
    url: "https://medium.com",
    category: "内容平台",
    da: 95,
    dr: 93,
    monthlyTraffic: "200M+",
    publishCost: 0,
    turnaround: "即时",
    dofollow: false,
    guidelines: "任何主题，自有账号发布",
    totalPublished: 150,
    status: "active",
  },
  {
    id: "8",
    name: "Dev.to",
    url: "https://dev.to",
    category: "技术媒体",
    da: 85,
    dr: 82,
    monthlyTraffic: "25M+",
    publishCost: 0,
    turnaround: "即时",
    dofollow: false,
    guidelines: "技术/开发者内容，自有账号发布",
    totalPublished: 80,
    status: "active",
  },
];

export default function GuestPostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSites = mockGuestPostSites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || site.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockGuestPostSites.length,
    avgDa: Math.round(mockGuestPostSites.reduce((sum, s) => sum + s.da, 0) / mockGuestPostSites.length),
    totalPublished: mockGuestPostSites.reduce((sum, s) => sum + s.totalPublished, 0),
    freeChannels: mockGuestPostSites.filter((s) => s.publishCost === 0).length,
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">客座媒体管理</h1>
          <p className="text-muted-foreground mt-1">管理客座文章发布渠道，配置发布规则和成本</p>
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
                添加媒体
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>添加客座媒体</DialogTitle>
                <DialogDescription>添加新的客座文章发布渠道</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>媒体名称</Label>
                  <Input placeholder="如：TechCrunch" />
                </div>
                <div className="grid gap-2">
                  <Label>媒体地址</Label>
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
                        <SelectItem value="tech">科技媒体</SelectItem>
                        <SelectItem value="business">商业媒体</SelectItem>
                        <SelectItem value="startup">创业媒体</SelectItem>
                        <SelectItem value="marketing">营销媒体</SelectItem>
                        <SelectItem value="content">内容平台</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>发布成本 (USD)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>DA 值</Label>
                    <Input type="number" placeholder="0-100" />
                  </div>
                  <div className="grid gap-2">
                    <Label>交稿周期</Label>
                    <Input placeholder="如：3-5天" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>发布要求</Label>
                  <Textarea placeholder="内容要求、字数限制、主题范围等" />
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
            <CardTitle className="text-sm font-medium text-muted-foreground">媒体总数</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">已发布文章</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPublished}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">免费渠道</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.freeChannels}</div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索媒体名称或地址..."
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
            <SelectItem value="科技媒体">科技媒体</SelectItem>
            <SelectItem value="商业媒体">商业媒体</SelectItem>
            <SelectItem value="创业媒体">创业媒体</SelectItem>
            <SelectItem value="营销媒体">营销媒体</SelectItem>
            <SelectItem value="内容平台">内容平台</SelectItem>
            <SelectItem value="技术媒体">技术媒体</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 媒体列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>媒体</TableHead>
              <TableHead>分类</TableHead>
              <TableHead className="text-center">DA/DR</TableHead>
              <TableHead className="text-center">月流量</TableHead>
              <TableHead className="text-center">发布成本</TableHead>
              <TableHead className="text-center">交稿周期</TableHead>
              <TableHead className="text-center">Dofollow</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{site.name}</div>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {site.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{site.category}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-green-600 font-medium">{site.da}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-blue-600">{site.dr}</span>
                </TableCell>
                <TableCell className="text-center text-sm">{site.monthlyTraffic}</TableCell>
                <TableCell className="text-center">
                  {site.publishCost === 0 ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">免费</Badge>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {site.publishCost}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center text-sm">{site.turnaround}</TableCell>
                <TableCell className="text-center">
                  {site.dofollow ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">是</Badge>
                  ) : (
                    <Badge variant="outline">否</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {site.status === "active" ? (
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
                      <DropdownMenuItem>查看发布记录</DropdownMenuItem>
                      <DropdownMenuItem>查看发布要求</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">禁用媒体</DropdownMenuItem>
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

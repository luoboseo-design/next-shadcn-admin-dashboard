"use client";

import { useState } from "react";

import {
  CheckCircle2,
  DollarSign,
  Download,
  ExternalLink,
  Globe,
  MoreHorizontal,
  Newspaper,
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

// 模拟新闻媒体数据
const mockNewsSites = [
  {
    id: "1",
    name: "美通社 (PR Newswire)",
    url: "https://prnewswire.com",
    region: "全球",
    type: "新闻通讯社",
    da: 92,
    dr: 90,
    monthlyTraffic: "80M+",
    publishCost: 1500,
    turnaround: "即时-24小时",
    googleNews: true,
    dofollow: true,
    languages: ["中文", "英文", "多语言"],
    distribution: ["Yahoo Finance", "Bloomberg", "MarketWatch"],
    totalPublished: 85,
    successRate: 98,
    status: "active",
  },
  {
    id: "2",
    name: "Business Wire",
    url: "https://businesswire.com",
    region: "全球",
    type: "新闻通讯社",
    da: 91,
    dr: 89,
    monthlyTraffic: "50M+",
    publishCost: 1200,
    turnaround: "即时-12小时",
    googleNews: true,
    dofollow: true,
    languages: ["英文", "多语言"],
    distribution: ["AP News", "Reuters", "CNBC"],
    totalPublished: 62,
    successRate: 97,
    status: "active",
  },
  {
    id: "3",
    name: "GlobeNewswire",
    url: "https://globenewswire.com",
    region: "全球",
    type: "新闻通讯社",
    da: 88,
    dr: 86,
    monthlyTraffic: "30M+",
    publishCost: 800,
    turnaround: "即时-6小时",
    googleNews: true,
    dofollow: true,
    languages: ["英文"],
    distribution: ["Nasdaq", "Yahoo", "Benzinga"],
    totalPublished: 95,
    successRate: 96,
    status: "active",
  },
  {
    id: "4",
    name: "中国新闻网",
    url: "https://chinanews.com",
    region: "中国",
    type: "新闻门户",
    da: 85,
    dr: 82,
    monthlyTraffic: "100M+",
    publishCost: 500,
    turnaround: "1-2天",
    googleNews: true,
    dofollow: true,
    languages: ["中文"],
    distribution: ["百度新闻", "搜狐", "网易"],
    totalPublished: 120,
    successRate: 92,
    status: "active",
  },
  {
    id: "5",
    name: "环球网",
    url: "https://huanqiu.com",
    region: "中国",
    type: "新闻门户",
    da: 82,
    dr: 80,
    monthlyTraffic: "80M+",
    publishCost: 400,
    turnaround: "1-3天",
    googleNews: true,
    dofollow: true,
    languages: ["中文", "英文"],
    distribution: ["今日头条", "腾讯新闻"],
    totalPublished: 88,
    successRate: 90,
    status: "active",
  },
  {
    id: "6",
    name: "TechCrunch",
    url: "https://techcrunch.com",
    region: "全球",
    type: "科技新闻",
    da: 94,
    dr: 92,
    monthlyTraffic: "50M+",
    publishCost: 3000,
    turnaround: "3-7天",
    googleNews: true,
    dofollow: true,
    languages: ["英文"],
    distribution: ["自有渠道"],
    totalPublished: 15,
    successRate: 85,
    status: "active",
  },
  {
    id: "7",
    name: "VentureBeat",
    url: "https://venturebeat.com",
    region: "全球",
    type: "科技新闻",
    da: 90,
    dr: 88,
    monthlyTraffic: "25M+",
    publishCost: 2000,
    turnaround: "2-5天",
    googleNews: true,
    dofollow: true,
    languages: ["英文"],
    distribution: ["自有渠道"],
    totalPublished: 28,
    successRate: 88,
    status: "active",
  },
  {
    id: "8",
    name: "36氪",
    url: "https://36kr.com",
    region: "中国",
    type: "科技新闻",
    da: 78,
    dr: 75,
    monthlyTraffic: "15M+",
    publishCost: 800,
    turnaround: "1-3天",
    googleNews: false,
    dofollow: true,
    languages: ["中文"],
    distribution: ["微信", "今日头条"],
    totalPublished: 65,
    successRate: 94,
    status: "active",
  },
];

export default function NewsMediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSites = mockNewsSites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === "all" || site.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const stats = {
    total: mockNewsSites.length,
    avgDa: Math.round(mockNewsSites.reduce((sum, s) => sum + s.da, 0) / mockNewsSites.length),
    totalPublished: mockNewsSites.reduce((sum, s) => sum + s.totalPublished, 0),
    googleNewsCount: mockNewsSites.filter((s) => s.googleNews).length,
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">新闻媒体管理</h1>
          <p className="text-muted-foreground mt-1">管理新闻稿发布渠道，包括通讯社和新闻门户</p>
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
                <DialogTitle>添加新闻媒体</DialogTitle>
                <DialogDescription>添加新的新闻稿发布渠道</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>媒体名称</Label>
                  <Input placeholder="如：美通社" />
                </div>
                <div className="grid gap-2">
                  <Label>媒体地址</Label>
                  <Input placeholder="https://example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>地区</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择地区" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">全球</SelectItem>
                        <SelectItem value="china">中国</SelectItem>
                        <SelectItem value="us">美国</SelectItem>
                        <SelectItem value="eu">欧洲</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>类型</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wire">新闻通讯社</SelectItem>
                        <SelectItem value="portal">新闻门户</SelectItem>
                        <SelectItem value="tech">科技新闻</SelectItem>
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
                    <Label>发布成本 (USD)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>分发渠道</Label>
                  <Textarea placeholder="主要分发到的平台，逗号分隔" />
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
            <CardTitle className="text-sm font-medium text-muted-foreground">已发布稿件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPublished}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Google News 收录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.googleNewsCount}</div>
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
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部地区</SelectItem>
            <SelectItem value="全球">全球</SelectItem>
            <SelectItem value="中国">中国</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 媒体列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>媒体</TableHead>
              <TableHead>类型</TableHead>
              <TableHead className="text-center">DA/DR</TableHead>
              <TableHead className="text-center">发布成本</TableHead>
              <TableHead className="text-center">交稿周期</TableHead>
              <TableHead className="text-center">Google News</TableHead>
              <TableHead className="text-center">成功率</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Newspaper className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {site.name}
                        <Badge variant="outline" className="text-xs">
                          <Globe className="h-3 w-3 mr-1" />
                          {site.region}
                        </Badge>
                      </div>
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
                  <Badge variant="secondary">{site.type}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-green-600 font-medium">{site.da}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-blue-600">{site.dr}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="flex items-center justify-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {site.publishCost.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-center text-sm">{site.turnaround}</TableCell>
                <TableCell className="text-center">
                  {site.googleNews ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      已收录
                    </Badge>
                  ) : (
                    <Badge variant="outline">未收录</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      site.successRate >= 95
                        ? "text-green-600 font-medium"
                        : site.successRate >= 85
                          ? "text-blue-600"
                          : "text-amber-600"
                    }
                  >
                    {site.successRate}%
                  </span>
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
                      <DropdownMenuItem>查看分发渠道</DropdownMenuItem>
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

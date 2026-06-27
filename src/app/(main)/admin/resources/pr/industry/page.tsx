"use client";

import { useState } from "react";

import {
  BookOpen,
  CheckCircle2,
  DollarSign,
  Download,
  ExternalLink,
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

// 模拟行业媒体数据
const mockIndustryMedia = [
  {
    id: "1",
    name: "亿欧网",
    url: "https://iyiou.com",
    industry: "科技/创业",
    focus: ["人工智能", "企业服务", "新消费"],
    da: 72,
    dr: 70,
    monthlyTraffic: "8M+",
    publishCost: 300,
    turnaround: "1-2天",
    dofollow: true,
    audience: "创业者/投资人",
    totalPublished: 85,
    successRate: 95,
    status: "active",
  },
  {
    id: "2",
    name: "钛媒体",
    url: "https://tmtpost.com",
    industry: "科技/商业",
    focus: ["科技创新", "商业模式", "产业互联网"],
    da: 75,
    dr: 72,
    monthlyTraffic: "12M+",
    publishCost: 400,
    turnaround: "1-3天",
    dofollow: true,
    audience: "科技从业者/投资人",
    totalPublished: 68,
    successRate: 92,
    status: "active",
  },
  {
    id: "3",
    name: "雷锋网",
    url: "https://leiphone.com",
    industry: "人工智能",
    focus: ["AI", "自动驾驶", "智能硬件"],
    da: 70,
    dr: 68,
    monthlyTraffic: "6M+",
    publishCost: 350,
    turnaround: "1-2天",
    dofollow: true,
    audience: "AI从业者/研究员",
    totalPublished: 92,
    successRate: 94,
    status: "active",
  },
  {
    id: "4",
    name: "InfoQ",
    url: "https://infoq.cn",
    industry: "技术开发",
    focus: ["软件开发", "架构", "DevOps"],
    da: 78,
    dr: 75,
    monthlyTraffic: "10M+",
    publishCost: 500,
    turnaround: "2-5天",
    dofollow: true,
    audience: "开发者/技术管理者",
    totalPublished: 45,
    successRate: 90,
    status: "active",
  },
  {
    id: "5",
    name: "品玩",
    url: "https://pingwest.com",
    industry: "科技/生活方式",
    focus: ["消费科技", "硅谷动态", "生活方式"],
    da: 68,
    dr: 65,
    monthlyTraffic: "5M+",
    publishCost: 280,
    turnaround: "1-2天",
    dofollow: true,
    audience: "年轻科技爱好者",
    totalPublished: 55,
    successRate: 93,
    status: "active",
  },
  {
    id: "6",
    name: "猎云网",
    url: "https://lieyunwang.com",
    industry: "创投",
    focus: ["创业公司", "投融资", "创业故事"],
    da: 65,
    dr: 62,
    monthlyTraffic: "4M+",
    publishCost: 250,
    turnaround: "即时-1天",
    dofollow: true,
    audience: "创业者/投资人",
    totalPublished: 120,
    successRate: 96,
    status: "active",
  },
  {
    id: "7",
    name: "动点科技",
    url: "https://technode.com",
    industry: "科技/国际",
    focus: ["中国科技", "出海", "国际视角"],
    da: 62,
    dr: 60,
    monthlyTraffic: "3M+",
    publishCost: 200,
    turnaround: "1-2天",
    dofollow: true,
    audience: "国际投资人/出海企业",
    totalPublished: 78,
    successRate: 91,
    status: "active",
  },
  {
    id: "8",
    name: "极客公园",
    url: "https://geekpark.net",
    industry: "科技/创新",
    focus: ["前沿科技", "创新产品", "行业活动"],
    da: 70,
    dr: 68,
    monthlyTraffic: "5M+",
    publishCost: 350,
    turnaround: "1-3天",
    dofollow: true,
    audience: "科技创新者/产品经理",
    totalPublished: 62,
    successRate: 89,
    status: "active",
  },
  {
    id: "9",
    name: "创业邦",
    url: "https://cyzone.cn",
    industry: "创业/投资",
    focus: ["创业故事", "融资动态", "行业分析"],
    da: 72,
    dr: 70,
    monthlyTraffic: "7M+",
    publishCost: 320,
    turnaround: "1-2天",
    dofollow: true,
    audience: "创业者/投资人",
    totalPublished: 95,
    successRate: 94,
    status: "active",
  },
  {
    id: "10",
    name: "IT桔子",
    url: "https://itjuzi.com",
    industry: "创投数据",
    focus: ["投融资数据", "公司信息", "行业报告"],
    da: 68,
    dr: 65,
    monthlyTraffic: "4M+",
    publishCost: 280,
    turnaround: "1-2天",
    dofollow: true,
    audience: "投资人/研究人员",
    totalPublished: 48,
    successRate: 92,
    status: "active",
  },
];

export default function IndustryMediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMedia = mockIndustryMedia.filter((media) => {
    const matchesSearch =
      media.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === "all" || media.industry.includes(industryFilter);
    return matchesSearch && matchesIndustry;
  });

  const stats = {
    total: mockIndustryMedia.length,
    avgDa: Math.round(mockIndustryMedia.reduce((sum, m) => sum + m.da, 0) / mockIndustryMedia.length),
    totalPublished: mockIndustryMedia.reduce((sum, m) => sum + m.totalPublished, 0),
    avgSuccessRate: Math.round(mockIndustryMedia.reduce((sum, m) => sum + m.successRate, 0) / mockIndustryMedia.length),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">行业媒体管理</h1>
          <p className="text-muted-foreground mt-1">管理垂直行业媒体资源，精准触达目标受众</p>
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
                <DialogTitle>添加行业媒体</DialogTitle>
                <DialogDescription>添加新的行业媒体发布渠道</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>媒体名称</Label>
                  <Input placeholder="如：亿欧网" />
                </div>
                <div className="grid gap-2">
                  <Label>媒体地址</Label>
                  <Input placeholder="https://example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>所属行业</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择行业" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">科技</SelectItem>
                        <SelectItem value="ai">人工智能</SelectItem>
                        <SelectItem value="startup">创业/创投</SelectItem>
                        <SelectItem value="dev">技术开发</SelectItem>
                        <SelectItem value="finance">金融科技</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>发布成本 (CNY)</Label>
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
                    <Input placeholder="如：1-2天" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>内容聚焦</Label>
                  <Textarea placeholder="该媒体关注的内容领域，逗号分隔" />
                </div>
                <div className="grid gap-2">
                  <Label>目标受众</Label>
                  <Input placeholder="如：创业者/投资人" />
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
            placeholder="搜索媒体名称或地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部行业</SelectItem>
            <SelectItem value="科技">科技</SelectItem>
            <SelectItem value="人工智能">人工智能</SelectItem>
            <SelectItem value="创投">创投</SelectItem>
            <SelectItem value="技术开发">技术开发</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 媒体列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>媒体</TableHead>
              <TableHead>行业</TableHead>
              <TableHead>内容聚焦</TableHead>
              <TableHead className="text-center">DA/DR</TableHead>
              <TableHead className="text-center">发布成本</TableHead>
              <TableHead className="text-center">交稿周期</TableHead>
              <TableHead className="text-center">成功率</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedia.map((media) => (
              <TableRow key={media.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-cyan-600" />
                    </div>
                    <div>
                      <div className="font-medium">{media.name}</div>
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {media.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{media.industry}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {media.focus.slice(0, 2).map((f) => (
                      <Badge key={f} variant="outline" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                    {media.focus.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{media.focus.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-green-600 font-medium">{media.da}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-blue-600">{media.dr}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="flex items-center justify-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {media.publishCost}
                  </span>
                </TableCell>
                <TableCell className="text-center text-sm">{media.turnaround}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      media.successRate >= 95
                        ? "text-green-600 font-medium"
                        : media.successRate >= 90
                          ? "text-blue-600"
                          : "text-amber-600"
                    }
                  >
                    {media.successRate}%
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {media.status === "active" ? (
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
                      <DropdownMenuItem>查看受众分析</DropdownMenuItem>
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

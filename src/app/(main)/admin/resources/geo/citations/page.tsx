"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Download,
  ExternalLink,
  Link,
  MoreHorizontal,
  Plus,
  Search,
  Star,
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

// 模拟引用源数据
const mockCitationSources = [
  {
    id: "1",
    name: "Wikipedia",
    url: "https://wikipedia.org",
    category: "百科全书",
    authorityScore: 98,
    trustScore: 95,
    citationCount: 1250,
    avgCitationWeight: 0.95,
    languages: ["中文", "英文", "多语言"],
    topics: ["通用", "科技", "商业"],
    status: "active",
  },
  {
    id: "2",
    name: "Google Scholar",
    url: "https://scholar.google.com",
    category: "学术搜索",
    authorityScore: 96,
    trustScore: 98,
    citationCount: 850,
    avgCitationWeight: 0.92,
    languages: ["英文", "多语言"],
    topics: ["学术", "科研", "论文"],
    status: "active",
  },
  {
    id: "3",
    name: "Crunchbase",
    url: "https://crunchbase.com",
    category: "商业数据库",
    authorityScore: 88,
    trustScore: 90,
    citationCount: 620,
    avgCitationWeight: 0.85,
    languages: ["英文"],
    topics: ["创业", "投融资", "公司信息"],
    status: "active",
  },
  {
    id: "4",
    name: "Statista",
    url: "https://statista.com",
    category: "数据统计",
    authorityScore: 92,
    trustScore: 94,
    citationCount: 480,
    avgCitationWeight: 0.88,
    languages: ["英文", "德文"],
    topics: ["数据", "市场研究", "行业报告"],
    status: "active",
  },
  {
    id: "5",
    name: "Reuters",
    url: "https://reuters.com",
    category: "新闻媒体",
    authorityScore: 94,
    trustScore: 92,
    citationCount: 380,
    avgCitationWeight: 0.9,
    languages: ["英文", "多语言"],
    topics: ["新闻", "财经", "国际"],
    status: "active",
  },
  {
    id: "6",
    name: "GitHub",
    url: "https://github.com",
    category: "开源平台",
    authorityScore: 90,
    trustScore: 88,
    citationCount: 550,
    avgCitationWeight: 0.82,
    languages: ["英文"],
    topics: ["技术", "开源", "开发者"],
    status: "active",
  },
  {
    id: "7",
    name: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov",
    category: "医学数据库",
    authorityScore: 97,
    trustScore: 99,
    citationCount: 320,
    avgCitationWeight: 0.96,
    languages: ["英文"],
    topics: ["医学", "生命科学", "临床研究"],
    status: "active",
  },
  {
    id: "8",
    name: "艾瑞咨询",
    url: "https://iresearch.cn",
    category: "市场研究",
    authorityScore: 82,
    trustScore: 85,
    citationCount: 280,
    avgCitationWeight: 0.78,
    languages: ["中文"],
    topics: ["互联网", "电商", "数字营销"],
    status: "active",
  },
];

export default function CitationSourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSources = mockCitationSources.filter((source) => {
    const matchesSearch =
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || source.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockCitationSources.length,
    avgAuthority: Math.round(
      mockCitationSources.reduce((sum, s) => sum + s.authorityScore, 0) / mockCitationSources.length,
    ),
    totalCitations: mockCitationSources.reduce((sum, s) => sum + s.citationCount, 0),
    active: mockCitationSources.filter((s) => s.status === "active").length,
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">引用源管理</h1>
          <p className="text-muted-foreground mt-1">管理GEO优化的权威引用来源，提升AI平台的品牌可信度</p>
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
                添加引用源
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加引用源</DialogTitle>
                <DialogDescription>添加新的权威引用来源</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>来源名称</Label>
                  <Input placeholder="如：Wikipedia" />
                </div>
                <div className="grid gap-2">
                  <Label>来源地址</Label>
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
                        <SelectItem value="encyclopedia">百科全书</SelectItem>
                        <SelectItem value="academic">学术搜索</SelectItem>
                        <SelectItem value="business">商业数据库</SelectItem>
                        <SelectItem value="statistics">数据统计</SelectItem>
                        <SelectItem value="news">新闻媒体</SelectItem>
                        <SelectItem value="research">市场研究</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>权威分数</Label>
                    <Input type="number" placeholder="0-100" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>适用主题</Label>
                  <Input placeholder="如：科技, 商业, 创业（逗号分隔）" />
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
            <CardTitle className="text-sm font-medium text-muted-foreground">引用源总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均权威分数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgAuthority}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总引用次数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCitations.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">可用来源</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索引用源名称或地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            <SelectItem value="百科全书">百科全书</SelectItem>
            <SelectItem value="学术搜索">学术搜索</SelectItem>
            <SelectItem value="商业数据库">商业数据库</SelectItem>
            <SelectItem value="数据统计">数据统计</SelectItem>
            <SelectItem value="新闻媒体">新闻媒体</SelectItem>
            <SelectItem value="市场研究">市场研究</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 引用源列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>引用源</TableHead>
              <TableHead>分类</TableHead>
              <TableHead className="text-center">权威分数</TableHead>
              <TableHead className="text-center">信任分数</TableHead>
              <TableHead className="text-center">引用次数</TableHead>
              <TableHead>适用主题</TableHead>
              <TableHead className="text-center">状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSources.map((source) => (
              <TableRow key={source.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Link className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {source.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{source.category}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span
                      className={
                        source.authorityScore >= 95
                          ? "text-green-600 font-medium"
                          : source.authorityScore >= 85
                            ? "text-blue-600"
                            : ""
                      }
                    >
                      {source.authorityScore}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      source.trustScore >= 95
                        ? "text-green-600 font-medium"
                        : source.trustScore >= 85
                          ? "text-blue-600"
                          : ""
                    }
                  >
                    {source.trustScore}
                  </span>
                </TableCell>
                <TableCell className="text-center">{source.citationCount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {source.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {source.status === "active" ? (
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
                      <DropdownMenuItem>查看引用记录</DropdownMenuItem>
                      <DropdownMenuItem>测试引用</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">禁用来源</DropdownMenuItem>
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

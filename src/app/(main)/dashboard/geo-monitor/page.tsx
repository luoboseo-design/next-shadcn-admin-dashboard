"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Activity,
  AlertCircle,
  Calendar,
  ChevronDown,
  ExternalLink,
  Eye,
  Filter,
  Globe,
  MessageSquare,
  Minus,
  RefreshCw,
  Search,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// 模拟任务数据
const mockTasks = [
  {
    id: "GEO-001",
    domain: "example.com",
    brandName: "Example",
    createdAt: "2024-01-15",
    status: "monitoring",
    keywords: [
      {
        keyword: "example产品怎么样",
        type: "query",
        platforms: {
          chatgpt: { rank: 3, change: 2, mentions: 5, sentiment: "positive" },
          perplexity: { rank: 1, change: 0, mentions: 8, sentiment: "positive" },
          gemini: { rank: 5, change: -1, mentions: 3, sentiment: "neutral" },
          deepseek: { rank: 2, change: 1, mentions: 6, sentiment: "positive" },
          doubao: { rank: 4, change: 3, mentions: 4, sentiment: "positive" },
        },
      },
      {
        keyword: "example",
        type: "brand",
        platforms: {
          chatgpt: { rank: 2, change: 1, mentions: 12, sentiment: "positive" },
          perplexity: { rank: 1, change: 0, mentions: 15, sentiment: "positive" },
          gemini: { rank: 3, change: 0, mentions: 8, sentiment: "neutral" },
          deepseek: { rank: 1, change: 2, mentions: 10, sentiment: "positive" },
          doubao: { rank: 2, change: 1, mentions: 9, sentiment: "positive" },
        },
      },
      {
        keyword: "example vs 竞品",
        type: "comparison",
        platforms: {
          chatgpt: { rank: 4, change: -1, mentions: 3, sentiment: "neutral" },
          perplexity: { rank: 2, change: 1, mentions: 5, sentiment: "positive" },
          gemini: { rank: null, change: 0, mentions: 0, sentiment: "none" },
          deepseek: { rank: 3, change: 0, mentions: 4, sentiment: "neutral" },
          doubao: { rank: 5, change: -2, mentions: 2, sentiment: "negative" },
        },
      },
    ],
  },
  {
    id: "GEO-002",
    domain: "myshop.cn",
    brandName: "MyShop",
    createdAt: "2024-01-20",
    status: "monitoring",
    keywords: [
      {
        keyword: "myshop电商平台",
        type: "brand",
        platforms: {
          chatgpt: { rank: 5, change: 0, mentions: 2, sentiment: "neutral" },
          perplexity: { rank: 3, change: 2, mentions: 4, sentiment: "positive" },
          gemini: { rank: null, change: 0, mentions: 0, sentiment: "none" },
          deepseek: { rank: 2, change: 3, mentions: 7, sentiment: "positive" },
          doubao: { rank: 1, change: 1, mentions: 9, sentiment: "positive" },
        },
      },
    ],
  },
];

const platformConfig = {
  chatgpt: { name: "ChatGPT", color: "bg-green-500" },
  perplexity: { name: "Perplexity", color: "bg-blue-500" },
  gemini: { name: "Gemini", color: "bg-purple-500" },
  deepseek: { name: "DeepSeek", color: "bg-cyan-500" },
  doubao: { name: "豆包", color: "bg-orange-500" },
};

const keywordTypeLabels = {
  brand: "品牌词",
  query: "问答词",
  comparison: "对比词",
  longtail: "长尾词",
};

export default function GeoMonitorPage() {
  const [selectedTask, setSelectedTask] = useState(mockTasks[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState("7d");

  // 计算总体统计
  const calculateOverallStats = () => {
    let totalKeywords = 0;
    let avgRank = 0;
    let rankCount = 0;
    let improvedCount = 0;
    let declinedCount = 0;

    selectedTask.keywords.forEach((kw) => {
      totalKeywords++;
      Object.values(kw.platforms).forEach((p) => {
        if (p.rank !== null) {
          avgRank += p.rank;
          rankCount++;
          if (p.change > 0) improvedCount++;
          if (p.change < 0) declinedCount++;
        }
      });
    });

    return {
      totalKeywords,
      avgRank: rankCount > 0 ? (avgRank / rankCount).toFixed(1) : "-",
      improvedCount,
      declinedCount,
      visibilityScore: Math.round((rankCount / (totalKeywords * 5)) * 100),
    };
  };

  const stats = calculateOverallStats();

  const filteredKeywords = selectedTask.keywords.filter((kw) =>
    kw.keyword.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            GEO 效果监控
          </h1>
          <p className="text-muted-foreground mt-1">追踪你的关键词在各 AI 平台的排名和引用情况</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </Button>
          <Button asChild>
            <Link href="/dashboard/services/geo">
              <Globe className="h-4 w-4 mr-2" />
              创建新任务
            </Link>
          </Button>
        </div>
      </div>

      {/* 任务选择器 */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Select
                value={selectedTask.id}
                onValueChange={(v) => {
                  const task = mockTasks.find((t) => t.id === v);
                  if (task) setSelectedTask(task);
                }}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{task.brandName}</span>
                        <span className="text-muted-foreground text-xs">{task.domain}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                监控中
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              创建于 {selectedTask.createdAt}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">监控关键词</p>
                <p className="text-2xl font-bold">{stats.totalKeywords}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均排名</p>
                <p className="text-2xl font-bold">{stats.avgRank}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">排名上升</p>
                <p className="text-2xl font-bold text-green-600">+{stats.improvedCount}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI 可见性</p>
                <p className="text-2xl font-bold">{stats.visibilityScore}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 关键词监控表格 */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>关键词排名追踪</CardTitle>
              <CardDescription>各平台的排名变化和引用情况</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索关键词..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">近 7 天</SelectItem>
                  <SelectItem value="30d">近 30 天</SelectItem>
                  <SelectItem value="90d">近 90 天</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">关键词</TableHead>
                  <TableHead className="text-center">类型</TableHead>
                  {Object.entries(platformConfig).map(([key, config]) => (
                    <TableHead key={key} className="text-center min-w-[100px]">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className={cn("w-2 h-2 rounded-full", config.color)} />
                        {config.name}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeywords.map((kw, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{kw.keyword}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {keywordTypeLabels[kw.type as keyof typeof keywordTypeLabels] || kw.type}
                      </Badge>
                    </TableCell>
                    {Object.entries(platformConfig).map(([platformKey]) => {
                      const data = kw.platforms[platformKey as keyof typeof kw.platforms];
                      return (
                        <TableCell key={platformKey} className="text-center">
                          {data.rank !== null ? (
                            <div className="flex flex-col items-center gap-1">
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-lg">#{data.rank}</span>
                                {data.change > 0 && (
                                  <span className="flex items-center text-xs text-green-600">
                                    <TrendingUp className="h-3 w-3" />
                                    {data.change}
                                  </span>
                                )}
                                {data.change < 0 && (
                                  <span className="flex items-center text-xs text-red-600">
                                    <TrendingDown className="h-3 w-3" />
                                    {Math.abs(data.change)}
                                  </span>
                                )}
                                {data.change === 0 && (
                                  <span className="flex items-center text-xs text-muted-foreground">
                                    <Minus className="h-3 w-3" />
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MessageSquare className="h-3 w-3" />
                                {data.mentions}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">未收录</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 平台详情卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(platformConfig).map(([key, config]) => {
          const platformData = selectedTask.keywords.map((kw) => ({
            keyword: kw.keyword,
            ...kw.platforms[key as keyof typeof kw.platforms],
          }));
          const validData = platformData.filter((d) => d.rank !== null);
          const avgRank =
            validData.length > 0
              ? (validData.reduce((sum, d) => sum + (d.rank || 0), 0) / validData.length).toFixed(1)
              : "-";
          const totalMentions = platformData.reduce((sum, d) => sum + d.mentions, 0);

          return (
            <Card key={key}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", config.color)} />
                    <CardTitle className="text-base">{config.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {validData.length}/{selectedTask.keywords.length} 收录
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">平均排名</p>
                    <p className="text-xl font-bold">{avgRank}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">总引用次数</p>
                    <p className="text-xl font-bold">{totalMentions}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {validData.slice(0, 3).map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="truncate flex-1 mr-2">{d.keyword}</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">#{d.rank}</span>
                        {d.change > 0 && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {d.change < 0 && <TrendingDown className="h-3 w-3 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

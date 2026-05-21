"use client";

import { useState } from "react";

import { Bot, CheckCircle2, MoreHorizontal, Pause, Play, Plus, Search, Settings, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// AI平台配置数据
const mockAIPlatforms = [
  {
    id: "1",
    name: "ChatGPT",
    provider: "OpenAI",
    icon: "🤖",
    description: "GPT-4o 模型，支持网页搜索和实时数据",
    apiEndpoint: "https://api.openai.com/v1",
    model: "gpt-4o",
    features: ["关键词优化", "品牌提及", "引用建设"],
    monthlyQuota: 10000,
    usedQuota: 6500,
    costPerQuery: 0.03,
    avgResponseTime: "2.5s",
    successRate: 94,
    status: "active",
    lastSync: "2024-01-25 14:30",
  },
  {
    id: "2",
    name: "Perplexity",
    provider: "Perplexity AI",
    icon: "🔍",
    description: "实时搜索AI，擅长引用权威来源",
    apiEndpoint: "https://api.perplexity.ai",
    model: "pplx-70b-online",
    features: ["实时搜索", "引用生成", "来源追踪"],
    monthlyQuota: 5000,
    usedQuota: 2800,
    costPerQuery: 0.02,
    avgResponseTime: "3.2s",
    successRate: 92,
    status: "active",
    lastSync: "2024-01-25 14:25",
  },
  {
    id: "3",
    name: "Claude",
    provider: "Anthropic",
    icon: "🎭",
    description: "Claude 3.5 Sonnet，内容创作和分析",
    apiEndpoint: "https://api.anthropic.com/v1",
    model: "claude-3-5-sonnet",
    features: ["内容生成", "品牌分析", "竞品研究"],
    monthlyQuota: 8000,
    usedQuota: 4200,
    costPerQuery: 0.025,
    avgResponseTime: "2.8s",
    successRate: 96,
    status: "active",
    lastSync: "2024-01-25 14:20",
  },
  {
    id: "4",
    name: "Gemini",
    provider: "Google",
    icon: "✨",
    description: "Gemini Pro，多模态理解和生成",
    apiEndpoint: "https://generativelanguage.googleapis.com",
    model: "gemini-pro",
    features: ["多模态分析", "搜索优化", "内容理解"],
    monthlyQuota: 6000,
    usedQuota: 1500,
    costPerQuery: 0.015,
    avgResponseTime: "2.2s",
    successRate: 90,
    status: "active",
    lastSync: "2024-01-25 14:15",
  },
  {
    id: "5",
    name: "Bing Chat",
    provider: "Microsoft",
    icon: "🌐",
    description: "Bing搜索增强AI，实时网络数据",
    apiEndpoint: "https://api.bing.microsoft.com",
    model: "gpt-4-bing",
    features: ["网络搜索", "新闻追踪", "实时数据"],
    monthlyQuota: 3000,
    usedQuota: 800,
    costPerQuery: 0.01,
    avgResponseTime: "4.0s",
    successRate: 88,
    status: "paused",
    lastSync: "2024-01-24 10:00",
  },
];

export default function AIPlatformsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPlatforms = mockAIPlatforms.filter(
    (platform) =>
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.provider.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const stats = {
    total: mockAIPlatforms.length,
    active: mockAIPlatforms.filter((p) => p.status === "active").length,
    totalQuota: mockAIPlatforms.reduce((sum, p) => sum + p.monthlyQuota, 0),
    usedQuota: mockAIPlatforms.reduce((sum, p) => sum + p.usedQuota, 0),
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI 平台配置</h1>
          <p className="text-muted-foreground mt-1">配置GEO优化使用的AI平台，管理API额度和调用策略</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加平台
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>添加AI平台</DialogTitle>
              <DialogDescription>配置新的AI平台接入</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>平台名称</Label>
                <Input placeholder="如：ChatGPT" />
              </div>
              <div className="grid gap-2">
                <Label>提供商</Label>
                <Input placeholder="如：OpenAI" />
              </div>
              <div className="grid gap-2">
                <Label>API 端点</Label>
                <Input placeholder="https://api.example.com/v1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>模型名称</Label>
                  <Input placeholder="如：gpt-4o" />
                </div>
                <div className="grid gap-2">
                  <Label>月度额度</Label>
                  <Input type="number" placeholder="10000" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="sk-..." />
              </div>
              <div className="grid gap-2">
                <Label>平台描述</Label>
                <Textarea placeholder="描述该平台的特点和用途" />
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

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平台总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">运行中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">月度总额度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuota.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">已使用额度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.usedQuota.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                ({Math.round((stats.usedQuota / stats.totalQuota) * 100)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索 */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索平台名称或提供商..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* 平台卡片列表 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlatforms.map((platform) => (
          <Card key={platform.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                    {platform.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{platform.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {platform.provider} / {platform.model}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      配置参数
                    </DropdownMenuItem>
                    <DropdownMenuItem>测试连接</DropdownMenuItem>
                    <DropdownMenuItem>查看日志</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">删除平台</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{platform.description}</p>

              {/* 功能标签 */}
              <div className="flex flex-wrap gap-1">
                {platform.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* 额度进度条 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">额度使用</span>
                  <span>
                    {platform.usedQuota.toLocaleString()} / {platform.monthlyQuota.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      platform.usedQuota / platform.monthlyQuota > 0.8
                        ? "bg-red-500"
                        : platform.usedQuota / platform.monthlyQuota > 0.6
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${(platform.usedQuota / platform.monthlyQuota) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* 统计数据 */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-muted/50 rounded">
                  <div className="text-xs text-muted-foreground">成功率</div>
                  <div className="font-medium text-green-600">{platform.successRate}%</div>
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  <div className="text-xs text-muted-foreground">响应时间</div>
                  <div className="font-medium">{platform.avgResponseTime}</div>
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  <div className="text-xs text-muted-foreground">单价</div>
                  <div className="font-medium">${platform.costPerQuery}</div>
                </div>
              </div>

              {/* 状态和操作 */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  {platform.status === "active" ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      运行中
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      <Pause className="h-3 w-3 mr-1" />
                      已暂停
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">启用</span>
                  <Switch checked={platform.status === "active"} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

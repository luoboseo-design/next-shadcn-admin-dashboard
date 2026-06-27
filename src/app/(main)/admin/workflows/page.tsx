"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  GitBranch,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// 工作流配置数据
const workflows = [
  {
    id: "wf-seo-backlink",
    name: "SEO 外链代发",
    description: "自动注册账号、撰写内容、发布外链",
    service: "SEO 服务",
    status: "running",
    enabled: true,
    steps: [
      { name: "选择平台", description: "根据订单要求选择合适的博客/论坛" },
      { name: "账号获取", description: "从账号池获取可用账号，或自动注册新账号" },
      { name: "内容生成", description: "AI 根据关键词和锚文本生成原创内容" },
      { name: "内容发布", description: "自动登录并发布内容" },
      { name: "链接验证", description: "验证发布成功并获取链接地址" },
      { name: "结果同步", description: "更新订单状态，同步到用户后台" },
    ],
    stats: {
      todayCompleted: 45,
      successRate: 96,
      avgTime: "8分钟",
      queuedJobs: 38,
      runningJobs: 12,
    },
    config: {
      maxConcurrent: 10,
      retryCount: 3,
      retryDelay: 60,
      timeout: 300,
    },
  },
  {
    id: "wf-seo-guest",
    name: "客座文章发布",
    description: "联系媒体、提交文章、跟进发布",
    service: "SEO 服务",
    status: "running",
    enabled: true,
    steps: [
      { name: "媒体匹配", description: "根据 DA/DR 要求匹配合适媒体" },
      { name: "文章撰写", description: "AI 生成高质量客座文章" },
      { name: "提交审核", description: "提交文章到目标媒体" },
      { name: "跟进发布", description: "跟进审核状态直到发布" },
      { name: "链接获取", description: "获取发布链接并验证" },
      { name: "结果同步", description: "更新订单状态" },
    ],
    stats: {
      todayCompleted: 8,
      successRate: 92,
      avgTime: "2-5天",
      queuedJobs: 15,
      runningJobs: 5,
    },
    config: {
      maxConcurrent: 5,
      retryCount: 2,
      retryDelay: 3600,
      timeout: 86400,
    },
  },
  {
    id: "wf-geo-keyword",
    name: "GEO 关键词优化",
    description: "优化品牌在 AI 搜索引擎中的曝光",
    service: "GEO 服务",
    status: "running",
    enabled: true,
    steps: [
      { name: "关键词分析", description: "分析目标关键词和竞争情况" },
      { name: "引用建设", description: "在权威来源创建品牌引用" },
      { name: "内容优化", description: "优化现有内容结构" },
      { name: "效果监控", description: "监控 AI 搜索结果变化" },
    ],
    stats: {
      todayCompleted: 12,
      successRate: 88,
      avgTime: "持续优化",
      queuedJobs: 8,
      runningJobs: 3,
    },
    config: {
      maxConcurrent: 3,
      retryCount: 5,
      retryDelay: 1800,
      timeout: 7200,
    },
  },
  {
    id: "wf-social-reddit",
    name: "Reddit 自动发帖",
    description: "自动在相关 Subreddit 发布内容",
    service: "社交媒体",
    status: "paused",
    enabled: false,
    steps: [
      { name: "Subreddit 选择", description: "根据内容选择合适的 Subreddit" },
      { name: "账号准备", description: "使用养号完成的 Reddit 账号" },
      { name: "内容生成", description: "生成符合社区规则的内容" },
      { name: "发布执行", description: "选择合适时间发布" },
      { name: "互动维护", description: "回复评论，维护帖子" },
    ],
    stats: {
      todayCompleted: 0,
      successRate: 91,
      avgTime: "15分钟",
      queuedJobs: 23,
      runningJobs: 0,
    },
    config: {
      maxConcurrent: 5,
      retryCount: 2,
      retryDelay: 300,
      timeout: 600,
    },
  },
  {
    id: "wf-news-release",
    name: "新闻稿发布",
    description: "向新闻媒体提交和发布新闻稿",
    service: "发稿服务",
    status: "running",
    enabled: true,
    steps: [
      { name: "稿件准备", description: "格式化新闻稿内容" },
      { name: "媒体分发", description: "向目标媒体提交新闻稿" },
      { name: "发布跟进", description: "跟进发布状态" },
      { name: "链接收集", description: "收集所有发布链接" },
    ],
    stats: {
      todayCompleted: 6,
      successRate: 95,
      avgTime: "1-3天",
      queuedJobs: 4,
      runningJobs: 2,
    },
    config: {
      maxConcurrent: 3,
      retryCount: 2,
      retryDelay: 3600,
      timeout: 172800,
    },
  },
];

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filteredWorkflows = workflows.filter((wf) => {
    const matchesSearch = wf.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = serviceFilter === "all" || wf.service === serviceFilter;
    return matchesSearch && matchesService;
  });

  const services = [...new Set(workflows.map((wf) => wf.service))];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">工作流配置</h1>
          <p className="text-muted-foreground mt-1">配置和管理自动化工作流</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          新建工作流
        </Button>
      </div>

      {/* 概览统计 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Play className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">运行中</p>
                <p className="text-xl font-bold">{workflows.filter((w) => w.status === "running").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Pause className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">已暂停</p>
                <p className="text-xl font-bold">{workflows.filter((w) => w.status === "paused").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">队列任务</p>
                <p className="text-xl font-bold">{workflows.reduce((acc, w) => acc + w.stats.queuedJobs, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">今日完成</p>
                <p className="text-xl font-bold">{workflows.reduce((acc, w) => acc + w.stats.todayCompleted, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选 */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索工作流..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="服务类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部服务</SelectItem>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 工作流列表 */}
      <div className="grid gap-4">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        workflow.status === "running" ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                      }`}
                    >
                      <GitBranch
                        className={`h-5 w-5 ${
                          workflow.status === "running" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{workflow.name}</h3>
                        <Badge variant={workflow.status === "running" ? "default" : "secondary"}>
                          {workflow.status === "running" ? "运行中" : "已暂停"}
                        </Badge>
                        <Badge variant="outline">{workflow.service}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{workflow.description}</p>
                    </div>
                  </div>

                  {/* 工作流步骤 */}
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {workflow.steps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="px-3 py-1 bg-muted rounded-full text-xs">{step.name}</div>
                        {index < workflow.steps.length - 1 && <div className="w-4 h-px bg-border mx-1" />}
                      </div>
                    ))}
                  </div>

                  {/* 统计数据 */}
                  <div className="mt-4 flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">执行中:</span>
                      <span className="font-medium">{workflow.stats.runningJobs}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">队列:</span>
                      <span className="font-medium">{workflow.stats.queuedJobs}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">今日完成:</span>
                      <span className="font-medium">{workflow.stats.todayCompleted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">成功率:</span>
                      <span
                        className={`font-medium ${
                          workflow.stats.successRate >= 90 ? "text-green-600" : "text-amber-600"
                        }`}
                      >
                        {workflow.stats.successRate}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">平均耗时:</span>
                      <span className="font-medium">{workflow.stats.avgTime}</span>
                    </div>
                  </div>
                </div>

                {/* 操作区域 */}
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">启用</span>
                    <Switch checked={workflow.enabled} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        配置
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>编辑工作流</DropdownMenuItem>
                      <DropdownMenuItem>配置参数</DropdownMenuItem>
                      <DropdownMenuItem>查看执行日志</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {workflow.status === "running" ? (
                        <DropdownMenuItem className="text-amber-600">
                          <Pause className="h-4 w-4 mr-2" />
                          暂停工作流
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <Play className="h-4 w-4 mr-2" />
                          启动工作流
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Share2,
  MessageSquare,
  Heart,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  Loader2,
  Eye,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  Filter,
  Plus,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  RefreshCw,
  BarChart3,
  ThumbsUp,
  Repeat,
  Link2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// 模拟社交媒体任务数据
const socialTasks = [
  {
    id: "SM-001",
    name: "Reddit 产品推广计划",
    platform: "reddit",
    serviceType: "post",
    targetUrl: "https://reddit.com/r/technology",
    keywords: ["AI工具", "效率提升", "自动化"],
    status: "completed",
    progress: 100,
    createdAt: "2024-01-15",
    completedAt: "2024-01-20",
    quantity: 5,
    completedQuantity: 5,
    engagement: {
      views: 12500,
      upvotes: 856,
      comments: 124,
      shares: 45,
    },
    posts: [
      { id: 1, title: "AI工具如何提升工作效率", url: "https://reddit.com/r/technology/abc", upvotes: 234, comments: 45, status: "published" },
      { id: 2, title: "自动化工作流程实战分享", url: "https://reddit.com/r/productivity/def", upvotes: 189, comments: 32, status: "published" },
      { id: 3, title: "2024年必备的效率工具", url: "https://reddit.com/r/tools/ghi", upvotes: 156, comments: 28, status: "published" },
      { id: 4, title: "从繁琐到高效的转变", url: "https://reddit.com/r/workflow/jkl", upvotes: 145, comments: 12, status: "published" },
      { id: 5, title: "AI自动化的真实体验", url: "https://reddit.com/r/ai/mno", upvotes: 132, comments: 7, status: "published" },
    ],
  },
  {
    id: "SM-002",
    name: "Instagram 品牌曝光",
    platform: "instagram",
    serviceType: "follower",
    targetUrl: "https://instagram.com/mybrand",
    keywords: ["品牌建设", "社交营销"],
    status: "in_progress",
    progress: 65,
    createdAt: "2024-01-18",
    completedAt: null,
    quantity: 1000,
    completedQuantity: 650,
    engagement: {
      views: 0,
      upvotes: 0,
      comments: 0,
      shares: 0,
    },
    posts: [],
  },
  {
    id: "SM-003",
    name: "X/Twitter 互动提升",
    platform: "x",
    serviceType: "like",
    targetUrl: "https://x.com/mybrand/status/123456",
    keywords: ["产品发布", "新功能"],
    status: "in_progress",
    progress: 40,
    createdAt: "2024-01-20",
    completedAt: null,
    quantity: 500,
    completedQuantity: 200,
    engagement: {
      views: 8500,
      upvotes: 200,
      comments: 45,
      shares: 12,
    },
    posts: [],
  },
  {
    id: "SM-004",
    name: "Reddit 评论互动",
    platform: "reddit",
    serviceType: "comment",
    targetUrl: "https://reddit.com/r/startup/xyz",
    keywords: ["创业", "SaaS"],
    status: "pending",
    progress: 0,
    createdAt: "2024-01-22",
    completedAt: null,
    quantity: 20,
    completedQuantity: 0,
    engagement: {
      views: 0,
      upvotes: 0,
      comments: 0,
      shares: 0,
    },
    posts: [],
  },
  {
    id: "SM-005",
    name: "Instagram 帖子点赞",
    platform: "instagram",
    serviceType: "like",
    targetUrl: "https://instagram.com/p/abc123",
    keywords: ["产品展示"],
    status: "completed",
    progress: 100,
    createdAt: "2024-01-10",
    completedAt: "2024-01-12",
    quantity: 300,
    completedQuantity: 300,
    engagement: {
      views: 5200,
      upvotes: 300,
      comments: 28,
      shares: 8,
    },
    posts: [],
  },
];

// 平台配置
const platformConfig: Record<string, { name: string; color: string; bg: string; label: string }> = {
  reddit: { name: "Reddit", color: "text-orange-500", bg: "bg-orange-500", label: "R" },
  instagram: { name: "Instagram", color: "text-pink-500", bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500", label: "IG" },
  x: { name: "X (Twitter)", color: "text-foreground", bg: "bg-black", label: "X" },
};

// 服务类型配置
const serviceTypeConfig: Record<string, { name: string; icon: React.ElementType; unit: string }> = {
  post: { name: "发帖", icon: FileText, unit: "篇" },
  comment: { name: "评论", icon: MessageSquare, unit: "条" },
  like: { name: "点赞", icon: Heart, unit: "个" },
  follower: { name: "粉丝", icon: Users, unit: "人" },
};

// 状态配置
const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "待处理", color: "bg-muted text-muted-foreground", icon: Clock },
  in_progress: { label: "进行中", color: "bg-blue-500/10 text-blue-500", icon: Loader2 },
  completed: { label: "已完成", color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle2 },
  failed: { label: "失败", color: "bg-red-500/10 text-red-500", icon: Clock },
};

export default function SocialMonitorPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  // 选择处理
  const toggleTaskSelection = (id: string) => {
    setSelectedTasks((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleAllTasks = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map((t) => t.id));
    }
  };

  // 过滤任务
  const filteredTasks = socialTasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    if (platformFilter !== "all" && task.platform !== platformFilter) return false;
    if (activeTab !== "all" && task.serviceType !== activeTab) return false;
    return true;
  });

  // 统计数据
  const stats = {
    total: socialTasks.length,
    completed: socialTasks.filter((t) => t.status === "completed").length,
    inProgress: socialTasks.filter((t) => t.status === "in_progress").length,
    pending: socialTasks.filter((t) => t.status === "pending").length,
    totalViews: socialTasks.reduce((acc, t) => acc + t.engagement.views, 0),
    totalEngagement: socialTasks.reduce((acc, t) => acc + t.engagement.upvotes + t.engagement.comments + t.engagement.shares, 0),
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 页面头部 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Share2 className="h-7 w-7 text-primary" />
            社交媒体监控
          </h1>
          <p className="text-muted-foreground mt-1">追踪社交媒体任务的执行进度和互动效果</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </Button>
          <Link href="/dashboard/services/social">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              创建任务
            </Button>
          </Link>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总任务数</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">进行中</p>
                <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已完成</p>
                <p className="text-2xl font-bold text-emerald-500">{stats.completed}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总互动量</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{stats.totalEngagement.toLocaleString()}</span>
                  <span className="flex items-center text-xs text-emerald-500">
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                    +18%
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs 和筛选 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              全部
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {socialTasks.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="post" className="gap-2">
              <FileText className="h-4 w-4" />
              发帖
            </TabsTrigger>
            <TabsTrigger value="like" className="gap-2">
              <Heart className="h-4 w-4" />
              点赞
            </TabsTrigger>
            <TabsTrigger value="comment" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              评论
            </TabsTrigger>
            <TabsTrigger value="follower" className="gap-2">
              <Users className="h-4 w-4" />
              粉丝
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="平台筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部平台</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="x">X (Twitter)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="in_progress">进行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {/* 批量操作栏 */}
          {selectedTasks.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border mb-4">
              <span className="text-sm text-muted-foreground">已选择 {selectedTasks.length} 项</span>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  导出报告
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  删除
                </Button>
              </div>
            </div>
          )}

          {/* 任务列表 */}
          <div className="rounded-lg border overflow-hidden">
            {/* 表头 */}
            <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 border-b text-sm font-medium text-muted-foreground">
              <Checkbox
                checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                onCheckedChange={toggleAllTasks}
                className="h-4 w-4"
              />
              <div className="flex-1">任务名称</div>
              <div className="w-20 text-center hidden sm:block">平台</div>
              <div className="w-24 text-center hidden sm:block">类型</div>
              <div className="w-28 text-center hidden md:block">状态</div>
              <div className="w-32 text-center hidden md:block">进度</div>
              <div className="w-28 text-center hidden lg:block">互动数据</div>
              <div className="w-10" />
            </div>

            {/* 列表项 */}
            <div className="divide-y">
              {filteredTasks.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  暂无符合条件的任务
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const status = statusConfig[task.status];
                  const StatusIcon = status.icon;
                  const platform = platformConfig[task.platform];
                  const serviceType = serviceTypeConfig[task.serviceType];
                  const ServiceIcon = serviceType.icon;
                  const isSelected = selectedTasks.includes(task.id);
                  const isExpanded = expandedTask === task.id;

                  return (
                    <div key={task.id}>
                      <div
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/30",
                          isSelected && "bg-primary/5"
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleTaskSelection(task.id)}
                          className="h-4 w-4"
                        />

                        <div 
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium hover:text-primary transition-colors truncate">
                              {task.name}
                            </span>
                            <ArrowUpRight className={cn(
                              "h-3.5 w-3.5 text-muted-foreground transition-transform",
                              isExpanded && "rotate-90"
                            )} />
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span className="font-mono">{task.id}</span>
                            <span>·</span>
                            <span className="truncate max-w-[200px]">{task.targetUrl}</span>
                          </div>
                          {/* 移动端显示 */}
                          <div className="flex items-center gap-2 mt-2 sm:hidden">
                            <div className={cn("w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white", platform.bg)}>
                              {platform.label}
                            </div>
                            <Badge variant="secondary" className={cn("text-xs h-5", status.color)}>
                              <StatusIcon className={cn("h-3 w-3 mr-1", task.status === "in_progress" && "animate-spin")} />
                              {status.label}
                            </Badge>
                          </div>
                        </div>

                        {/* 平台 */}
                        <div className="w-20 hidden sm:flex justify-center">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white", platform.bg)}>
                            {platform.label}
                          </div>
                        </div>

                        {/* 类型 */}
                        <div className="w-24 hidden sm:flex justify-center">
                          <Badge variant="outline" className="gap-1">
                            <ServiceIcon className="h-3 w-3" />
                            {serviceType.name}
                          </Badge>
                        </div>

                        {/* 状态 */}
                        <div className="w-28 hidden md:flex justify-center">
                          <Badge variant="secondary" className={cn("text-xs", status.color)}>
                            <StatusIcon className={cn("h-3 w-3 mr-1", task.status === "in_progress" && "animate-spin")} />
                            {status.label}
                          </Badge>
                        </div>

                        {/* 进度 */}
                        <div className="w-32 hidden md:flex items-center gap-2 justify-center">
                          <Progress value={task.progress} className="w-16 h-1.5" />
                          <span className="text-xs text-muted-foreground w-16 text-right">
                            {task.completedQuantity}/{task.quantity}{serviceType.unit}
                          </span>
                        </div>

                        {/* 互动数据 */}
                        <div className="w-28 hidden lg:flex items-center justify-center gap-3 text-xs text-muted-foreground">
                          {task.engagement.views > 0 ? (
                            <>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {(task.engagement.views / 1000).toFixed(1)}k
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                {task.engagement.upvotes}
                              </span>
                            </>
                          ) : (
                            <span>-</span>
                          )}
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看报告</DropdownMenuItem>
                            <DropdownMenuItem>导出数据</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">删除任务</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* 展开详情 */}
                      {isExpanded && (
                        <div className="px-4 py-4 bg-muted/20 border-t">
                          <div className="grid gap-6 md:grid-cols-2">
                            {/* 任务信息 */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-sm">任务信息</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">目标链接</span>
                                  <a href={task.targetUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 truncate max-w-[200px]">
                                    {task.targetUrl.replace(/^https?:\/\//, '')}
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">关键词</span>
                                  <div className="flex gap-1">
                                    {task.keywords.map((kw) => (
                                      <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">创建时间</span>
                                  <span>{task.createdAt}</span>
                                </div>
                                {task.completedAt && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">完成时间</span>
                                    <span>{task.completedAt}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* 互动数据 */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-sm">互动数据</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-background border">
                                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                    <Eye className="h-3 w-3" />
                                    浏览量
                                  </div>
                                  <div className="text-lg font-semibold">{task.engagement.views.toLocaleString()}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-background border">
                                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    点赞数
                                  </div>
                                  <div className="text-lg font-semibold">{task.engagement.upvotes.toLocaleString()}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-background border">
                                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                    <MessageSquare className="h-3 w-3" />
                                    评论数
                                  </div>
                                  <div className="text-lg font-semibold">{task.engagement.comments.toLocaleString()}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-background border">
                                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                    <Repeat className="h-3 w-3" />
                                    分享数
                                  </div>
                                  <div className="text-lg font-semibold">{task.engagement.shares.toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 帖子列表（仅发帖任务显示） */}
                          {task.serviceType === "post" && task.posts.length > 0 && (
                            <div className="mt-6 space-y-3">
                              <h4 className="font-medium text-sm">发布内容</h4>
                              <div className="space-y-2">
                                {task.posts.map((post) => (
                                  <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-background border">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-medium">
                                        {post.id}
                                      </div>
                                      <div className="min-w-0">
                                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary truncate block">
                                          {post.title}
                                        </a>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                                      <span className="flex items-center gap-1">
                                        <ThumbsUp className="h-3 w-3" />
                                        {post.upvotes}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <MessageSquare className="h-3 w-3" />
                                        {post.comments}
                                      </span>
                                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
                                        已发布
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

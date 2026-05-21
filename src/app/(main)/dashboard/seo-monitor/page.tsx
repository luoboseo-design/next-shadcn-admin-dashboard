"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileEdit,
  Filter,
  Link2,
  Loader2,
  MoreHorizontal,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

// 模拟外链订单数据 - 添加任务名称作为核心
const backlinkOrders = [
  {
    id: "BL-001",
    name: "产品页面外链建设",
    targetUrl: "https://example.com/product",
    keyword: "产品推荐",
    anchorText: "最佳产品推荐",
    platforms: ["知乎", "简书", "CSDN"],
    status: "completed",
    progress: 100,
    createdAt: "2024-01-15",
    completedAt: "2024-01-20",
    linksBuilt: 15,
    linksTarget: 15,
    avgDa: 45,
  },
  {
    id: "BL-002",
    name: "服务页面权重提升",
    targetUrl: "https://example.com/service",
    keyword: "SEO服务",
    anchorText: "专业服务商",
    platforms: ["百度贴吧", "天涯论坛", "豆瓣"],
    status: "in_progress",
    progress: 60,
    createdAt: "2024-01-18",
    completedAt: null,
    linksBuilt: 9,
    linksTarget: 15,
    avgDa: 38,
  },
  {
    id: "BL-003",
    name: "博客内容推广计划",
    targetUrl: "https://example.com/blog",
    keyword: "",
    anchorText: "行业深度分析",
    platforms: ["Medium", "Dev.to", "Hashnode"],
    status: "pending",
    progress: 0,
    createdAt: "2024-01-22",
    completedAt: null,
    linksBuilt: 0,
    linksTarget: 20,
    avgDa: 0,
  },
  {
    id: "BL-004",
    name: "工具页 SEO 优化",
    targetUrl: "https://example.com/tool",
    keyword: "在线工具",
    anchorText: "免费在线工具",
    platforms: ["知乎", "简书"],
    status: "in_progress",
    progress: 40,
    createdAt: "2024-01-20",
    completedAt: null,
    linksBuilt: 8,
    linksTarget: 20,
    avgDa: 32,
  },
];

// 模拟客座文章订单数据 - 套餐形式
const guestPostOrders = [
  {
    id: "GA-001",
    name: "SaaS 行业趋势分析",
    title: "2024年SaaS行业十大趋势预测",
    packageName: "5媒体套餐",
    mediaCount: 5,
    completedCount: 5,
    status: "published",
    progress: 100,
    createdAt: "2024-01-10",
    publishedAt: "2024-01-24",
    avgDr: 81,
  },
  {
    id: "GA-002",
    name: "AI 技术应用案例",
    title: "企业如何利用AI提升效率",
    packageName: "3媒体套餐",
    mediaCount: 3,
    completedCount: 1,
    status: "review",
    progress: 66,
    createdAt: "2024-01-18",
    publishedAt: null,
    avgDr: 85,
  },
  {
    id: "GA-003",
    name: "数字营销策略指南",
    title: "2024数字营销完整指南",
    packageName: "10媒体套餐",
    mediaCount: 10,
    completedCount: 0,
    status: "writing",
    progress: 30,
    createdAt: "2024-01-22",
    publishedAt: null,
    avgDr: 0,
  },
  {
    id: "GA-004",
    name: "远程工作最佳实践",
    title: "",
    packageName: "5媒体套餐",
    mediaCount: 5,
    completedCount: 0,
    status: "pending",
    progress: 0,
    createdAt: "2024-01-25",
    publishedAt: null,
    avgDr: 0,
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: {
    label: "待处理",
    color: "bg-muted text-muted-foreground",
    icon: Clock,
  },
  in_progress: {
    label: "进行中",
    color: "bg-blue-500/10 text-blue-500",
    icon: Loader2,
  },
  completed: {
    label: "已完成",
    color: "bg-emerald-500/10 text-emerald-500",
    icon: CheckCircle2,
  },
  writing: {
    label: "撰写中",
    color: "bg-amber-500/10 text-amber-500",
    icon: FileEdit,
  },
  review: {
    label: "审核中",
    color: "bg-purple-500/10 text-purple-500",
    icon: Eye,
  },
  published: {
    label: "已发布",
    color: "bg-emerald-500/10 text-emerald-500",
    icon: CheckCircle2,
  },
};

export default function SEOMonitorPage() {
  const [activeTab, setActiveTab] = useState("backlinks");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBacklinks, setSelectedBacklinks] = useState<string[]>([]);
  const [selectedGuestPosts, setSelectedGuestPosts] = useState<string[]>([]);

  // 选择处理
  const toggleBacklinkSelection = (id: string) => {
    setSelectedBacklinks((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleGuestPostSelection = (id: string) => {
    setSelectedGuestPosts((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleAllBacklinks = () => {
    if (selectedBacklinks.length === backlinkOrders.length) {
      setSelectedBacklinks([]);
    } else {
      setSelectedBacklinks(backlinkOrders.map((o) => o.id));
    }
  };

  const toggleAllGuestPosts = () => {
    if (selectedGuestPosts.length === guestPostOrders.length) {
      setSelectedGuestPosts([]);
    } else {
      setSelectedGuestPosts(guestPostOrders.map((o) => o.id));
    }
  };

  // 统计数据
  const backlinkStats = {
    total: backlinkOrders.length,
    completed: backlinkOrders.filter((o) => o.status === "completed").length,
    inProgress: backlinkOrders.filter((o) => o.status === "in_progress").length,
    totalLinks: backlinkOrders.reduce((acc, o) => acc + o.linksBuilt, 0),
  };

  const guestPostStats = {
    total: guestPostOrders.length,
    published: guestPostOrders.filter((o) => o.status === "published").length,
    pending: guestPostOrders.filter((o) => o.status !== "published").length,
    totalPlatforms: guestPostOrders.reduce((acc, o) => acc + o.mediaCount, 0),
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">SEO 监控</h1>
          <p className="text-sm text-muted-foreground">追踪外链代发和客座文章订单的执行进度与效果</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1.5" />
            筛选
          </Button>
          <Link href="/dashboard/services/seo">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              新建订单
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs 切换 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="backlinks" className="gap-2">
              <Link2 className="h-4 w-4" />
              外链代发
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {backlinkOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="guest-posts" className="gap-2">
              <FileEdit className="h-4 w-4" />
              客座文章
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {guestPostOrders.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9">
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

        {/* 外链代发 */}
        <TabsContent value="backlinks" className="space-y-6">
          {/* 统计卡片 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">总订单数</div>
              <div className="mt-1 text-2xl font-semibold">{backlinkStats.total}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">进行中</div>
              <div className="mt-1 text-2xl font-semibold text-blue-500">{backlinkStats.inProgress}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">已完成</div>
              <div className="mt-1 text-2xl font-semibold text-emerald-500">{backlinkStats.completed}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">已建外链</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-semibold">{backlinkStats.totalLinks}</span>
                <span className="flex items-center text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +12%
                </span>
              </div>
            </div>
          </div>

          {/* 批量操作栏 */}
          {selectedBacklinks.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
              <span className="text-sm text-muted-foreground">已选择 {selectedBacklinks.length} 项</span>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  导出
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  删除
                </Button>
              </div>
            </div>
          )}

          {/* 订单列表 */}
          <div className="rounded-lg border overflow-hidden">
            {/* 表头 */}
            <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 border-b text-sm font-medium text-muted-foreground">
              <Checkbox
                checked={selectedBacklinks.length === backlinkOrders.length && backlinkOrders.length > 0}
                onCheckedChange={toggleAllBacklinks}
                className="h-4 w-4"
              />
              <div className="flex-1">任务名称</div>
              <div className="w-28 text-center hidden sm:block">状态</div>
              <div className="w-32 text-center hidden md:block">进度</div>
              <div className="w-20 text-center hidden lg:block">DA</div>
              <div className="w-10" />
            </div>

            {/* 列表项 */}
            <div className="divide-y">
              {backlinkOrders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                const isSelected = selectedBacklinks.includes(order.id);

                return (
                  <div
                    key={order.id}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/30",
                      isSelected && "bg-primary/5",
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleBacklinkSelection(order.id)}
                      className="h-4 w-4"
                    />

                    <Link href={`/dashboard/tasks/${order.id}`} className="flex-1 min-w-0 group">
                      <div className="flex items-center gap-2">
                        <span className="font-medium group-hover:text-primary transition-colors truncate">
                          {order.name}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="font-mono">{order.id}</span>
                        {order.keyword && (
                          <>
                            <span>·</span>
                            <span className="text-primary/80 font-medium">{order.keyword}</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="truncate">{order.targetUrl}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground sm:hidden">
                        <Badge variant="secondary" className={cn("text-xs h-5", status.color)}>
                          <StatusIcon
                            className={cn("h-3 w-3 mr-1", order.status === "in_progress" && "animate-spin")}
                          />
                          {status.label}
                        </Badge>
                        <span>
                          {order.linksBuilt}/{order.linksTarget}
                        </span>
                      </div>
                    </Link>

                    <div className="w-28 hidden sm:flex justify-center">
                      <Badge variant="secondary" className={cn("text-xs", status.color)}>
                        <StatusIcon className={cn("h-3 w-3 mr-1", order.status === "in_progress" && "animate-spin")} />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="w-32 hidden md:flex items-center gap-2 justify-center">
                      <Progress value={order.progress} className="w-16 h-1.5" />
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {order.linksBuilt}/{order.linksTarget}
                      </span>
                    </div>

                    <div className="w-20 hidden lg:block text-center">
                      {order.avgDa > 0 ? (
                        <span className="text-sm font-medium">{order.avgDa}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/tasks/${order.id}`}>查看详情</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>编辑任务</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">删除任务</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* 客座文章 */}
        <TabsContent value="guest-posts" className="space-y-6">
          {/* 统计卡片 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">总文章数</div>
              <div className="mt-1 text-2xl font-semibold">{guestPostStats.total}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">总平台数</div>
              <div className="mt-1 text-2xl font-semibold">{guestPostStats.totalPlatforms}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">待发布</div>
              <div className="mt-1 text-2xl font-semibold text-amber-500">{guestPostStats.pending}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">已发布</div>
              <div className="mt-1 text-2xl font-semibold text-emerald-500">{guestPostStats.published}</div>
            </div>
          </div>

          {/* 批量操作栏 */}
          {selectedGuestPosts.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
              <span className="text-sm text-muted-foreground">已选择 {selectedGuestPosts.length} 项</span>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  导出
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  删除
                </Button>
              </div>
            </div>
          )}

          {/* 订单列表 */}
          <div className="rounded-lg border overflow-hidden">
            {/* 表头 */}
            <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 border-b text-sm font-medium text-muted-foreground">
              <Checkbox
                checked={selectedGuestPosts.length === guestPostOrders.length && guestPostOrders.length > 0}
                onCheckedChange={toggleAllGuestPosts}
                className="h-4 w-4"
              />
              <div className="flex-1">任务名称</div>
              <div className="w-28 text-center hidden sm:block">状态</div>
              <div className="w-32 text-center hidden md:block">进度</div>
              <div className="w-20 text-center hidden lg:block">DR</div>
              <div className="w-10" />
            </div>

            {/* 列表项 */}
            <div className="divide-y">
              {guestPostOrders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                const isSelected = selectedGuestPosts.includes(order.id);

                return (
                  <div
                    key={order.id}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/30",
                      isSelected && "bg-primary/5",
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleGuestPostSelection(order.id)}
                      className="h-4 w-4"
                    />

                    <Link href={`/dashboard/tasks/${order.id}`} className="flex-1 min-w-0 group">
                      <div className="flex items-center gap-2">
                        <span className="font-medium group-hover:text-primary transition-colors truncate">
                          {order.name}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="font-mono">{order.id}</span>
                        {order.title && (
                          <>
                            <span>·</span>
                            <span className="truncate">{order.title}</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="text-primary/80 font-medium">{order.packageName}</span>
                        <span>·</span>
                        <span>
                          {order.completedCount}/{order.mediaCount} 已发布
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground sm:hidden">
                        <Badge variant="secondary" className={cn("text-xs h-5", status.color)}>
                          <StatusIcon className={cn("h-3 w-3 mr-1", order.status === "writing" && "animate-pulse")} />
                          {status.label}
                        </Badge>
                        <span>{order.progress}%</span>
                      </div>
                    </Link>

                    <div className="w-28 hidden sm:flex justify-center">
                      <Badge variant="secondary" className={cn("text-xs", status.color)}>
                        <StatusIcon className={cn("h-3 w-3 mr-1", order.status === "writing" && "animate-pulse")} />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="w-32 hidden md:flex items-center gap-2 justify-center">
                      <Progress value={order.progress} className="w-16 h-1.5" />
                      <span className="text-xs text-muted-foreground w-8 text-right">{order.progress}%</span>
                    </div>

                    <div className="w-20 hidden lg:block text-center">
                      {order.avgDr > 0 ? (
                        <span className="text-sm font-medium">{order.avgDr}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/tasks/${order.id}`}>查看详情</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>编辑任务</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">删除任务</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

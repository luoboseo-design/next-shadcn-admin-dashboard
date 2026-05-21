"use client";

import { useState } from "react";

import Link from "next/link";

import {
  AlertCircle,
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
  Search,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// 模拟外链订单数据
const backlinkOrders = [
  {
    id: "BL-001",
    targetUrl: "https://example.com/product",
    anchorText: "最佳产品推荐",
    platforms: ["知乎", "简书", "CSDN"],
    status: "completed",
    progress: 100,
    createdAt: "2024-01-15",
    completedAt: "2024-01-20",
    linksBuilt: 15,
    linksTarget: 15,
    da: 45,
  },
  {
    id: "BL-002",
    targetUrl: "https://example.com/service",
    anchorText: "专业服务商",
    platforms: ["百度贴吧", "天涯论坛", "豆瓣"],
    status: "in_progress",
    progress: 60,
    createdAt: "2024-01-18",
    completedAt: null,
    linksBuilt: 9,
    linksTarget: 15,
    da: 38,
  },
  {
    id: "BL-003",
    targetUrl: "https://example.com/blog",
    anchorText: "行业深度分析",
    platforms: ["Medium", "Dev.to", "Hashnode"],
    status: "pending",
    progress: 0,
    createdAt: "2024-01-22",
    completedAt: null,
    linksBuilt: 0,
    linksTarget: 20,
    da: 0,
  },
  {
    id: "BL-004",
    targetUrl: "https://example.com/tool",
    anchorText: "免费在线工具",
    platforms: ["知乎", "简书"],
    status: "in_progress",
    progress: 40,
    createdAt: "2024-01-20",
    completedAt: null,
    linksBuilt: 8,
    linksTarget: 20,
    da: 32,
  },
];

// 模拟客座文章订单数据
const guestPostOrders = [
  {
    id: "GP-001",
    title: "2024年数字营销趋势分析",
    targetSite: "36kr.com",
    status: "published",
    progress: 100,
    createdAt: "2024-01-10",
    publishedAt: "2024-01-18",
    views: 12500,
    backlinks: 3,
    dr: 78,
  },
  {
    id: "GP-002",
    title: "企业如何构建品牌影响力",
    targetSite: "huxiu.com",
    status: "writing",
    progress: 45,
    createdAt: "2024-01-15",
    publishedAt: null,
    views: 0,
    backlinks: 0,
    dr: 72,
  },
  {
    id: "GP-003",
    title: "AI 在内容创作中的应用",
    targetSite: "juejin.cn",
    status: "review",
    progress: 80,
    createdAt: "2024-01-12",
    publishedAt: null,
    views: 0,
    backlinks: 0,
    dr: 65,
  },
  {
    id: "GP-004",
    title: "SEO 最佳实践指南",
    targetSite: "infoq.cn",
    status: "pending",
    progress: 0,
    createdAt: "2024-01-22",
    publishedAt: null,
    views: 0,
    backlinks: 0,
    dr: 70,
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "待处理", color: "bg-muted text-muted-foreground", icon: Clock },
  in_progress: { label: "进行中", color: "bg-blue-500/10 text-blue-500", icon: Loader2 },
  completed: { label: "已完成", color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle2 },
  writing: { label: "撰写中", color: "bg-amber-500/10 text-amber-500", icon: FileEdit },
  review: { label: "审核中", color: "bg-purple-500/10 text-purple-500", icon: Eye },
  published: { label: "已发布", color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle2 },
  failed: { label: "失败", color: "bg-destructive/10 text-destructive", icon: AlertCircle },
};

export default function SEOMonitorPage() {
  const [activeTab, setActiveTab] = useState("backlinks");
  const [statusFilter, setStatusFilter] = useState("all");

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
    inProgress: guestPostOrders.filter((o) => ["writing", "review"].includes(o.status)).length,
    totalViews: guestPostOrders.reduce((acc, o) => acc + o.views, 0),
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 页面头部 */}
      <div className="flex flex-col gap-1">
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

          {/* 订单列表 */}
          <div className="rounded-lg border">
            <div className="grid gap-px bg-border">
              {backlinkOrders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <Link
                    key={order.id}
                    href={`/dashboard/tasks/${order.id}`}
                    className="flex flex-col gap-4 bg-card p-4 hover:bg-muted/50 transition-colors sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                        <Badge variant="secondary" className={cn("text-xs", status.color)}>
                          <StatusIcon
                            className={cn("h-3 w-3 mr-1", order.status === "in_progress" && "animate-spin")}
                          />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="font-medium truncate">{order.targetUrl}</div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>锚文本: {order.anchorText}</span>
                        <span>平台: {order.platforms.join(", ")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">外链进度</div>
                        <div className="flex items-center gap-2">
                          <Progress value={order.progress} className="w-24 h-2" />
                          <span className="text-sm font-medium">
                            {order.linksBuilt}/{order.linksTarget}
                          </span>
                        </div>
                      </div>
                      {order.da > 0 && (
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">平均 DA</div>
                          <div className="text-sm font-semibold">{order.da}</div>
                        </div>
                      )}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
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
              <div className="text-sm text-muted-foreground">撰写/审核中</div>
              <div className="mt-1 text-2xl font-semibold text-amber-500">{guestPostStats.inProgress}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">已发布</div>
              <div className="mt-1 text-2xl font-semibold text-emerald-500">{guestPostStats.published}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">总阅读量</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-semibold">{guestPostStats.totalViews.toLocaleString()}</span>
                <span className="flex items-center text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +28%
                </span>
              </div>
            </div>
          </div>

          {/* 订单列表 */}
          <div className="rounded-lg border">
            <div className="grid gap-px bg-border">
              {guestPostOrders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <Link
                    key={order.id}
                    href={`/dashboard/tasks/${order.id}`}
                    className="flex flex-col gap-4 bg-card p-4 hover:bg-muted/50 transition-colors sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                        <Badge variant="secondary" className={cn("text-xs", status.color)}>
                          <StatusIcon className={cn("h-3 w-3 mr-1", order.status === "writing" && "animate-pulse")} />
                          {status.label}
                        </Badge>
                        {order.dr > 0 && (
                          <Badge variant="outline" className="text-xs">
                            DR {order.dr}
                          </Badge>
                        )}
                      </div>
                      <div className="font-medium truncate">{order.title}</div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          {order.targetSite}
                        </span>
                        <span>创建于 {order.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">进度</div>
                        <div className="flex items-center gap-2">
                          <Progress value={order.progress} className="w-20 h-2" />
                          <span className="text-sm font-medium">{order.progress}%</span>
                        </div>
                      </div>
                      {order.status === "published" && (
                        <>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">阅读量</div>
                            <div className="text-sm font-semibold">{order.views.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">外链</div>
                            <div className="text-sm font-semibold">{order.backlinks}</div>
                          </div>
                        </>
                      )}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

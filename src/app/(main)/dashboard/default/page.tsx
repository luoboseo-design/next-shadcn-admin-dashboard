"use client";

import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Link2,
  MessageSquare,
  Newspaper,
  Search,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// 模拟各服务的统计数据
const serviceStats = {
  seo: {
    name: "SEO 服务",
    icon: Search,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    link: "/dashboard/seo-monitor",
    stats: {
      total: 12,
      completed: 8,
      publishing: 4,
    },
    subServices: [
      { name: "外链代发", total: 8, completed: 6, publishing: 2 },
      { name: "客座文章", total: 4, completed: 2, publishing: 2 },
    ],
  },
  geo: {
    name: "GEO 服务",
    icon: Globe,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    link: "/dashboard/geo-monitor",
    stats: {
      total: 6,
      completed: 4,
      publishing: 2,
    },
    subServices: [
      { name: "AI 内容生成", total: 4, completed: 3, publishing: 1 },
      { name: "AI 搜索优化", total: 2, completed: 1, publishing: 1 },
    ],
  },
  social: {
    name: "社交媒体",
    icon: Share2,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    link: "/dashboard/social-monitor",
    stats: {
      total: 15,
      completed: 10,
      publishing: 5,
    },
    subServices: [
      { name: "发帖", total: 6, completed: 4, publishing: 2 },
      { name: "评论", total: 4, completed: 3, publishing: 1 },
      { name: "点赞", total: 3, completed: 2, publishing: 1 },
      { name: "粉丝增长", total: 2, completed: 1, publishing: 1 },
    ],
  },
  news: {
    name: "发稿服务",
    icon: Newspaper,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    link: "/dashboard/news-monitor",
    stats: {
      total: 8,
      completed: 5,
      publishing: 3,
    },
    subServices: [{ name: "新闻媒体发稿", total: 8, completed: 5, publishing: 3 }],
  },
};

// 计算总体统计
const totalStats = {
  totalTasks: Object.values(serviceStats).reduce((acc, s) => acc + s.stats.total, 0),
  completedTasks: Object.values(serviceStats).reduce((acc, s) => acc + s.stats.completed, 0),
  publishingTasks: Object.values(serviceStats).reduce((acc, s) => acc + s.stats.publishing, 0),
};

// 最近任务
const recentTasks = [
  {
    id: "SEO-001",
    name: "SaaS 行业外链建设",
    service: "SEO 服务",
    type: "外链代发",
    status: "completed",
    progress: 100,
    date: "2024-01-25",
  },
  {
    id: "GEO-002",
    name: "AI 产品内容优化",
    service: "GEO 服务",
    type: "AI 内容生成",
    status: "publishing",
    progress: 60,
    date: "2024-01-24",
  },
  {
    id: "SOC-003",
    name: "Reddit 社区推广",
    service: "社交媒体",
    type: "发帖",
    status: "completed",
    progress: 100,
    date: "2024-01-23",
  },
  {
    id: "NEWS-004",
    name: "新品发布新闻稿",
    service: "发稿服务",
    type: "新闻媒体发稿",
    status: "publishing",
    progress: 40,
    date: "2024-01-22",
  },
  {
    id: "SEO-005",
    name: "技术博客客座文章",
    service: "SEO 服务",
    type: "客座文章",
    status: "publishing",
    progress: 75,
    date: "2024-01-21",
  },
];

export default function Page() {
  const completionRate = Math.round((totalStats.completedTasks / totalStats.totalTasks) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold">任务概览</h1>
        <p className="text-muted-foreground mt-1">查看所有服务的任务执行情况</p>
      </div>

      {/* 总体统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">总任务数</div>
                <div className="text-2xl font-bold">{totalStats.totalTasks}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">已完成</div>
                <div className="text-2xl font-bold text-emerald-500">{totalStats.completedTasks}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">发布中</div>
                <div className="text-2xl font-bold text-amber-500">{totalStats.publishingTasks}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">完成率</div>
                <div className="text-2xl font-bold">{completionRate}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 各服务概览 */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(serviceStats).map(([key, service]) => {
          const Icon = service.icon;
          const serviceCompletionRate = Math.round((service.stats.completed / service.stats.total) * 100);

          return (
            <Card key={key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${service.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 ${service.color}`} />
                    </div>
                    {service.name}
                  </CardTitle>
                  <Link href={service.link}>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      查看详情
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 统计数字 */}
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground">总任务</div>
                    <div className="text-xl font-semibold">{service.stats.total}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">已完成</div>
                    <div className="text-xl font-semibold text-emerald-500">{service.stats.completed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">发布中</div>
                    <div className="text-xl font-semibold text-amber-500">{service.stats.publishing}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">完成率</div>
                    <div className="flex items-center gap-2">
                      <Progress value={serviceCompletionRate} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{serviceCompletionRate}%</span>
                    </div>
                  </div>
                </div>

                {/* 子服务列表 */}
                <div className="border-t pt-3">
                  <div className="flex flex-wrap gap-2">
                    {service.subServices.map((sub) => (
                      <div
                        key={sub.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm"
                      >
                        <span>{sub.name}</span>
                        <Badge variant="secondary" className="text-xs h-5">
                          {sub.completed}/{sub.total}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 最近任务 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">最近任务</CardTitle>
            <Link href="/dashboard/tasks">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                查看全部
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{task.name}</span>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {task.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{task.id}</span>
                      <span>·</span>
                      <span>{task.service}</span>
                      <span>·</span>
                      <span>{task.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-24 flex items-center gap-2">
                    <Progress value={task.progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                  </div>
                  <Badge
                    className={
                      task.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                    }
                  >
                    {task.status === "completed" ? "已完成" : "发布中"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

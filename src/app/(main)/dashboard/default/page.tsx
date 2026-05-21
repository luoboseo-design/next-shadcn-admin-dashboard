"use client";

import Link from "next/link";

import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// 模拟各服务的统计数据
const serviceStats = {
  seo: {
    name: "SEO 服务",
    link: "/dashboard/seo-monitor",
    stats: { total: 12, completed: 8, publishing: 4 },
    subServices: [
      { name: "外链代发", completed: 6, total: 8 },
      { name: "客座文章", completed: 2, total: 4 },
    ],
  },
  geo: {
    name: "GEO 服务",
    link: "/dashboard/geo-monitor",
    stats: { total: 6, completed: 4, publishing: 2 },
    subServices: [
      { name: "AI 内容生成", completed: 3, total: 4 },
      { name: "AI 搜索优化", completed: 1, total: 2 },
    ],
  },
  social: {
    name: "社交媒体",
    link: "/dashboard/social-monitor",
    stats: { total: 15, completed: 10, publishing: 5 },
    subServices: [
      { name: "发帖", completed: 4, total: 6 },
      { name: "评论", completed: 3, total: 4 },
      { name: "点赞", completed: 2, total: 3 },
      { name: "粉丝增长", completed: 1, total: 2 },
    ],
  },
  news: {
    name: "发稿服务",
    link: "/dashboard/news-monitor",
    stats: { total: 8, completed: 5, publishing: 3 },
    subServices: [{ name: "新闻媒体发稿", completed: 5, total: 8 }],
  },
};

// 计算总体统计
const totalStats = {
  total: Object.values(serviceStats).reduce((acc, s) => acc + s.stats.total, 0),
  completed: Object.values(serviceStats).reduce((acc, s) => acc + s.stats.completed, 0),
  publishing: Object.values(serviceStats).reduce((acc, s) => acc + s.stats.publishing, 0),
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
  const completionRate = Math.round((totalStats.completed / totalStats.total) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold">任务概览</h1>
        <p className="text-muted-foreground mt-1">查看所有服务的任务执行情况</p>
      </div>

      {/* 总体统计 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">总任务数</div>
          <div className="mt-1 text-2xl font-semibold">{totalStats.total}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">已完成</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-500">{totalStats.completed}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">发布中</div>
          <div className="mt-1 text-2xl font-semibold text-amber-500">{totalStats.publishing}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">完成率</div>
          <div className="mt-1 text-2xl font-semibold">{completionRate}%</div>
        </div>
      </div>

      {/* 各服务概览 */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(serviceStats).map(([key, service]) => {
          const rate = Math.round((service.stats.completed / service.stats.total) * 100);
          return (
            <Card key={key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{service.name}</CardTitle>
                  <Link href={service.link}>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                      查看详情
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">总任务</span>
                    <span className="ml-2 font-semibold">{service.stats.total}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">已完成</span>
                    <span className="ml-2 font-semibold text-emerald-500">{service.stats.completed}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">发布中</span>
                    <span className="ml-2 font-semibold text-amber-500">{service.stats.publishing}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <Progress value={rate} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{rate}%</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {service.subServices.map((sub) => (
                    <span key={sub.name} className="text-xs text-muted-foreground px-2 py-1 rounded bg-muted">
                      {sub.name} {sub.completed}/{sub.total}
                    </span>
                  ))}
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
              <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                查看全部
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{task.name}</span>
                    <Badge variant="outline" className="text-xs h-5 shrink-0">
                      {task.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {task.id} · {task.service} · {task.date}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <div className="w-20 flex items-center gap-1.5">
                    <Progress value={task.progress} className="h-1 flex-1" />
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                  {task.status === "completed" ? (
                    <span className="text-xs text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      已完成
                    </span>
                  ) : (
                    <span className="text-xs text-amber-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      发布中
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

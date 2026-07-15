"use client";

import { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTasks } from "@/data/mock-tasks";

import { GeoMonitorPanel } from "./_components/geo-monitor";
import { NewsMonitorPanel } from "./_components/news-monitor";
import { SeoMonitorPanel } from "./_components/seo-monitor";
import { SocialMonitorPanel } from "./_components/social-monitor";
import { TaskList } from "./_components/task-list";

const VALID_TABS = ["all", "seo", "geo", "social", "news"] as const;
type TabValue = (typeof VALID_TABS)[number];

function TasksPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const activeTab: TabValue = VALID_TABS.includes(tabParam as TabValue) ? (tabParam as TabValue) : "all";

  const handleTabChange = (value: string) => {
    router.replace(value === "all" ? "/dashboard/tasks" : `/dashboard/tasks?tab=${value}`, { scroll: false });
  };

  // 计算统计数据
  const stats = {
    total: mockTasks.length,
    completed: mockTasks.filter((t) => t.status === "completed").length,
    inProgress: mockTasks.filter((t) => ["publishing", "analyzing"].includes(t.status)).length,
    pending: mockTasks.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold">任务中心</h1>
        <p className="text-muted-foreground mt-1">管理和追踪您的所有服务任务</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="h-11 rounded-lg p-1">
          <TabsTrigger value="all" className="h-9 rounded-md px-4">
            全部任务
          </TabsTrigger>
          <TabsTrigger value="seo" className="h-9 rounded-md px-4">
            SEO 任务
          </TabsTrigger>
          <TabsTrigger value="geo" className="h-9 rounded-md px-4">
            GEO 监控
          </TabsTrigger>
          <TabsTrigger value="social" className="h-9 rounded-md px-4">
            社交媒体
          </TabsTrigger>
          <TabsTrigger value="news" className="h-9 rounded-md px-4">
            发稿任务
          </TabsTrigger>
        </TabsList>

        {/* 全部任务总览 */}
        <TabsContent value="all" className="space-y-6">
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">总任务数</div>
                <div className="text-2xl font-bold mt-1">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">进行中</div>
                <div className="text-2xl font-bold mt-1 text-amber-500">{stats.inProgress}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">待处理</div>
                <div className="text-2xl font-bold mt-1 text-muted-foreground">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">已完成</div>
                <div className="text-2xl font-bold mt-1 text-emerald-500">{stats.completed}</div>
              </CardContent>
            </Card>
          </div>

          {/* 任务列表 */}
          <Card>
            <CardHeader>
              <CardTitle>任务列表</CardTitle>
              <CardDescription>查看所有任务的执行状态和进度</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={mockTasks} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO 任务监控 */}
        <TabsContent value="seo">
          <SeoMonitorPanel />
        </TabsContent>

        {/* GEO 监控 */}
        <TabsContent value="geo">
          <GeoMonitorPanel />
        </TabsContent>

        {/* 社交媒体报告 */}
        <TabsContent value="social">
          <SocialMonitorPanel />
        </TabsContent>

        {/* 发稿任务 */}
        <TabsContent value="news">
          <NewsMonitorPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense>
      <TasksPageContent />
    </Suspense>
  );
}

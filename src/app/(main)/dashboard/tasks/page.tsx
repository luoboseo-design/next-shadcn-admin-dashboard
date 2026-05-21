"use client";

import { CheckCircle2, ClipboardList, Clock, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTasks, serviceCategoryConfig } from "@/data/mock-tasks";

import { TaskList } from "./_components/task-list";

export default function TasksPage() {
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
    </div>
  );
}

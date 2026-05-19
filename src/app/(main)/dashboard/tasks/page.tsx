"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle2, Clock, Loader2, AlertCircle } from "lucide-react";
import { TaskList } from "./_components/task-list";
import { mockTasks, mockUserStats } from "@/data/mock-tasks";

export default function TasksPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <ClipboardList className="h-7 w-7 text-primary" />
          任务中心
        </h1>
        <p className="text-muted-foreground mt-1">
          管理和追踪您的外链发布任务
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockUserStats.totalTasks}</div>
                <div className="text-sm text-muted-foreground">总任务数</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockUserStats.pendingTasks}</div>
                <div className="text-sm text-muted-foreground">进行中</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockUserStats.completedTasks}</div>
                <div className="text-sm text-muted-foreground">已完成</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Loader2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockUserStats.totalLinks}</div>
                <div className="text-sm text-muted-foreground">总外链数</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 任务列表 */}
      <Card>
        <CardHeader>
          <CardTitle>任务列表</CardTitle>
          <CardDescription>
            查看所有任务的执行状态和进度
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList tasks={mockTasks} />
        </CardContent>
      </Card>
    </div>
  );
}

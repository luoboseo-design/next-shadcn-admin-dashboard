"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Link2,
  Loader2,
  Target,
} from "lucide-react";
import { getTaskById, taskStatusLabels, taskStatusColors } from "@/data/mock-tasks";
import { TaskProgress } from "../_components/task-progress";
import { PublishResultsTable } from "../_components/publish-results-table";
import { AcceptanceDialog } from "../_components/acceptance-dialog";
import { cn } from "@/lib/utils";

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = use(params);
  const task = getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 返回按钮和标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" className="gap-1 mb-2" asChild>
            <Link href="/dashboard/tasks">
              <ArrowLeft className="h-4 w-4" />
              返回任务列表
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            任务详情
            <Badge className={cn(taskStatusColors[task.status])} variant="secondary">
              {taskStatusLabels[task.status]}
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1 font-mono">
            ID: {task.id.toUpperCase()}
          </p>
        </div>
        {task.status === "awaiting" && <AcceptanceDialog task={task} />}
      </div>

      {/* 基本信息卡片 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground">目标网址</div>
                <a
                  href={task.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium truncate block hover:underline"
                >
                  {task.targetUrl}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">外链数量</div>
                <div className="font-medium">
                  {task.completedPlatforms} / {task.totalPlatforms}
                </div>
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
                <div className="text-sm text-muted-foreground">成功率</div>
                <div className="font-medium">{task.successRate}%</div>
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
                <div className="text-sm text-muted-foreground">创建时间</div>
                <div className="font-medium">
                  {new Date(task.createdAt).toLocaleDateString("zh-CN")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 关键词和进度 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>关键词</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {task.keywords.map((kw, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  {kw}
                </Badge>
              ))}
            </div>
            {task.anchorTexts.length > 0 && (
              <>
                <div className="text-sm text-muted-foreground mt-4 mb-2">锚文本</div>
                <div className="flex flex-wrap gap-2">
                  {task.anchorTexts.map((text, i) => (
                    <Badge key={i} variant="outline" className="text-sm">
                      {text}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>执行进度</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskProgress task={task} />
          </CardContent>
        </Card>
      </div>

      {/* 发布结果表格 */}
      {task.publishResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>发布结果</CardTitle>
            <CardDescription>
              已完成 {task.publishResults.filter((r) => r.status === "success").length} 条发布
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PublishResultsTable results={task.publishResults} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

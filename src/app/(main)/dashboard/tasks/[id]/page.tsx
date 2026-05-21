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
  Target,
  FileText,
  Eye,
  BarChart3,
  Globe,
  Plus,
  TrendingUp,
} from "lucide-react";
import { getTaskById, taskStatusLabels, taskStatusColors } from "@/data/mock-tasks";
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

  const isGuestPost = task.taskType === "guest_post";
  const isBacklink = task.taskType === "backlink" || task.id.startsWith("BL-");

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 返回按钮和标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" className="gap-1 mb-2" asChild>
            <Link href={isBacklink || isGuestPost ? "/dashboard/seo-monitor" : "/dashboard/tasks"}>
              <ArrowLeft className="h-4 w-4" />
              返回{isBacklink || isGuestPost ? "SEO监控" : "任务列表"}
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold">
              {task.name || "任务详情"}
            </h1>
            <Badge className={cn(taskStatusColors[task.status])} variant="secondary">
              {taskStatusLabels[task.status]}
            </Badge>
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            {task.id} · {isGuestPost ? "客座文章" : "外链代发"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {task.status === "awaiting" && <AcceptanceDialog task={task} />}
          <Button asChild>
            <Link href="/dashboard/services/seo">
              <Plus className="h-4 w-4 mr-2" />
              新建任务
            </Link>
          </Button>
        </div>
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
                  className="font-medium truncate block hover:underline text-sm"
                >
                  {task.targetUrl}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {isGuestPost ? (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">目标站点</div>
                    <div className="font-medium">{task.targetSite}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">总阅读量</div>
                    <div className="font-medium">
                      {task.totalViews?.toLocaleString() || 0}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">DA/DR</div>
                    <div className="font-medium">{task.avgDa || "-"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">外链进度</div>
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
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">平均 DA</div>
                    <div className="font-medium">{task.avgDa || "-"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* 时间线 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">任务时间线</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">创建:</span>
              <span>{new Date(task.createdAt).toLocaleDateString("zh-CN")}</span>
            </div>
            {task.completedAt && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">完成:</span>
                <span>{new Date(task.completedAt).toLocaleDateString("zh-CN")}</span>
              </div>
            )}
            {task.acceptedAt && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">验收:</span>
                <span>{new Date(task.acceptedAt).toLocaleDateString("zh-CN")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 客座文章特有：文章信息 */}
      {isGuestPost && task.articleTitle && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              文章信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">文章标题</div>
              <div className="font-medium text-lg">{task.articleTitle}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">字数</div>
                <div className="font-medium">{task.wordCount?.toLocaleString() || "-"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">目标站点</div>
                <div className="font-medium">{task.targetSite}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">DA/DR</div>
                <div className="font-medium">{task.avgDa || "-"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">阅读量</div>
                <div className="font-medium">{task.totalViews?.toLocaleString() || "-"}</div>
              </div>
            </div>
            {task.publishResults.length > 0 && task.publishResults[0].publishUrl && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">发布链接</div>
                <a
                  href={task.publishResults[0].publishUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {task.publishResults[0].publishUrl}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}



      {/* 发布结果表格 - 仅外链任务显示 */}
      {!isGuestPost && task.publishResults.length > 0 && (
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

      {/* 价格信息 */}
      <Card>
        <CardHeader>
          <CardTitle>订单信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">套餐</div>
              <div className="font-medium">{task.pricing.packageName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">数量</div>
              <div className="font-medium">{task.pricing.quantity}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">单价</div>
              <div className="font-medium">${task.pricing.pricePerLink}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">总价</div>
              <div className="font-medium text-primary">${task.pricing.totalPrice}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

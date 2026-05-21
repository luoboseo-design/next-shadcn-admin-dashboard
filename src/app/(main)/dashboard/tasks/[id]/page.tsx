"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Link2,
  Target,
  FileText,
  TrendingUp,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTaskById, taskStatusLabels, taskStatusColors } from "@/data/mock-tasks";
import { PublishResultsTable } from "../_components/publish-results-table";
import { AcceptanceDialog } from "../_components/acceptance-dialog";
import { cn } from "@/lib/utils";

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.id as string;
  const task = getTaskById(taskId);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);

  if (!task) {
    notFound();
  }

  const isGuestPost = task.taskType === "guest_post";

  // 选择相关
  const toggleResult = (id: string) => {
    setSelectedResults(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleAllResults = () => {
    if (selectedResults.length === task.publishResults.length) {
      setSelectedResults([]);
    } else {
      setSelectedResults(task.publishResults.map(r => r.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/dashboard/seo-monitor"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            返回SEO任务
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{task.name || task.targetUrl}</h1>
            <Badge className={taskStatusColors[task.status]}>
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

      {/* 统计卡片 - 客座文章显示发布进度，外链显示外链进度 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {isGuestPost ? "发布进度" : "外链进度"}
                </div>
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
                <div className="text-sm text-muted-foreground">平均 DR</div>
                <div className="font-medium">{task.avgDa || "-"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* 客座文章：文章信息 + 发布报告表格 */}
      {isGuestPost ? (
        <>
          {/* 文章基本信息 */}
          {task.articleTitle && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5" />
                  文章信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">文章标题</div>
                    <div className="font-medium">{task.articleTitle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">字数</div>
                    <div className="font-medium">{task.wordCount?.toLocaleString() || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">套餐类型</div>
                    <div className="font-medium">{task.pricing.packageName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">媒体数量</div>
                    <div className="font-medium">{task.totalPlatforms} 个</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 发布报告表格 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">发布报告</CardTitle>
                {selectedResults.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    已选 {selectedResults.length} 项
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {task.publishResults.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  {/* 表头 */}
                  <div className="grid grid-cols-[40px_1fr_150px_100px_80px_50px] gap-4 px-4 py-3 bg-muted/50 text-sm font-medium text-muted-foreground border-b">
                    <div className="flex items-center">
                      <Checkbox
                        checked={selectedResults.length === task.publishResults.length && task.publishResults.length > 0}
                        onCheckedChange={toggleAllResults}
                      />
                    </div>
                    <div>文章标题</div>
                    <div>媒体名称</div>
                    <div>状态</div>
                    <div>DR</div>
                    <div></div>
                  </div>
                  {/* 表格内容 */}
                  {task.publishResults.map((result) => (
                    <div
                      key={result.id}
                      className="grid grid-cols-[40px_1fr_150px_100px_80px_50px] gap-4 px-4 py-3 border-b last:border-b-0 items-center hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedResults.includes(result.id)}
                          onCheckedChange={() => toggleResult(result.id)}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{result.title}</div>
                        {result.publishUrl && (
                          <a
                            href={result.publishUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary truncate flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {result.publishUrl}
                          </a>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{result.platformName}</div>
                        <a
                          href={result.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          {result.platformUrl}
                        </a>
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className={cn(
                            result.status === "success" && "border-green-500 text-green-600 bg-green-50 dark:bg-green-950/30",
                            result.status === "pending" && "border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30",
                            result.status === "failed" && "border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30"
                          )}
                        >
                          {result.status === "success" ? "已发布" : result.status === "pending" ? "待发布" : "失败"}
                        </Badge>
                      </div>
                      <div className="font-medium">{result.dr || "-"}</div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {result.publishUrl && (
                              <DropdownMenuItem asChild>
                                <a href={result.publishUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  查看文章
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>复制链接</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>暂无发布结果</p>
                  <p className="text-sm">文章正在撰写或审核中</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* 外链代发：发布结果表格 */
        <Card>
          <CardHeader>
            <CardTitle className="text-base">发布结果</CardTitle>
          </CardHeader>
          <CardContent>
            {task.publishResults.length > 0 ? (
              <PublishResultsTable results={task.publishResults} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Link2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>暂无发布结果</p>
                <p className="text-sm">任务正在处理中</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

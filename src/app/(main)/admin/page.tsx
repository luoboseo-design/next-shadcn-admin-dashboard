"use client";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Play,
  RefreshCw,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// 模拟数据 - 系统概览
const systemStats = {
  activeWorkflows: 23,
  queuedTasks: 156,
  completedToday: 89,
  successRate: 94.5,
  totalUsers: 128,
  totalOrders: 1847,
  monthlyRevenue: 52800,
  resourcesCount: {
    blogs: 856,
    forums: 234,
    socialAccounts: 178,
    newsSites: 92,
  },
};

// 工作流执行状态
const workflowStatus = [
  {
    id: "wf-001",
    name: "SEO 外链代发",
    status: "running",
    activeJobs: 12,
    queuedJobs: 45,
    completedToday: 38,
    successRate: 96,
  },
  {
    id: "wf-002",
    name: "客座文章发布",
    status: "running",
    activeJobs: 5,
    queuedJobs: 18,
    completedToday: 12,
    successRate: 92,
  },
  {
    id: "wf-003",
    name: "GEO 关键词优化",
    status: "running",
    activeJobs: 3,
    queuedJobs: 8,
    completedToday: 15,
    successRate: 88,
  },
  {
    id: "wf-004",
    name: "社交媒体发布",
    status: "paused",
    activeJobs: 0,
    queuedJobs: 23,
    completedToday: 24,
    successRate: 91,
  },
  {
    id: "wf-005",
    name: "新闻稿发布",
    status: "running",
    activeJobs: 2,
    queuedJobs: 6,
    completedToday: 8,
    successRate: 95,
  },
];

// 最近执行任务
const recentTasks = [
  {
    id: "task-001",
    orderId: "ORD-2024-0156",
    service: "外链代发",
    user: "北京科技有限公司",
    status: "completed",
    platform: "medium.com",
    completedAt: "2分钟前",
  },
  {
    id: "task-002",
    orderId: "ORD-2024-0155",
    service: "外链代发",
    user: "上海营销公司",
    status: "running",
    platform: "wordpress.com",
    step: "正在发布内容...",
  },
  {
    id: "task-003",
    orderId: "ORD-2024-0154",
    service: "客座文章",
    user: "深圳电商公司",
    status: "running",
    platform: "techcrunch.com",
    step: "等待审核...",
  },
  {
    id: "task-004",
    orderId: "ORD-2024-0153",
    service: "Reddit 发帖",
    user: "杭州互联网公司",
    status: "completed",
    platform: "reddit.com/r/technology",
    completedAt: "5分钟前",
  },
  {
    id: "task-005",
    orderId: "ORD-2024-0152",
    service: "外链代发",
    user: "广州贸易公司",
    status: "failed",
    platform: "blogger.com",
    error: "账号被限制",
  },
];

// 系统告警
const systemAlerts = [
  {
    id: "alert-001",
    type: "warning",
    message: "Reddit 账号池可用数量不足 (剩余 12 个)",
    time: "10分钟前",
  },
  {
    id: "alert-002",
    type: "error",
    message: "Blogger.com 发布失败率上升至 25%",
    time: "30分钟前",
  },
  {
    id: "alert-003",
    type: "info",
    message: "新增 50 个博客站点资源已验证完成",
    time: "1小时前",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">控制台</h1>
          <p className="text-muted-foreground mt-1">系统运行状态和工作流监控</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新数据
        </Button>
      </div>

      {/* 系统告警 */}
      {systemAlerts.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="flex-1 space-y-2">
                <p className="font-medium text-amber-700 dark:text-amber-400">系统告警 ({systemAlerts.length})</p>
                {systemAlerts.slice(0, 2).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between text-sm">
                    <span className="text-amber-600 dark:text-amber-300">{alert.message}</span>
                    <span className="text-amber-500/70 text-xs">{alert.time}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/monitor">查看全部</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 核心指标 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">运行中工作流</p>
                <p className="text-3xl font-bold mt-1">{systemStats.activeWorkflows}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Play className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600 dark:text-green-400">
              <Zap className="h-3 w-3" />
              <span>系统正常运行</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">队列中任务</p>
                <p className="text-3xl font-bold mt-1">{systemStats.queuedTasks}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <span>预计 2-3 小时完成</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今日完成</p>
                <p className="text-3xl font-bold mt-1">{systemStats.completedToday}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>较昨日 +12%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">成功率</p>
                <p className="text-3xl font-bold mt-1">{systemStats.successRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <Progress value={systemStats.successRate} className="mt-3 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* 资源概览 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="bg-muted/30">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">博客站点</p>
                <p className="text-xl font-semibold">{systemStats.resourcesCount.blogs}</p>
              </div>
              <Badge variant="secondary" className="text-xs">可用</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">论坛列表</p>
                <p className="text-xl font-semibold">{systemStats.resourcesCount.forums}</p>
              </div>
              <Badge variant="secondary" className="text-xs">可用</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">社交账号</p>
                <p className="text-xl font-semibold">{systemStats.resourcesCount.socialAccounts}</p>
              </div>
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">低库存</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">新闻站点</p>
                <p className="text-xl font-semibold">{systemStats.resourcesCount.newsSites}</p>
              </div>
              <Badge variant="secondary" className="text-xs">可用</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 工作流状态 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">工作流状态</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/workflows">
                管理
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowStatus.map((wf) => (
                <div key={wf.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {wf.status === "running" ? (
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{wf.name}</p>
                      <Badge variant={wf.status === "running" ? "default" : "secondary"} className="text-xs">
                        {wf.status === "running" ? "运行中" : "已暂停"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>执行中: {wf.activeJobs}</span>
                      <span>队列: {wf.queuedJobs}</span>
                      <span>今日: {wf.completedToday}</span>
                      <span className="text-green-600 dark:text-green-400">{wf.successRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最近执行任务 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">最近执行任务</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/logs">
                查看日志
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                  <div className="flex-shrink-0 mt-0.5">
                    {task.status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {task.status === "running" && <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />}
                    {task.status === "failed" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{task.service}</p>
                      <span className="text-xs text-muted-foreground">{task.orderId}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{task.user}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{task.platform}</span>
                      {task.status === "completed" && (
                        <span className="text-xs text-green-600">{task.completedAt}</span>
                      )}
                      {task.status === "running" && (
                        <span className="text-xs text-blue-600">{task.step}</span>
                      )}
                      {task.status === "failed" && (
                        <span className="text-xs text-red-600">{task.error}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

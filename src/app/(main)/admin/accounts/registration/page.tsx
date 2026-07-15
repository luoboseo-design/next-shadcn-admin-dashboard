"use client";

import { useState } from "react";

import { AlertTriangle, Clock, Loader2, Play, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  type RegistrationStage,
  registrationQueue,
  registrationStageConfig,
  registrationStats,
} from "@/data/registration-queue";

import { ToneBadge } from "../_components/tone-badge";

// 流水线阶段顺序（用于顶部状态机可视化）
const pipeline: RegistrationStage[] = ["queued", "registering", "verifying", "warming", "completed"];

const verifyMethodLabels: Record<string, string> = {
  email: "邮箱验证",
  sms: "短信验证",
  none: "免验证",
};

export default function RegistrationQueuePage() {
  const [stageFilter, setStageFilter] = useState<string>("all");

  const filtered = registrationQueue.filter((j) => stageFilter === "all" || j.stage === stageFilter);

  const summary = [
    { label: "进行中", value: registrationStats.active, icon: Loader2, tint: "text-sky-600" },
    { label: "排队等待", value: registrationStats.queued, icon: Clock, tint: "text-muted-foreground" },
    { label: "今日完成", value: registrationStats.completedToday, icon: Play, tint: "text-emerald-600" },
    { label: "失败待处理", value: registrationStats.failed, icon: AlertTriangle, tint: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">注册队列</h1>
          <p className="text-muted-foreground mt-1">工作流「账号获取」流水线：把身份资源加工成可用平台账号</p>
        </div>
        <Button size="sm">
          <Play className="mr-2 h-4 w-4" />
          新建注册任务
        </Button>
      </div>

      {/* 统计 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-muted-foreground text-sm">{c.label}</p>
                <p className={`mt-1 text-2xl font-bold ${c.tint}`}>{c.value}</p>
              </div>
              <c.icon className="text-muted-foreground/40 h-8 w-8" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 状态机可视化 */}
      <Card>
        <CardContent className="p-5">
          <p className="text-muted-foreground mb-4 text-sm font-medium">注册流水线</p>
          <div className="flex flex-wrap items-center gap-2">
            {pipeline.map((stage, i) => {
              const cfg = registrationStageConfig[stage];
              const count = registrationQueue.filter((j) => j.stage === stage).length;
              return (
                <div key={stage} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1 rounded-lg border px-4 py-2">
                    <ToneBadge tone={cfg.tone}>{cfg.label}</ToneBadge>
                    <span className="text-lg font-bold">{count}</span>
                  </div>
                  {i < pipeline.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 筛选 */}
      <div className="flex items-center justify-between">
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="阶段" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部阶段</SelectItem>
            {Object.entries(registrationStageConfig).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>
                {cfg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 任务列表 */}
      <div className="space-y-3">
        {filtered.map((job) => {
          const cfg = registrationStageConfig[job.stage];
          return (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{job.platformName}</span>
                      <ToneBadge tone={cfg.tone}>{cfg.label}</ToneBadge>
                      <span className="text-muted-foreground text-xs">{verifyMethodLabels[job.verifyMethod]}</span>
                    </div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      {job.email} · 代理 {job.proxyLabel} · 第 {job.attempts} 次尝试
                    </div>
                    {job.stage === "failed" && job.failureReason && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {job.failureReason}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 sm:w-64">
                    {job.stage !== "failed" && job.stage !== "queued" && (
                      <div className="flex-1">
                        <Progress value={job.progress} className="h-1.5" />
                        <span className="text-muted-foreground text-xs">{job.progress}%</span>
                      </div>
                    )}
                    {job.retryable && (
                      <Button size="sm" variant="outline">
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                        重试
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="text-muted-foreground p-10 text-center">该阶段暂无任务</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

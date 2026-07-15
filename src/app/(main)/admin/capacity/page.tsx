"use client";

import Link from "next/link";

import { Activity, AlertTriangle, ArrowRight, CalendarClock, Gauge, Layers, TrendingUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  computeActiveTaskDemand,
  computeCapacitySummary,
  computePackageCapacity,
  computePlatformTypeCapacity,
  PLANNING_HORIZON_DAYS,
  serviceResourceMap,
} from "@/data/capacity-model";

import { ToneBadge } from "../accounts/_components/tone-badge";

export default function CapacityCenterPage() {
  const summary = computeCapacitySummary();
  const perType = computePlatformTypeCapacity();
  const packages = computePackageCapacity();
  const taskDemand = computeActiveTaskDemand();

  const summaryCards = [
    {
      label: "总日产能",
      value: `${summary.totalDailyCapacity} 条/天`,
      hint: `月度约 ${summary.totalDailyCapacity * PLANNING_HORIZON_DAYS} 条`,
      icon: Gauge,
      tint: "text-foreground",
    },
    {
      label: "今日可用余量",
      value: `${summary.availableToday} 条`,
      hint: `今日已用 ${summary.usedToday} 条`,
      icon: TrendingUp,
      tint: "text-sky-600",
    },
    {
      label: "待处理积压",
      value: `${summary.totalBacklog} 条`,
      hint: `${summary.activeTasks} 个活跃任务`,
      icon: Layers,
      tint: "text-amber-600",
    },
    {
      label: "预计清空积压",
      value: `${summary.daysToClearBacklog} 天`,
      hint: `${summary.healthyAccounts} 个正常账号`,
      icon: CalendarClock,
      tint: "text-emerald-600",
    },
  ];

  const occupancyTone = (pct: number): "success" | "warning" | "danger" =>
    pct >= 80 ? "danger" : pct >= 60 ? "warning" : "success";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">产能中心</h1>
          <p className="text-muted-foreground mt-1">
            把账号资源翻译成可承接的订单产能，回答"能接多少单、几天交付、还剩多少余量"
          </p>
        </div>
      </div>

      {/* 瓶颈预警 */}
      {summary.bottleneckTypes.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-300">产能瓶颈预警</p>
            <p className="text-amber-700 dark:text-amber-400/90">
              以下平台类型占用率偏高或无可用账号，建议优先补充：{summary.bottleneckTypes.join("、")}。可前往
              <Link href="/admin/accounts/registration" className="mx-1 underline underline-offset-2">
                注册队列
              </Link>
              批量注册养号。
            </p>
          </div>
        </div>
      )}

      {/* 总览卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">{c.label}</p>
                <c.icon className={`h-5 w-5 ${c.tint}`} />
              </div>
              <p className={`mt-2 text-2xl font-bold ${c.tint}`}>{c.value}</p>
              <p className="text-muted-foreground mt-1 text-xs">{c.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 分平台类型产能 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">分平台类型产能</CardTitle>
          <CardDescription>各类型的日产能、今日占用与积压，衡量哪类资源是瓶颈</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="text-muted-foreground px-4 py-3 font-medium">平台类型</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">正常账号</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">日产能</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">今日已用</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">待处理积压</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">占用率</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">可支撑成长版</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">平均 DA</th>
                </tr>
              </thead>
              <tbody>
                {perType.map((t) => (
                  <tr key={t.type} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium">{t.label}</td>
                    <td className="px-4 py-3">
                      {t.healthyAccounts}
                      <span className="text-muted-foreground">/{t.totalAccounts}</span>
                    </td>
                    <td className="px-4 py-3">{t.dailyCapacity} 条/天</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.usedToday}</td>
                    <td className="px-4 py-3">{t.backlog}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={t.occupancyPct} className="h-1.5 w-16" />
                        <ToneBadge tone={occupancyTone(t.occupancyPct)}>{t.occupancyPct}%</ToneBadge>
                      </div>
                    </td>
                    <td className="px-4 py-3">{t.supportableGrowthTasks} 单/月</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.avgDa || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 套餐承接力 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">套餐承接力</CardTitle>
          <CardDescription>
            受 DA 门槛过滤（仅统计外链相关平台），衡量每种套餐当前能承接的规模与交付周期
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <div key={p.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{p.name}</span>
                  <ToneBadge tone="muted">DA {p.minDa}+</ToneBadge>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">{p.quantity} 条外链 / 单</p>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">合格账号</dt>
                    <dd>{p.qualifyingAccounts} 个</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">合格日产能</dt>
                    <dd>{p.qualifyingDailyCapacity} 条/天</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">单任务交付</dt>
                    <dd>{p.estDaysPerTask > 0 ? `约 ${p.estDaysPerTask} 天` : "—"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">本月可承接</dt>
                    <dd className="font-medium">{p.maxConcurrentThisMonth} 单</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 活跃任务资源占用 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">活跃任务资源占用</CardTitle>
          <CardDescription>每个进行中的任务消耗哪些资源、还剩多少量未完成</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="text-muted-foreground px-4 py-3 font-medium">任务</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">服务</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">消耗资源</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">总量</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">剩余</th>
                </tr>
              </thead>
              <tbody>
                {taskDemand.map((t) => (
                  <tr key={t.id} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="font-medium">{t.name}</div>
                      <div className="text-muted-foreground text-xs">{t.id}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{serviceResourceMap[t.serviceCategory].label}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {t.isManual ? (
                          <ToneBadge tone="info">人工处理</ToneBadge>
                        ) : (
                          t.platformLabels.map((label) => (
                            <span key={label} className="bg-muted rounded-full px-2 py-0.5 text-xs">
                              {label}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">{t.quantity}</td>
                    <td className="px-4 py-3">
                      <ToneBadge tone={t.remaining > 0 ? "warning" : "success"}>{t.remaining}</ToneBadge>
                    </td>
                  </tr>
                ))}
                {taskDemand.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-muted-foreground px-4 py-10 text-center">
                      当前没有活跃任务
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 资源不足时的引导 */}
      <div className="flex items-center justify-between rounded-lg border border-dashed p-4">
        <div className="flex items-center gap-3">
          <Activity className="text-muted-foreground h-5 w-5" />
          <p className="text-muted-foreground text-sm">产能不足？前往注册队列批量注册养号，扩充账号池即可提升产能。</p>
        </div>
        <Link
          href="/admin/accounts/registration"
          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
        >
          去注册队列
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

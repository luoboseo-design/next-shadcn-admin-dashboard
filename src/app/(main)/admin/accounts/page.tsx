"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ArrowRight, Search, ShieldAlert, UserCog, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { accountHealthConfig, accountStats, platformAccountLabels, platformAccounts } from "@/data/platform-accounts";
import type { PlatformType } from "@/types/marketing";

import { ToneBadge } from "./_components/tone-badge";

export default function AccountsOverviewPage() {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [healthFilter, setHealthFilter] = useState<string>("all");

  const platformsInUse = useMemo(() => [...new Set(platformAccounts.map((a) => a.platform))] as PlatformType[], []);

  const filtered = platformAccounts.filter((a) => {
    const matchesSearch =
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.platformName.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === "all" || a.platform === platformFilter;
    const matchesHealth = healthFilter === "all" || a.health === healthFilter;
    return matchesSearch && matchesPlatform && matchesHealth;
  });

  const summaryCards = [
    { label: "账号总数", value: accountStats.total, icon: Users, tint: "text-foreground" },
    { label: "正常账号", value: accountStats.healthy, icon: UserCog, tint: "text-emerald-600" },
    { label: "今日可用", value: accountStats.availableToday, icon: ArrowRight, tint: "text-sky-600" },
    { label: "封禁/异常", value: accountStats.banned + accountStats.cooldown, icon: ShieldAlert, tint: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">账号总览</h1>
          <p className="text-muted-foreground mt-1">跨平台聚合所有成品账号，供工作流按每日上限调度取用</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/accounts/registration">
            查看注册队列
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((c) => (
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

      {/* 筛选栏 */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="搜索用户名 / 邮箱 / 平台..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="平台" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部平台</SelectItem>
              {platformsInUse.map((p) => (
                <SelectItem key={p} value={p}>
                  {platformAccountLabels[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={healthFilter} onValueChange={setHealthFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="健康度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              {Object.entries(accountHealthConfig).map(([key, cfg]) => (
                <SelectItem key={key} value={key}>
                  {cfg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* 账号列表 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="text-muted-foreground px-4 py-3 font-medium">账号</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">平台</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">健康度</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">账龄</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">今日用量</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">累计发布</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">最后使用</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const health = accountHealthConfig[a.health];
                  const usagePct = a.dailyLimit > 0 ? Math.round((a.usedToday / a.dailyLimit) * 100) : 0;
                  return (
                    <tr key={a.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <div className="font-medium">{a.username}</div>
                        <div className="text-muted-foreground text-xs">{a.email}</div>
                      </td>
                      <td className="px-4 py-3">{a.platformName}</td>
                      <td className="px-4 py-3">
                        <ToneBadge tone={health.tone}>{health.label}</ToneBadge>
                      </td>
                      <td className="px-4 py-3">{a.ageDays} 天</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={usagePct} className="h-1.5 w-16" />
                          <span className="text-muted-foreground text-xs">
                            {a.usedToday}/{a.dailyLimit}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{a.totalPublished}</td>
                      <td className="text-muted-foreground px-4 py-3">{a.lastUsed ?? "从未"}</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-muted-foreground px-4 py-10 text-center">
                      没有匹配的账号
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

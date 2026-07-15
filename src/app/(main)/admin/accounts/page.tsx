"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ArrowRight, Copy, Eye, EyeOff, Plus, Search, ShieldAlert, UserCog, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  accountHealthConfig,
  accountSourceConfig,
  type PlatformAccount,
  platformAccountLabels,
  platformAccounts,
} from "@/data/platform-accounts";
import type { PlatformType } from "@/types/marketing";

import { ToneBadge } from "./_components/tone-badge";

const emptyForm = {
  platformName: "",
  platform: "blog" as PlatformType,
  username: "",
  password: "",
  email: "",
  dailyLimit: "5",
};

export default function AccountsOverviewPage() {
  const [accounts, setAccounts] = useState<PlatformAccount[]>(platformAccounts);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [visiblePwd, setVisiblePwd] = useState<Record<string, boolean>>({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const platformsInUse = useMemo(() => [...new Set(accounts.map((a) => a.platform))] as PlatformType[], [accounts]);

  const filtered = accounts.filter((a) => {
    const matchesSearch =
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.platformName.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === "all" || a.platform === platformFilter;
    const matchesHealth = healthFilter === "all" || a.health === healthFilter;
    const matchesSource = sourceFilter === "all" || a.source === sourceFilter;
    return matchesSearch && matchesPlatform && matchesHealth && matchesSource;
  });

  const stats = useMemo(
    () => ({
      total: accounts.length,
      healthy: accounts.filter((a) => a.health === "healthy").length,
      availableToday: accounts.filter((a) => a.health === "healthy" && a.usedToday < a.dailyLimit).length,
      abnormal: accounts.filter((a) => a.health === "banned" || a.health === "cooldown").length,
    }),
    [accounts],
  );

  const summaryCards = [
    { label: "账号总数", value: stats.total, icon: Users, tint: "text-foreground" },
    { label: "正常账号", value: stats.healthy, icon: UserCog, tint: "text-emerald-600" },
    { label: "今日可用", value: stats.availableToday, icon: ArrowRight, tint: "text-sky-600" },
    { label: "封禁/异常", value: stats.abnormal, icon: ShieldAlert, tint: "text-red-600" },
  ];

  const togglePwd = (id: string) => setVisiblePwd((prev) => ({ ...prev, [id]: !prev[id] }));

  const canSubmit = form.platformName.trim() && form.username.trim() && form.password.trim();

  const handleAdd = () => {
    if (!canSubmit) return;
    const newAccount: PlatformAccount = {
      id: `acc-m-${Date.now()}`,
      platform: form.platform,
      platformName: form.platformName.trim(),
      username: form.username.trim(),
      password: form.password,
      source: "manual",
      emailId: "",
      email: form.email.trim(),
      proxyId: "",
      health: "healthy",
      ageDays: 0,
      dailyLimit: Number(form.dailyLimit) || 0,
      usedToday: 0,
      totalPublished: 0,
      lastUsed: null,
    };
    setAccounts((prev) => [newAccount, ...prev]);
    setForm(emptyForm);
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">账号总览</h1>
          <p className="text-muted-foreground mt-1">跨平台聚合所有成品账号，供工作流按每日上限调度取用</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/accounts/registration">
              查看注册队列
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            手工添加账号
          </Button>
        </div>
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
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="来源" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部来源</SelectItem>
              {Object.entries(accountSourceConfig).map(([key, cfg]) => (
                <SelectItem key={key} value={key}>
                  {cfg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  <th className="text-muted-foreground px-4 py-3 font-medium">密码</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">来源</th>
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
                  const source = accountSourceConfig[a.source];
                  const usagePct = a.dailyLimit > 0 ? Math.round((a.usedToday / a.dailyLimit) * 100) : 0;
                  const shown = visiblePwd[a.id];
                  return (
                    <tr key={a.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <div className="font-medium">{a.username}</div>
                        <div className="text-muted-foreground text-xs">{a.email || "—"}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <code className="font-mono text-xs">{shown ? a.password : "••••••••"}</code>
                          <button
                            type="button"
                            onClick={() => togglePwd(a.id)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label={shown ? "隐藏密码" : "显示密码"}
                          >
                            {shown ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(a.password)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="复制密码"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <ToneBadge tone={source.tone}>{source.label}</ToneBadge>
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
                    <td colSpan={9} className="text-muted-foreground px-4 py-10 text-center">
                      没有匹配的账号
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 手工添加账号弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>手工添加账号</DialogTitle>
            <DialogDescription>录入运营手上已有的平台账号，将标记为“手工添加”并直接进入账号池</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="acc-platform-name">平台名称 *</Label>
                <Input
                  id="acc-platform-name"
                  placeholder="如 Medium、Reddit"
                  value={form.platformName}
                  onChange={(e) => setForm((f) => ({ ...f, platformName: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="acc-platform-type">平台类型</Label>
                <Select
                  value={form.platform}
                  onValueChange={(v) => setForm((f) => ({ ...f, platform: v as PlatformType }))}
                >
                  <SelectTrigger id="acc-platform-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(platformAccountLabels) as PlatformType[]).map((p) => (
                      <SelectItem key={p} value={p}>
                        {platformAccountLabels[p]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acc-username">用户名 / 账号 *</Label>
              <Input
                id="acc-username"
                placeholder="平台登录用户名"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acc-password">密码 *</Label>
              <Input
                id="acc-password"
                placeholder="平台登录密码"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="acc-email">绑定邮箱</Label>
                <Input
                  id="acc-email"
                  placeholder="可选"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="acc-limit">每日上限</Label>
                <Input
                  id="acc-limit"
                  type="number"
                  min={0}
                  value={form.dailyLimit}
                  onChange={(e) => setForm((f) => ({ ...f, dailyLimit: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} disabled={!canSubmit}>
              添加账号
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

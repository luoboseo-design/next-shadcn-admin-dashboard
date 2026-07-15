"use client";

import { useState } from "react";

import { AtSign, CheckCircle2, Globe, Plus, ShieldCheck, Smartphone, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  emailPool,
  emailProviderLabels,
  emailStatusConfig,
  identityStats,
  proxyPool,
  proxyStatusConfig,
  proxyTypeLabels,
  smsProviders,
  smsStatusConfig,
} from "@/data/identity-resources";

import { ToneBadge } from "../_components/tone-badge";

export default function IdentityResourcesPage() {
  const [showImport, setShowImport] = useState(false);

  const summary = [
    {
      label: "邮箱池",
      value: `${identityStats.emailAvailable}/${identityStats.emailTotal}`,
      sub: "可用/总数",
      icon: AtSign,
    },
    {
      label: "代理 IP",
      value: `${identityStats.proxyHealthy}/${identityStats.proxyTotal}`,
      sub: "健康/总数",
      icon: Globe,
    },
    { label: "接码平台", value: identityStats.smsConnected, sub: "已连接", icon: Smartphone },
    { label: "接码余额", value: `$${identityStats.smsBalance.toFixed(1)}`, sub: "剩余额度", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">身份资源</h1>
          <p className="text-muted-foreground mt-1">管理注册流水线的原材料：邮箱、代理 IP 与接码平台</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-muted-foreground text-sm">{s.label}</p>
                <p className="mt-1 text-2xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-xs">{s.sub}</p>
              </div>
              <s.icon className="text-muted-foreground/40 h-8 w-8" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">邮箱池</TabsTrigger>
          <TabsTrigger value="proxy">代理 IP 池</TabsTrigger>
          <TabsTrigger value="sms">接码平台</TabsTrigger>
        </TabsList>

        {/* ===== 邮箱池 ===== */}
        <TabsContent value="email" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              导入 Gmail / Outlook 账号密码，或使用 Catch-all 域名邮箱无限生成（推荐，防批量封）
            </p>
            <Dialog open={showImport} onOpenChange={setShowImport}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  导入邮箱
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>批量导入邮箱</DialogTitle>
                  <DialogDescription>每行一个，格式：邮箱----密码----辅助邮箱(可选)</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label>邮箱服务商</Label>
                    <Select defaultValue="gmail">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(emailProviderLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>账号列表</Label>
                    <Textarea
                      rows={5}
                      placeholder={
                        "example01@gmail.com----password123----backup@outlook.com\nexample02@gmail.com----password456"
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowImport(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setShowImport(false)}>导入并验证</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="text-muted-foreground px-4 py-3 font-medium">邮箱</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">服务商</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">状态</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">已绑账号</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">已验证</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">最后使用</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailPool.map((e) => {
                      const st = emailStatusConfig[e.status];
                      return (
                        <tr key={e.id} className="border-b last:border-0 hover:bg-muted/40">
                          <td className="px-4 py-3">
                            <div className="font-medium">{e.email}</div>
                            <div className="text-muted-foreground text-xs">密码 {e.passwordMasked}</div>
                          </td>
                          <td className="px-4 py-3">{emailProviderLabels[e.provider]}</td>
                          <td className="px-4 py-3">
                            <ToneBadge tone={st.tone}>{st.label}</ToneBadge>
                          </td>
                          <td className="px-4 py-3">{e.boundAccounts}</td>
                          <td className="px-4 py-3">
                            {e.verified ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <span className="text-muted-foreground text-xs">待验证</span>
                            )}
                          </td>
                          <td className="text-muted-foreground px-4 py-3">{e.lastUsed ?? "从未"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== 代理池 ===== */}
        <TabsContent value="proxy" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">每个账号绑定固定住宅 IP，防止同 IP 批量注册被封</p>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              添加代理
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="text-muted-foreground px-4 py-3 font-medium">代理标签</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">类型</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">地区</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">IP</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">延迟</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">绑定账号</th>
                      <th className="text-muted-foreground px-4 py-3 font-medium">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proxyPool.map((p) => {
                      const st = proxyStatusConfig[p.status];
                      return (
                        <tr key={p.id} className="border-b last:border-0 hover:bg-muted/40">
                          <td className="px-4 py-3 font-medium">{p.label}</td>
                          <td className="px-4 py-3">{proxyTypeLabels[p.type]}</td>
                          <td className="px-4 py-3">{p.country}</td>
                          <td className="text-muted-foreground px-4 py-3 font-mono text-xs">{p.ipMasked}</td>
                          <td className="px-4 py-3">{p.latencyMs > 0 ? `${p.latencyMs}ms` : "-"}</td>
                          <td className="px-4 py-3">{p.boundAccounts}</td>
                          <td className="px-4 py-3">
                            <ToneBadge tone={st.tone}>{st.label}</ToneBadge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== 接码平台 ===== */}
        <TabsContent value="sms" className="space-y-4">
          <p className="text-muted-foreground text-sm">对接接码平台 API，用于需要手机验证码的平台注册</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {smsProviders.map((s) => {
              const st = smsStatusConfig[s.status];
              return (
                <Card key={s.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{s.name}</CardTitle>
                      <ToneBadge tone={st.tone}>{st.label}</ToneBadge>
                    </div>
                    <CardDescription>支持地区：{s.countries.join(" / ")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">账户余额</span>
                      <span className="font-medium">${s.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">本月已用</span>
                      <span>{s.usedThisMonth} 次</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">成功率</span>
                      <span>{s.successRate}%</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

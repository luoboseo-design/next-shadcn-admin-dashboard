"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Gauge,
  Globe,
  Info,
  MessageSquare,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type PrecheckLevel, precheckLevelConfig, precheckTask } from "@/data/capacity-model";
import { platformTypeDetails, platformTypeLabels } from "@/data/mock-platforms";
import { servicePackages } from "@/data/mock-tasks";
import type { CreateTaskFormData, PlatformType } from "@/types/marketing";

const precheckStyles: Record<
  PrecheckLevel,
  { wrap: string; icon: typeof CheckCircle2; iconColor: string; badge: string }
> = {
  ok: {
    wrap: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
    icon: CheckCircle2,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  tight: {
    wrap: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
    icon: AlertTriangle,
    iconColor: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
  insufficient: {
    wrap: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30",
    icon: XCircle,
    iconColor: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  manual: {
    wrap: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30",
    icon: Info,
    iconColor: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
};

interface CreateTaskFormProps {
  selectedPackageId: string;
  onPlatformChange?: (types: PlatformType[]) => void;
}

const platformTypes: PlatformType[] = ["blog", "forum", "news", "social", "directory", "wiki", "profile", "custom"];

export function CreateTaskForm({ selectedPackageId, onPlatformChange }: CreateTaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskFormData>({
    targetUrl: "",
    keywords: "",
    anchorTexts: "",
    quantity: 50,
    platformTypes: [],
    packageId: selectedPackageId,
    customRequirements: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTaskFormData, string>>>({});

  const handlePlatformTypeChange = (type: PlatformType, checked: boolean) => {
    const newTypes = checked ? [...formData.platformTypes, type] : formData.platformTypes.filter((t) => t !== type);

    setFormData((prev) => ({
      ...prev,
      platformTypes: newTypes,
      // 如果取消选择定制，清空定制需求
      customRequirements: !newTypes.includes("custom") ? "" : prev.customRequirements,
    }));

    onPlatformChange?.(newTypes);

    if (errors.platformTypes) {
      setErrors((prev) => ({ ...prev, platformTypes: undefined }));
    }
  };

  const isCustomSelected = formData.platformTypes.includes("custom");

  // 以选中套餐的外链数量作为预检需求量
  const quantity = useMemo(
    () => servicePackages.find((p) => p.id === selectedPackageId)?.quantity ?? formData.quantity,
    [selectedPackageId, formData.quantity],
  );

  // 实时产能预检：随平台类型 / 数量变化重新计算
  const precheck = useMemo(() => {
    if (formData.platformTypes.length === 0) return null;
    return precheckTask(formData.platformTypes, quantity);
  }, [formData.platformTypes, quantity]);

  return (
    <div className="space-y-6">
      {/* 目标 URL */}
      <div className="space-y-2">
        <Label htmlFor="targetUrl">目标 URL *</Label>
        <Input
          id="targetUrl"
          placeholder="https://your-website.com"
          value={formData.targetUrl}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, targetUrl: e.target.value }));
            if (errors.targetUrl) setErrors((prev) => ({ ...prev, targetUrl: undefined }));
          }}
        />
        {errors.targetUrl && <p className="text-sm text-destructive">{errors.targetUrl}</p>}
        <p className="text-sm text-muted-foreground">输入您希望获得外链的目标网页地址</p>
      </div>

      {/* 关键词 */}
      <div className="space-y-2">
        <Label htmlFor="keywords">目标关键词 *</Label>
        <Textarea
          id="keywords"
          placeholder="SEO优化, 网站推广, 外链建设"
          value={formData.keywords}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, keywords: e.target.value }));
            if (errors.keywords) setErrors((prev) => ({ ...prev, keywords: undefined }));
          }}
          rows={3}
        />
        {errors.keywords && <p className="text-sm text-destructive">{errors.keywords}</p>}
        <p className="text-sm text-muted-foreground">输入您希望排名的关键词，多个关键词用逗号分隔</p>
      </div>

      {/* 锚文本 */}
      <div className="space-y-2">
        <Label htmlFor="anchorTexts">锚文本（可选）</Label>
        <Input
          id="anchorTexts"
          placeholder="品牌名, 产品名, 关键词"
          value={formData.anchorTexts}
          onChange={(e) => setFormData((prev) => ({ ...prev, anchorTexts: e.target.value }))}
        />
        <p className="text-sm text-muted-foreground">自定义锚文本，留空则 AI 自动生成</p>
      </div>

      <div className="space-y-3">
        <Label>平台类型 *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platformTypes.map((type) => {
            return (
              <div
                key={type}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={`platform-${type}`}
                  checked={formData.platformTypes.includes(type)}
                  onCheckedChange={(checked) => handlePlatformTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={`platform-${type}`} className="text-sm font-normal cursor-pointer">
                  {platformTypeLabels[type]}
                </Label>
              </div>
            );
          })}
        </div>
        {errors.platformTypes && <p className="text-sm text-destructive">{errors.platformTypes}</p>}
      </div>

      {/* 定制需求输入框 */}
      {isCustomSelected && (
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold">定制需求</h4>
              <p className="text-sm text-muted-foreground">请详细描述您的外链建设需求</p>
            </div>
          </div>
          <Textarea
            placeholder="请描述您的需求，例如：&#10;- 目标行业或领域&#10;- 期望的平台类型&#10;- 特殊要求（语言、地区、DA要求等）&#10;- 预算范围&#10;- 其他补充说明"
            value={formData.customRequirements}
            onChange={(e) => setFormData((prev) => ({ ...prev, customRequirements: e.target.value }))}
            rows={6}
            className="bg-white dark:bg-background"
          />
          <p className="text-sm text-muted-foreground mt-2">提交后我们的顾问将在 24 小时内与您联系，制定专属方案</p>
        </div>
      )}

      {/* 单选平台详情（非定制类型） */}
      {formData.platformTypes.length === 1 && formData.platformTypes[0] !== "custom" && (
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">{platformTypeDetails[formData.platformTypes[0]].label}平台</h4>
              <p className="text-sm text-muted-foreground">
                {platformTypeDetails[formData.platformTypes[0]].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>DA {platformTypeDetails[formData.platformTypes[0]].avgDA}+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>{platformTypeDetails[formData.platformTypes[0]].avgPublishTime}</span>
            </div>
          </div>

          <ul className="space-y-1.5">
            {platformTypeDetails[formData.platformTypes[0]].features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              可用平台数：{platformTypeDetails[formData.platformTypes[0]].totalPlatforms} 个
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cases/${formData.platformTypes[0]}`} className="gap-1.5">
                查看案例
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* 多选平台提示（排除只选了定制的情况） */}
      {formData.platformTypes.length > 1 && !(formData.platformTypes.length === 1 && isCustomSelected) && (
        <div className="p-4 rounded-lg border bg-muted/30">
          <p className="text-sm text-muted-foreground mb-2">已选择 {formData.platformTypes.length} 种平台类型</p>
          <div className="flex flex-wrap gap-2">
            {formData.platformTypes.map((type) => (
              <span key={type} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {platformTypeLabels[type]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 产能预检：实时评估资源能否承接该任务 */}
      {precheck &&
        (() => {
          const style = precheckStyles[precheck.level];
          const StatusIcon = style.icon;
          return (
            <div className={`rounded-lg border p-4 ${style.wrap}`}>
              <div className="flex items-start gap-3">
                <StatusIcon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconColor}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Gauge className="h-4 w-4" />
                      资源预检
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>
                      {precheckLevelConfig[precheck.level].label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-foreground/80">{precheck.message}</p>
                  {precheck.suggestion && <p className="mt-1 text-sm text-muted-foreground">{precheck.suggestion}</p>}

                  {/* 关键指标 */}
                  {precheck.level !== "manual" && (
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-muted-foreground">日产能</p>
                        <p className="text-sm font-semibold">{precheck.dailyCapacity} 条/天</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">今日可用</p>
                        <p className="text-sm font-semibold">{precheck.availableToday} 条</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">现有积压</p>
                        <p className="text-sm font-semibold">{precheck.backlog} 条</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">预计完成</p>
                        <p className="text-sm font-semibold">{precheck.estDays} 天</p>
                      </div>
                    </div>
                  )}

                  {/* 分平台明细 */}
                  {precheck.byType.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {precheck.byType.map((t) => (
                        <span
                          key={t.type}
                          className="rounded-md bg-background/60 px-2 py-1 text-xs text-muted-foreground"
                        >
                          {t.label}：{t.healthyAccounts} 账号 · {t.dailyCapacity} 条/天
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 资源不足时引导补充账号 */}
                  {precheck.level === "insufficient" && (
                    <Button variant="outline" size="sm" className="mt-3 gap-1.5" asChild>
                      <Link href="/admin/accounts/registration">
                        前往注册队列补充账号
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}

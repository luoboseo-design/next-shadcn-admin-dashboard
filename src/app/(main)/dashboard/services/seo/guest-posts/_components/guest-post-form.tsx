"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Clock, ExternalLink, FileText, Globe, MessageSquare, Sparkles, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  guestPostPlatformLabels,
  guestPostPlatformDetails,
  contentModeLabels,
  contentModeDetails,
  platformTierLabels,
  type GuestPostPlatformType,
  type PlatformTier,
  type ContentMode,
  type GuestPostFormData,
} from "@/data/guest-posts";

const platformTypes: GuestPostPlatformType[] = ["tech", "business", "content", "custom"];

interface GuestPostFormProps {
  selectedPackageId: string;
  selectedPlatform?: GuestPostPlatformType;
  selectedTier?: PlatformTier;
  onPlatformChange?: (platform: GuestPostPlatformType | null) => void;
  onTierChange?: (tier: PlatformTier) => void;
  hidePlatformSelection?: boolean;
}

export function GuestPostForm({ 
  selectedPackageId, 
  selectedPlatform: externalPlatform,
  selectedTier: externalTier,
  onPlatformChange, 
  onTierChange,
  hidePlatformSelection = false,
}: GuestPostFormProps) {
  const [formData, setFormData] = useState<GuestPostFormData>({
    websiteUrl: "",
    companyName: "",
    industry: "",
    contentMode: "ai",
    topics: "",
    keywords: "",
    articleContent: "",
    platformType: externalPlatform || "tech",
    platformTier: externalTier || "standard",
    packageId: selectedPackageId,
    customRequirements: "",
  });

  // Sync with external platform/tier changes
  useState(() => {
    if (externalPlatform) {
      setFormData((prev) => ({ ...prev, platformType: externalPlatform }));
    }
    if (externalTier) {
      setFormData((prev) => ({ ...prev, platformTier: externalTier }));
    }
  });

  const handlePlatformChange = (platform: GuestPostPlatformType) => {
    setFormData((prev) => ({ ...prev, platformType: platform }));
    onPlatformChange?.(platform);
  };

  const handleTierChange = (tier: PlatformTier) => {
    setFormData((prev) => ({ ...prev, platformTier: tier }));
    onTierChange?.(tier);
  };

  const handleContentModeChange = (mode: ContentMode) => {
    setFormData((prev) => ({
      ...prev,
      contentMode: mode,
      articleContent: mode === "ai" ? "" : prev.articleContent,
    }));
  };

  const isCustomSelected = (externalPlatform || formData.platformType) === "custom";
  const selectedPlatformInfo = guestPostPlatformDetails[externalPlatform || formData.platformType];

  return (
    <div className="space-y-6">
      {/* 基础信息 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          基础信息
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">网站 URL *</Label>
            <Input
              id="websiteUrl"
              placeholder="https://your-website.com"
              value={formData.websiteUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">公司/品牌名称 *</Label>
            <Input
              id="companyName"
              placeholder="您的公司或品牌名称"
              value={formData.companyName}
              onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">行业领域 *</Label>
          <Input
            id="industry"
            placeholder="如：科技、金融、电商、教育..."
            value={formData.industry}
            onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
          />
        </div>
      </div>

      {/* 内容创作模式 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          内容创作模式
        </h3>

        <RadioGroup
          value={formData.contentMode}
          onValueChange={(value) => handleContentModeChange(value as ContentMode)}
          className="grid gap-3 md:grid-cols-2"
        >
          {(["ai", "provided"] as ContentMode[]).map((mode) => {
            const detail = contentModeDetails[mode];
            const isSelected = formData.contentMode === mode;

            return (
              <label
                key={mode}
                className={`relative flex cursor-pointer rounded-lg border p-4 transition-all ${
                  isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/30"
                }`}
              >
                <RadioGroupItem value={mode} className="sr-only" />
                <div className="flex gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {mode === "ai" ? (
                      <Sparkles className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    ) : (
                      <Upload className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold">{contentModeLabels[mode]}</div>
                    <div className="text-sm text-muted-foreground">{detail.description}</div>
                  </div>
                </div>
                {isSelected && (
                  <Check className="absolute right-4 top-4 h-4 w-4 text-primary" />
                )}
              </label>
            );
          })}
        </RadioGroup>
      </div>

      {/* 内容设置 - AI 模式 */}
      {formData.contentMode === "ai" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            内容设置
          </h3>

          <div className="space-y-2">
            <Label htmlFor="topics">文章主题 *</Label>
            <Textarea
              id="topics"
              placeholder="请描述您希望文章涵盖的主题，多个主题可分行输入"
              value={formData.topics}
              onChange={(e) => setFormData((prev) => ({ ...prev, topics: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">目标关键词 *</Label>
            <Input
              id="keywords"
              placeholder="SEO优化, 内容营销, 品牌推广"
              value={formData.keywords}
              onChange={(e) => setFormData((prev) => ({ ...prev, keywords: e.target.value }))}
            />
            <p className="text-sm text-muted-foreground">
              输入希望在文章中嵌入的关键词，多个关键词用逗号分隔
            </p>
          </div>
        </div>
      )}

      {/* 内容设置 - 用户提供文章 */}
      {formData.contentMode === "provided" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            文章内容
          </h3>

          <div className="space-y-2">
            <Label htmlFor="articleContent">粘贴文章内容 *</Label>
            <Textarea
              id="articleContent"
              placeholder="请将您的文章内容粘贴到此处..."
              value={formData.articleContent}
              onChange={(e) => setFormData((prev) => ({ ...prev, articleContent: e.target.value }))}
              rows={8}
            />
            <p className="text-sm text-muted-foreground">
              建议文章长度 1000-3000 字，我们会进行格式调整和外链植入优化
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">目标关键词</Label>
            <Input
              id="keywords"
              placeholder="希望优化的关键词（可选）"
              value={formData.keywords}
              onChange={(e) => setFormData((prev) => ({ ...prev, keywords: e.target.value }))}
            />
          </div>
        </div>
      )}

      {/* 平台选择 - 可隐藏 */}
      {!hidePlatformSelection && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            平台选择
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {platformTypes.map((type) => (
              <div
                key={type}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={`platform-${type}`}
                  checked={formData.platformType === type}
                  onCheckedChange={(checked) => {
                    if (checked) handlePlatformChange(type);
                  }}
                />
                <Label htmlFor={`platform-${type}`} className="text-sm font-normal cursor-pointer">
                  {guestPostPlatformLabels[type]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 平台详情（非定制）- 可隐藏 */}
      {!hidePlatformSelection && !isCustomSelected && (
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">{selectedPlatformInfo.label}</h4>
              <p className="text-sm text-muted-foreground">{selectedPlatformInfo.description}</p>
            </div>
          </div>

          {/* 平台等级选择 */}
          <div className="mb-4">
            <Label className="text-sm mb-2 block">选择平台等级</Label>
            <RadioGroup
              value={formData.platformTier}
              onValueChange={(value) => handleTierChange(value as PlatformTier)}
              className="grid grid-cols-3 gap-2"
            >
              {selectedPlatformInfo.tiers.map((tier) => (
                <label
                  key={tier.tier}
                  className={`relative flex flex-col cursor-pointer rounded-lg border p-3 text-center transition-all ${
                    formData.platformTier === tier.tier
                      ? "border-primary bg-white dark:bg-background"
                      : "hover:border-muted-foreground/30"
                  }`}
                >
                  <RadioGroupItem value={tier.tier} className="sr-only" />
                  <span className="font-semibold text-sm">{platformTierLabels[tier.tier]}</span>
                  <span className="text-xs text-muted-foreground">{tier.daRange}</span>
                  <span className="text-sm font-bold mt-1">${tier.pricePerArticle}/篇</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* 特性列表 */}
          <ul className="space-y-1.5 mb-3">
            {selectedPlatformInfo.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* 示例平台 */}
          <div className="flex flex-wrap gap-1.5">
            {selectedPlatformInfo.platforms.slice(0, 6).map((platform) => (
              <span
                key={platform}
                className="px-2 py-0.5 bg-white dark:bg-background rounded text-xs"
              >
                {platform}
              </span>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedPlatformInfo.tiers.find((t) => t.tier === formData.platformTier)?.examples.length || 0}+ 个可用平台
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cases/guest-posts/${formData.platformType}`} className="gap-1.5">
                查看案例
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* 定制需求 - 可隐藏 */}
      {!hidePlatformSelection && isCustomSelected && (
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold">定制需求</h4>
              <p className="text-sm text-muted-foreground">请详细描述您的客座文章需求</p>
            </div>
          </div>
          <Textarea
            placeholder="请描述您的需求，例如：&#10;- 目标发布平台&#10;- 行业或领域要求&#10;- 文章风格偏好&#10;- 预算范围&#10;- 时间要求"
            value={formData.customRequirements}
            onChange={(e) => setFormData((prev) => ({ ...prev, customRequirements: e.target.value }))}
            rows={6}
            className="bg-white dark:bg-background"
          />
          <p className="text-sm text-muted-foreground mt-2">
            提交后我们的顾问将在 24 小时内与您联系，制定专属方案
          </p>
        </div>
      )}
    </div>
  );
}

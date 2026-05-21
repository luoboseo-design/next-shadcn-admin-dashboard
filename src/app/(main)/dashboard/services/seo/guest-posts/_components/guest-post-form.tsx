"use client";

import { useState } from "react";
import { Check, Clock, Sparkles, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  drTierLabels,
  drTierDetails,
  contentModeLabels,
  contentModeDetails,
  type DRTier,
  type ContentMode,
  type GuestPostFormData,
} from "@/data/guest-posts";

const drTiers: DRTier[] = ["dr30", "dr50", "dr70", "dr80"];

interface GuestPostFormProps {
  selectedPackageId: string;
  onDRTierChange?: (tier: DRTier) => void;
}

export function GuestPostForm({ selectedPackageId, onDRTierChange }: GuestPostFormProps) {
  const [formData, setFormData] = useState<GuestPostFormData>({
    websiteUrl: "",
    companyName: "",
    industry: "",
    contentMode: "ai",
    topics: "",
    keywords: "",
    articleContent: "",
    drTier: "dr50",
    packageId: selectedPackageId,
    customRequirements: "",
  });

  const handleDRTierChange = (tier: DRTier) => {
    setFormData((prev) => ({ ...prev, drTier: tier }));
    onDRTierChange?.(tier);
  };

  const handleContentModeChange = (mode: ContentMode) => {
    setFormData((prev) => ({
      ...prev,
      contentMode: mode,
      articleContent: mode === "ai" ? "" : prev.articleContent,
    }));
  };

  const selectedDRInfo = drTierDetails[formData.drTier];

  return (
    <div className="space-y-6">
      {/* DR 选择 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          DR 选择
        </h3>

        <RadioGroup
          value={formData.drTier}
          onValueChange={(value) => handleDRTierChange(value as DRTier)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {drTiers.map((tier) => {
            const info = drTierDetails[tier];
            const isSelected = formData.drTier === tier;

            return (
              <label
                key={tier}
                className={`relative flex flex-col cursor-pointer rounded-lg border p-4 transition-all ${
                  isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/30"
                }`}
              >
                <RadioGroupItem value={tier} className="sr-only" />
                <span className="font-bold text-lg">{info.label}</span>
                <span className="text-xl font-bold text-primary mt-1">${info.pricePerArticle}</span>
                <span className="text-xs text-muted-foreground">/篇</span>
                {isSelected && (
                  <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
                )}
              </label>
            );
          })}
        </RadioGroup>

        {/* DR 等级说明 */}
        <div className="p-4 rounded-lg border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold">{selectedDRInfo.label}</h4>
              <p className="text-sm text-muted-foreground">{selectedDRInfo.description}</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {selectedDRInfo.deliveryDays}
            </div>
          </div>
          
          <ul className="grid grid-cols-2 gap-2 mb-3">
            {selectedDRInfo.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t">
            <span className="text-xs text-muted-foreground">示例平台：</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {selectedDRInfo.examples.map((ex) => (
                <span key={ex} className="px-2 py-0.5 bg-background rounded text-xs">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}

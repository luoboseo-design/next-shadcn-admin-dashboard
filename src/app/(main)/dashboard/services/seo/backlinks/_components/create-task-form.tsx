"use client";

import { useState } from "react";

import { Check, Clock, Globe } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { platformTypeDetails, platformTypeLabels } from "@/data/mock-platforms";
import type { CreateTaskFormData, PlatformType } from "@/types/marketing";

interface CreateTaskFormProps {
  selectedPackageId: string;
  onPlatformChange?: (types: PlatformType[]) => void;
}

const platformTypes: PlatformType[] = ["blog", "forum", "news", "social", "directory", "wiki"];

export function CreateTaskForm({ selectedPackageId, onPlatformChange }: CreateTaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskFormData>({
    targetUrl: "",
    keywords: "",
    anchorTexts: "",
    quantity: 50,
    platformTypes: [],
    packageId: selectedPackageId,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTaskFormData, string>>>({});

  const handlePlatformTypeChange = (type: PlatformType, checked: boolean) => {
    const newTypes = checked ? [...formData.platformTypes, type] : formData.platformTypes.filter((t) => t !== type);

    setFormData((prev) => ({
      ...prev,
      platformTypes: newTypes,
    }));

    onPlatformChange?.(newTypes);

    if (errors.platformTypes) {
      setErrors((prev) => ({ ...prev, platformTypes: undefined }));
    }
  };

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

      {/* 单选平台详情 */}
      {formData.platformTypes.length === 1 && (
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

          <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
            可用平台数：{platformTypeDetails[formData.platformTypes[0]].totalPlatforms} 个
          </div>
        </div>
      )}

      {/* 多选平台提示 */}
      {formData.platformTypes.length > 1 && (
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
    </div>
  );
}

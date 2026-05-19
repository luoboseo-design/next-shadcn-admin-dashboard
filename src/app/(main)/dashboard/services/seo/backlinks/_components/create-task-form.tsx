"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { platformTypeLabels } from "@/data/mock-platforms";
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

    </div>
  );
}

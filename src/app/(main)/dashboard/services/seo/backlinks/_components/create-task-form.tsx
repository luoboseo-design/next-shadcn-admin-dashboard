"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { platformTypeLabels, platformTypeDetails } from "@/data/mock-platforms";
import type { PlatformType, CreateTaskFormData } from "@/types/marketing";
import { ArrowRight, Loader2 } from "lucide-react";

interface CreateTaskFormProps {
  selectedPackageId: string;
  onPlatformChange?: (types: PlatformType[]) => void;
}

const platformTypes: PlatformType[] = ["blog", "forum", "news", "social", "directory", "wiki"];

export function CreateTaskForm({ selectedPackageId, onPlatformChange }: CreateTaskFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateTaskFormData>({
    targetUrl: "",
    keywords: "",
    anchorTexts: "",
    quantity: 50,
    platformTypes: [],
    packageId: selectedPackageId,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTaskFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateTaskFormData, string>> = {};

    if (!formData.targetUrl.trim()) {
      newErrors.targetUrl = "请输入目标 URL";
    } else {
      try {
        const url = formData.targetUrl.startsWith("http")
          ? formData.targetUrl
          : `https://${formData.targetUrl}`;
        new URL(url);
      } catch {
        newErrors.targetUrl = "请输入有效的 URL";
      }
    }

    if (!formData.keywords.trim()) {
      newErrors.keywords = "请输入至少一个关键词";
    }

    if (formData.platformTypes.length === 0) {
      newErrors.platformTypes = "请至少选择一种平台类型";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 跳转到任务中心
    router.push("/dashboard/tasks");
  };

  const handlePlatformTypeChange = (type: PlatformType, checked: boolean) => {
    const newTypes = checked
      ? [...formData.platformTypes, type]
      : formData.platformTypes.filter((t) => t !== type);
    
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
    <form onSubmit={handleSubmit} className="space-y-6">
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
        {errors.targetUrl && (
          <p className="text-sm text-destructive">{errors.targetUrl}</p>
        )}
        <p className="text-sm text-muted-foreground">
          输入您希望获得外链的目标网页地址
        </p>
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
        {errors.keywords && (
          <p className="text-sm text-destructive">{errors.keywords}</p>
        )}
        <p className="text-sm text-muted-foreground">
          输入您希望排名的关键词，多个关键词用逗号分隔
        </p>
      </div>

      {/* 锚文本 */}
      <div className="space-y-2">
        <Label htmlFor="anchorTexts">锚文本（可选）</Label>
        <Input
          id="anchorTexts"
          placeholder="品牌名, 产品名, 关键词"
          value={formData.anchorTexts}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, anchorTexts: e.target.value }))
          }
        />
        <p className="text-sm text-muted-foreground">
          自定义锚文本，留空则 AI 自动生成
        </p>
      </div>

      {/* 平台类型 */}
      <div className="space-y-3">
        <Label>平台类型 *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platformTypes.map((type) => {
            const info = platformTypeDetails[type];
            return (
              <div 
                key={type} 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={`platform-${type}`}
                  checked={formData.platformTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    handlePlatformTypeChange(type, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`platform-${type}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  {platformTypeLabels[type]}
                  <span className="text-xs text-muted-foreground">${info.pricePerLink}/条</span>
                </Label>
              </div>
            );
          })}
        </div>
        {errors.platformTypes && (
          <p className="text-sm text-destructive">{errors.platformTypes}</p>
        )}
      </div>



      {/* 提交按钮 */}
      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            提交中...
          </>
        ) : (
          <>
            创建任务
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { servicePackages } from "@/data/mock-tasks";
import { platformTypeLabels, platformTypeDetails } from "@/data/mock-platforms";
import type { PlatformType, CreateTaskFormData } from "@/types/marketing";
import { ArrowRight, Loader2, Check, Clock, Globe, DollarSign } from "lucide-react";

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

  const selectedPackage = servicePackages.find((p) => p.id === selectedPackageId);

  // 计算选中平台的总价格
  const platformPricing = useMemo(() => {
    if (formData.platformTypes.length === 0) {
      return null;
    }
    
    const totalPricePerLink = formData.platformTypes.reduce((sum, type) => {
      return sum + platformTypeDetails[type].pricePerLink;
    }, 0);
    
    const avgPricePerLink = totalPricePerLink / formData.platformTypes.length;
    
    return {
      avgPricePerLink: Math.round(avgPricePerLink * 100) / 100,
      totalPricePerLink,
      selectedCount: formData.platformTypes.length,
    };
  }, [formData.platformTypes]);

  // 获取单选平台的详细信息
  const singlePlatformInfo = useMemo(() => {
    if (formData.platformTypes.length === 1) {
      return platformTypeDetails[formData.platformTypes[0]];
    }
    return null;
  }, [formData.platformTypes]);

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

      {/* 套餐信息 + 平台详情 */}
      {selectedPackage && (
        <div className="space-y-4">
          {/* 套餐信息 */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">已选套餐：{selectedPackage.name}</span>
              <span className="text-lg font-bold">
                ${platformPricing 
                  ? Math.round(platformPricing.avgPricePerLink * selectedPackage.quantity)
                  : selectedPackage.totalPrice
                }
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedPackage.quantity} 条外链 · 
              ${platformPricing ? platformPricing.avgPricePerLink : selectedPackage.pricePerLink}/条
              {platformPricing && platformPricing.selectedCount > 1 && (
                <span className="ml-1">（{platformPricing.selectedCount}种平台均价）</span>
              )}
            </div>
          </div>

          {/* 单选平台详情 */}
          {singlePlatformInfo && (
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{singlePlatformInfo.label}平台</h4>
                  <p className="text-sm text-muted-foreground">{singlePlatformInfo.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>${singlePlatformInfo.pricePerLink}/条</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>DA {singlePlatformInfo.avgDA}+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>{singlePlatformInfo.avgPublishTime}</span>
                </div>
              </div>

              <ul className="space-y-1.5">
                {singlePlatformInfo.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                可用平台数：{singlePlatformInfo.totalPlatforms} 个
              </div>
            </div>
          )}

          {/* 多选平台提示 */}
          {formData.platformTypes.length > 1 && (
            <div className="p-3 rounded-lg border bg-muted/30 text-sm text-muted-foreground">
              已选择 {formData.platformTypes.length} 种平台类型：
              {formData.platformTypes.map(t => platformTypeLabels[t]).join("、")}
            </div>
          )}
        </div>
      )}

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

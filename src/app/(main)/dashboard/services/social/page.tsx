"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  MessageSquare,
  Heart,
  Users,
  FileText,
  Check,
  ArrowRight,
  Loader2,
  Plus,
  Minus,
  Sparkles,
  Upload,
} from "lucide-react";
import {
  socialServices,
  platformLabels,
  serviceTypeLabels,
  qualityLabels,
  type SocialPlatform,
  type ServiceType,
  type SocialService,
} from "@/data/social-media";
import { cn } from "@/lib/utils";

// 服务类型图标
const serviceTypeIcons: Record<ServiceType, React.ElementType> = {
  post: FileText,
  comment: MessageSquare,
  like: Heart,
  follower: Users,
};

// 平台样式
const platformStyles: Record<SocialPlatform, { bg: string; label: string }> = {
  reddit: { bg: "bg-orange-500", label: "R" },
  instagram: { bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500", label: "IG" },
  x: { bg: "bg-black", label: "X" },
};

export default function SocialMediaServicePage() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>("reddit");
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>("post");
  const [contentMode, setContentMode] = useState<"ai" | "custom">("ai");
  const [selectedService, setSelectedService] = useState<SocialService | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [targetUrl, setTargetUrl] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 根据平台和服务类型过滤套餐
  const availableServices = useMemo(() => {
    return socialServices.filter(
      (s) => s.platform === selectedPlatform && s.serviceType === selectedServiceType
    );
  }, [selectedPlatform, selectedServiceType]);

  // 当平台或服务类型改变时，重置选中的套餐
  const handlePlatformChange = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setSelectedService(null);
  };

  const handleServiceTypeChange = (type: ServiceType) => {
    setSelectedServiceType(type);
    setSelectedService(null);
  };

  // 选择套餐
  const handleSelectService = (service: SocialService) => {
    setSelectedService(service);
    setQuantity(service.minQuantity);
  };

  // 计算总价
  const totalPrice = selectedService ? selectedService.price * quantity : 0;

  // 提交订单
  const handleSubmit = async () => {
    if (!selectedService) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard/tasks");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Share2 className="h-7 w-7 text-primary" />
          社交媒体服务
        </h1>
        <p className="text-muted-foreground mt-1">
          提升社交媒体影响力，获得更多曝光和互动
        </p>
      </div>

      {/* 主要内容：左右布局 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧：创建任务表单 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 选择平台 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">选择平台</CardTitle>
              <CardDescription>选择您要推广的社交媒体平台</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(platformLabels) as SocialPlatform[]).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handlePlatformChange(platform)}
                    className={cn(
                      "flex items-center gap-3 px-5 py-3 rounded-lg border-2 transition-all",
                      selectedPlatform === platform
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white",
                        platformStyles[platform].bg
                      )}
                    >
                      {platformStyles[platform].label}
                    </div>
                    <span className="font-medium">{platformLabels[platform]}</span>
                    {selectedPlatform === platform && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 选择服务类型 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">选择服务类型</CardTitle>
              <CardDescription>选择您需要的服务类型</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(serviceTypeLabels) as ServiceType[]).map((type) => {
                  const Icon = serviceTypeIcons[type];
                  return (
                    <button
                      key={type}
                      onClick={() => handleServiceTypeChange(type)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                        selectedServiceType === type
                          ? "border-primary bg-primary/5"
                          : "border-transparent bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          selectedServiceType === type
                            ? "bg-primary text-primary-foreground"
                            : "bg-background"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-sm">{serviceTypeLabels[type]}</span>
                      {selectedServiceType === type && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 内容创作模式 - 仅发帖时显示 */}
          {selectedServiceType === "post" && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">内容创作模式</CardTitle>
                <CardDescription>选择帖子内容的创作方式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setContentMode("ai")}
                    className={cn(
                      "relative flex flex-col items-start gap-2 p-4 rounded-lg border-2 transition-all text-left",
                      contentMode === "ai"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        contentMode === "ai" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <span className="font-medium">AI 智能生成</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      提供主题和关键词，AI 自动生成高质量的帖子内容
                    </p>
                    {contentMode === "ai" && (
                      <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
                    )}
                  </button>

                  <button
                    onClick={() => setContentMode("custom")}
                    className={cn(
                      "relative flex flex-col items-start gap-2 p-4 rounded-lg border-2 transition-all text-left",
                      contentMode === "custom"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        contentMode === "custom" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        <Upload className="h-4 w-4" />
                      </div>
                      <span className="font-medium">自行提供内容</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      您提供已写好的内容，我们负责审核并发布到目标平台
                    </p>
                    {contentMode === "custom" && (
                      <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 任务详情表单 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">任务详情</CardTitle>
              <CardDescription>填写您的任务需求</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 发帖服务 - AI模式显示主题和关键词 */}
              {selectedServiceType === "post" && contentMode === "ai" && (
                <>
                  <div className="space-y-2">
                    <Label>主题/话题 <span className="text-destructive">*</span></Label>
                    <Input
                      placeholder="如：科技产品评测、健身技巧分享..."
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>关键词（可选）</Label>
                    <Input
                      placeholder="多个关键词用逗号分隔..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>内容方向说明（可选）</Label>
                    <Textarea
                      placeholder="描述您希望的内容风格、目标受众、核心观点等..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* 发帖服务 - 自定义模式显示内容输入 */}
              {selectedServiceType === "post" && contentMode === "custom" && (
                <>
                  <div className="space-y-2">
                    <Label>帖子内容 <span className="text-destructive">*</span></Label>
                    <Textarea
                      placeholder="输入您要发布的帖子内容..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      请确保内容符合平台规范，我们会进行审核后发布
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>目标 Subreddit / 话题（可选）</Label>
                    <Input
                      placeholder="如：r/technology、#科技..."
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* 非发帖服务 - 显示目标链接 */}
              {selectedServiceType !== "post" && (
                <>
                  <div className="space-y-2">
                    <Label>
                      {selectedServiceType === "follower" ? "账号主页链接" : "目标链接"} 
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      placeholder={
                        selectedServiceType === "follower"
                          ? "输入您的账号主页链接..."
                          : "输入目标帖子/推文链接..."
                      }
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>特殊要求（可选）</Label>
                    <Textarea
                      placeholder="描述您的特殊需求..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右侧：套餐选择 + 订单汇总 */}
        <div className="space-y-6">
          {/* 套餐列表 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">选择套餐</CardTitle>
              <CardDescription>
                {platformLabels[selectedPlatform]} · {serviceTypeLabels[selectedServiceType]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableServices.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  暂无该类型服务
                </div>
              ) : (
                availableServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      selectedService?.id === service.id
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{service.name}</span>
                          {selectedService?.id === service.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {service.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0",
                          service.quality === "elite" &&
                            "bg-amber-100 text-amber-700 border-amber-200",
                          service.quality === "premium" &&
                            "bg-blue-100 text-blue-700 border-blue-200"
                        )}
                      >
                        {qualityLabels[service.quality]}
                      </Badge>
                    </div>

                    {/* 特性标签 */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* 价格和交付时间 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">${service.price}</span>
                        <span className="text-sm text-muted-foreground">
                          /{service.unit}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {service.turnaround}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* 订单汇总 */}
          {selectedService && (
            <Card className="border-primary">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">订单汇总</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 已选套餐 */}
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="font-medium">{selectedService.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${selectedService.price}/{selectedService.unit} · {selectedService.turnaround}
                  </div>
                </div>

                {/* 数量选择 */}
                <div className="space-y-2">
                  <Label>数量（{selectedService.unit}）</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() =>
                        setQuantity(Math.max(selectedService.minQuantity, quantity - 1))
                      }
                      disabled={quantity <= selectedService.minQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || selectedService.minQuantity;
                        setQuantity(
                          Math.min(
                            Math.max(val, selectedService.minQuantity),
                            selectedService.maxQuantity
                          )
                        );
                      }}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() =>
                        setQuantity(Math.min(selectedService.maxQuantity, quantity + 1))
                      }
                      disabled={quantity >= selectedService.maxQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    范围：{selectedService.minQuantity} - {selectedService.maxQuantity}{" "}
                    {selectedService.unit}
                  </p>
                </div>

                {/* 价格计算 */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">单价</span>
                    <span>
                      ${selectedService.price}/{selectedService.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">数量</span>
                    <span>
                      {quantity} {selectedService.unit}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-primary/20">
                    <span className="font-semibold">总计</span>
                    <span className="text-xl font-bold text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 提交按钮 */}
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={!selectedService || isSubmitting}
          >
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
        </div>
      </div>
    </div>
  );
}

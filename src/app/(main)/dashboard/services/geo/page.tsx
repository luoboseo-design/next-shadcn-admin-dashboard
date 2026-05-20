"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Search,
  FileEdit,
  Activity,
  Check,
  ArrowRight,
  Loader2,
  Sparkles,
  TrendingUp,
  Eye,
  Zap,
} from "lucide-react";
import {
  geoServices,
  geoPackages,
  serviceTypeLabels,
  aiPlatformLabels,
  type GeoServiceType,
  type AiPlatform,
  type GeoService,
} from "@/data/geo-service";
import { cn } from "@/lib/utils";

const serviceTypeIcons: Record<GeoServiceType, React.ReactNode> = {
  audit: <Search className="h-5 w-5" />,
  optimization: <FileEdit className="h-5 w-5" />,
  monitoring: <Activity className="h-5 w-5" />,
};

export default function GeoServicePage() {
  const router = useRouter();
  const [selectedServiceType, setSelectedServiceType] = useState<GeoServiceType>("audit");
  const [selectedPlatforms, setSelectedPlatforms] = useState<AiPlatform[]>(["chatgpt", "gemini", "perplexity"]);
  const [selectedService, setSelectedService] = useState<GeoService | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 筛选对应类型的服务
  const filteredServices = geoServices.filter(
    (service) => service.type === selectedServiceType
  );

  // 切换平台选择
  const togglePlatform = (platform: AiPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // 提交任务
  const handleSubmit = async () => {
    if (!selectedService || !websiteUrl || !brandName) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard/tasks");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary" />
          GEO 服务
        </h1>
        <p className="text-muted-foreground mt-1">
          优化品牌在 AI 搜索引擎中的可见度，抢占 AI 时代流量先机
        </p>
      </div>

      {/* 主要内容 - Tabs */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="create" className="gap-2">
            <Zap className="h-4 w-4" />
            单次服务
          </TabsTrigger>
          <TabsTrigger value="packages" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            订阅套餐
          </TabsTrigger>
        </TabsList>

        {/* 单次服务 Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 左侧：选择区域 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 选择服务类型 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">选择服务类型</CardTitle>
                  <CardDescription>根据需求选择合适的 GEO 服务</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {(Object.keys(serviceTypeLabels) as GeoServiceType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedServiceType(type);
                          setSelectedService(null);
                        }}
                        className={cn(
                          "relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                          selectedServiceType === type
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center",
                            selectedServiceType === type
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          {serviceTypeIcons[type]}
                        </div>
                        <span className="font-medium text-sm">{serviceTypeLabels[type]}</span>
                        {selectedServiceType === type && (
                          <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 选择 AI 平台 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">选择 AI 平台</CardTitle>
                  <CardDescription>选择需要覆盖的 AI 搜索引擎</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {(Object.keys(aiPlatformLabels) as AiPlatform[]).map((platform) => (
                      <button
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
                          selectedPlatforms.includes(platform)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">{aiPlatformLabels[platform]}</span>
                        {selectedPlatforms.includes(platform) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 任务详情表单 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">任务详情</CardTitle>
                  <CardDescription>填写您的品牌和网站信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>品牌名称 <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="输入品牌名称..."
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>网站地址 <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>核心关键词</Label>
                    <Input
                      placeholder="多个关键词用逗号分隔，如：AI 工具, 效率软件, 自动化..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      这些关键词将用于测试 AI 对您品牌的引用情况
                    </p>
                  </div>

                  {selectedServiceType !== "optimization" && (
                    <div className="space-y-2">
                      <Label>竞争对手（可选）</Label>
                      <Textarea
                        placeholder="每行一个竞争对手网址或品牌名..."
                        value={competitors}
                        onChange={(e) => setCompetitors(e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}

                  {selectedServiceType === "optimization" && (
                    <div className="space-y-2">
                      <Label>优化目标页面</Label>
                      <Textarea
                        placeholder="每行一个需要优化的页面 URL..."
                        rows={3}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 右侧：服务选择 + 订单汇总 */}
            <div className="space-y-6">
              {/* 服务列表 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">选择服务</CardTitle>
                  <CardDescription>
                    {serviceTypeLabels[selectedServiceType]}服务套餐
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg border-2 transition-all",
                        selectedService?.id === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{service.name}</span>
                            {service.popular && (
                              <Badge variant="secondary" className="text-xs">
                                推荐
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-primary">
                            {service.price === 0 ? "免费" : `¥${service.price}`}
                          </div>
                          {service.price > 0 && (
                            <div className="text-xs text-muted-foreground">
                              /{service.unit}
                            </div>
                          )}
                        </div>
                      </div>
                      {selectedService?.id === service.id && (
                        <div className="mt-3 pt-3 border-t space-y-1">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="h-3 w-3 text-primary shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* 订单汇总 */}
              {selectedService && (
                <Card className="border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">订单汇总</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">服务类型</span>
                        <span>{serviceTypeLabels[selectedServiceType]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">服务套餐</span>
                        <span>{selectedService.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">覆盖平台</span>
                        <span>{selectedPlatforms.length} 个</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">总计</span>
                        <span className="text-2xl font-bold text-primary">
                          {selectedService.price === 0 ? "免费" : `¥${selectedService.price}`}
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
                disabled={!selectedService || !websiteUrl || !brandName || isSubmitting}
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
        </TabsContent>

        {/* 订阅套餐 Tab */}
        <TabsContent value="packages" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {geoPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={cn(
                  "relative",
                  pkg.popular && "border-primary shadow-lg"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">最受欢迎</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription className="text-xs">{pkg.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">¥{pkg.price}</span>
                    <span className="text-muted-foreground">/{pkg.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    立即订阅
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 功能对比表 */}
          <Card>
            <CardHeader>
              <CardTitle>套餐对比</CardTitle>
              <CardDescription>详细了解各套餐的功能差异</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">功能</th>
                      {geoPackages.map((pkg) => (
                        <th key={pkg.id} className="text-center py-3 px-4 font-medium">
                          {pkg.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">每月诊断次数</td>
                      {geoPackages.map((pkg) => (
                        <td key={pkg.id} className="text-center py-3 px-4">
                          {pkg.limits.auditsPerMonth === -1 ? "无限" : pkg.limits.auditsPerMonth}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">提示词追踪</td>
                      {geoPackages.map((pkg) => (
                        <td key={pkg.id} className="text-center py-3 px-4">
                          {pkg.limits.promptsTracked === -1 ? "无限" : pkg.limits.promptsTracked}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">内容优化篇数</td>
                      {geoPackages.map((pkg) => (
                        <td key={pkg.id} className="text-center py-3 px-4">
                          {pkg.limits.contentOptimizations === -1 ? "无限" : pkg.limits.contentOptimizations}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">竞争对手追踪</td>
                      {geoPackages.map((pkg) => (
                        <td key={pkg.id} className="text-center py-3 px-4">
                          {pkg.limits.competitorTracking === -1 ? "无限" : pkg.limits.competitorTracking === 0 ? "-" : pkg.limits.competitorTracking}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4">价格</td>
                      {geoPackages.map((pkg) => (
                        <td key={pkg.id} className="text-center py-3 px-4 font-bold text-primary">
                          ¥{pkg.price}/月
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

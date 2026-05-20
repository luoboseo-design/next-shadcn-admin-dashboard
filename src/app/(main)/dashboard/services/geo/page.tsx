"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  FileEdit,
  Code,
  Award,
  Check,
  ArrowRight,
  Loader2,
  Sparkles,
  TrendingUp,
  Zap,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import {
  optimizationServices,
  subscriptionPlans,
  categoryLabels,
  categoryDescriptions,
  type OptimizationCategory,
  type OptimizationService,
} from "@/data/geo-service";
import { cn } from "@/lib/utils";

const categoryIcons: Record<OptimizationCategory, React.ReactNode> = {
  content: <FileEdit className="h-5 w-5" />,
  technical: <Code className="h-5 w-5" />,
  authority: <Award className="h-5 w-5" />,
};

export default function GeoOptimizationPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<OptimizationCategory>("content");
  const [selectedService, setSelectedService] = useState<OptimizationService | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [pageUrls, setPageUrls] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 筛选对应类型的服务
  const filteredServices = optimizationServices.filter(
    (service) => service.category === selectedCategory
  );

  // 提交任务
  const handleSubmit = async () => {
    if (!selectedService || !websiteUrl) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard/tasks");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            GEO 优化服务
          </h1>
          <p className="text-muted-foreground mt-1">
            提升品牌在 AI 搜索引擎中的可见度和引用率
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard" className="gap-2">
              <Sparkles className="h-4 w-4" />
              免费诊断
            </Link>
          </Button>
        </div>
      </div>

      {/* 流程说明 */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</div>
              <span className="text-sm">免费诊断</span>
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
              <span className="text-sm font-medium">选择优化服务</span>
            </div>
            <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-bold">3</div>
              <span className="text-sm text-muted-foreground">执行优化</span>
            </div>
            <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-bold">4</div>
              <span className="text-sm text-muted-foreground">效果追踪</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 主要内容 - Tabs */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="services" className="gap-2">
            <Zap className="h-4 w-4" />
            单次服务
          </TabsTrigger>
          <TabsTrigger value="subscription" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            订阅方案
          </TabsTrigger>
        </TabsList>

        {/* 单次服务 Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 左侧：选择区域 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 选择优化类别 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">选择优化类别</CardTitle>
                  <CardDescription>根据诊断结果选择需要的优化服务</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(Object.keys(categoryLabels) as OptimizationCategory[]).map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedService(null);
                        }}
                        className={cn(
                          "relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                          selectedCategory === category
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          {categoryIcons[category]}
                        </div>
                        <span className="font-medium text-sm text-center">{categoryLabels[category]}</span>
                        {selectedCategory === category && (
                          <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {categoryDescriptions[selectedCategory]}
                  </p>
                </CardContent>
              </Card>

              {/* 服务列表 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">{categoryLabels[selectedCategory]}服务</CardTitle>
                  <CardDescription>选择具体的优化服务</CardDescription>
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
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold">{service.name}</span>
                            {service.popular && (
                              <Badge variant="secondary" className="text-xs">
                                热门
                              </Badge>
                            )}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {service.turnaround}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-primary text-lg">
                            ¥{service.price}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /{service.unit}
                          </div>
                        </div>
                      </div>
                      
                      {selectedService?.id === service.id && (
                        <div className="mt-4 pt-4 border-t grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2">服务内容</div>
                            <div className="space-y-1.5">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2">交付成果</div>
                            <div className="space-y-1.5">
                              {service.deliverables.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <ArrowRight className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* 任务详情表单 */}
              {selectedService && (
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">项目信息</CardTitle>
                    <CardDescription>填写您的网站和优化需求</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>网站地址 <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                    </div>

                    {(selectedService.category === "content" || selectedService.id === "schema-implementation") && (
                      <div className="space-y-2">
                        <Label>需要优化的页面</Label>
                        <Textarea
                          placeholder="每行一个页面 URL，例如：&#10;https://example.com/about&#10;https://example.com/products"
                          value={pageUrls}
                          onChange={(e) => setPageUrls(e.target.value)}
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground">
                          留空则由我们根据诊断报告确定优先级页面
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>补充说明（可选）</Label>
                      <Textarea
                        placeholder="描述您的优化目标、特殊需求或其他备注..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 右侧：订单汇总 */}
            <div className="space-y-6">
              {selectedService ? (
                <>
                  <Card className="border-primary sticky top-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">订单汇总</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">优化类别</span>
                          <span>{categoryLabels[selectedCategory]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">服务项目</span>
                          <span className="text-right max-w-[180px]">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">交付周期</span>
                          <span>{selectedService.turnaround}</span>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">总计</span>
                          <span className="text-2xl font-bold text-primary">
                            ¥{selectedService.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{selectedService.unit}
                            </span>
                          </span>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full gap-2"
                        onClick={handleSubmit}
                        disabled={!websiteUrl || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            提交中...
                          </>
                        ) : (
                          <>
                            立即下单
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        下单后 1 个工作日内联系您确认需求
                      </p>
                    </CardContent>
                  </Card>

                  {/* 服务保障 */}
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>不满意可退款</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>专业团队执行</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>效果数据追踪</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      请先选择一个优化服务
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 订阅方案 Tab */}
        <TabsContent value="subscription" className="space-y-6">
          {/* 订阅说明 */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">持续优化，持续领先</h3>
                <p className="text-sm text-muted-foreground">
                  AI 搜索引擎的算法和竞争格局持续变化。订阅方案帮助您持续监控、优化和保持竞争优势，
                  而非一次性修复后被动等待结果。
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col",
                  plan.popular && "border-primary shadow-lg"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">最受欢迎</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="text-xs min-h-[2.5rem]">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    {plan.price === 0 ? (
                      <span className="text-2xl font-bold">定制报价</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">¥{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === 0 ? "联系销售" : "立即订阅"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 功能对比表 */}
          <Card>
            <CardHeader>
              <CardTitle>方案对比</CardTitle>
              <CardDescription>详细了解各方案的功能和限制</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">功能</th>
                      {subscriptionPlans.map((plan) => (
                        <th key={plan.id} className="text-center py-3 px-4 font-medium">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">AI 平台监控</td>
                      {subscriptionPlans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.aiPlatforms === -1 ? "全部" : `${plan.limits.aiPlatforms} 个`}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">提示词追踪</td>
                      {subscriptionPlans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.promptsTracked === -1 ? "无限" : plan.limits.promptsTracked}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">每月内容优化</td>
                      {subscriptionPlans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.contentOptimizations === -1 ? "无限" : `${plan.limits.contentOptimizations} 篇`}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">竞争对手追踪</td>
                      {subscriptionPlans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.competitorTracking === -1 
                            ? "无限" 
                            : plan.limits.competitorTracking === 0 
                              ? "-" 
                              : `${plan.limits.competitorTracking} 个`}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">报告频率</td>
                      {subscriptionPlans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.reportFrequency}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4">价格</td>
                      {subscriptionPlans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4 font-bold text-primary">
                          {plan.price === 0 ? "定制" : `¥${plan.price}/月`}
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

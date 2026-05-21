"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileEdit, Package, BarChart3, Check, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GuestPostForm } from "./_components/guest-post-form";
import { PlatformShowcase } from "./_components/platform-showcase";
import {
  guestPostPackages,
  guestPostPlatformDetails,
  type GuestPostPlatformType,
  type PlatformTier,
} from "@/data/guest-posts";

export default function GuestPostsServicePage() {
  const router = useRouter();
  const [selectedPackageId, setSelectedPackageId] = useState<string>("growth");
  const [selectedPlatform, setSelectedPlatform] = useState<GuestPostPlatformType | null>(null);
  const [selectedTier, setSelectedTier] = useState<PlatformTier>("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 计算价格
  const getPrice = () => {
    if (!selectedPlatform || selectedPlatform === "custom") {
      return null;
    }
    const platformInfo = guestPostPlatformDetails[selectedPlatform];
    const tierInfo = platformInfo.tiers.find((t) => t.tier === selectedTier);
    const pkg = guestPostPackages.find((p) => p.id === selectedPackageId);

    if (!tierInfo || !pkg) return null;

    const basePrice = tierInfo.pricePerArticle * pkg.articleCount;
    const discount = pkg.discount || 0;
    return Math.round(basePrice * (1 - discount / 100));
  };

  const handleCreateTask = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard/tasks");
  };

  const price = getPrice();

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold">客座文章</h1>
        <p className="text-muted-foreground">
          在高权重媒体平台发布带有反向链接的专业文章，提升品牌权威和 SEO 效果
        </p>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create" className="gap-2">
            <FileEdit className="h-4 w-4" />
            创建任务
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <Package className="h-4 w-4" />
            套餐价格
          </TabsTrigger>
          <TabsTrigger value="platforms" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            平台展示
          </TabsTrigger>
        </TabsList>

        {/* 创建任务 */}
        <TabsContent value="create">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* 左侧：表单 */}
            <Card>
              <CardHeader>
                <CardTitle>创建客座文章任务</CardTitle>
                <CardDescription>
                  填写文章需求和目标平台，AI 将为您生成并发布高质量内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GuestPostForm
                  selectedPackageId={selectedPackageId}
                  onPlatformChange={setSelectedPlatform}
                  onTierChange={setSelectedTier}
                />
              </CardContent>
            </Card>

            {/* 右侧：套餐选择 + 价格 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>选择套餐</CardTitle>
                  <CardDescription>根据需求选择文章数量</CardDescription>
                </CardHeader>
                <CardContent>
                  <PackageSelector
                    selectedId={selectedPackageId}
                    onSelect={setSelectedPackageId}
                  />
                </CardContent>
              </Card>

              {/* 价格显示 */}
              {price !== null && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">预估价格</div>
                      <div className="text-3xl font-bold">${price}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {guestPostPackages.find((p) => p.id === selectedPackageId)?.articleCount} 篇文章
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 创建任务按钮 */}
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleCreateTask}
                disabled={isSubmitting}
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

        {/* 套餐价格 */}
        <TabsContent value="pricing">
          <PricingTable />
        </TabsContent>

        {/* 平台展示 */}
        <TabsContent value="platforms">
          <PlatformShowcase />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 套餐选择器组件
function PackageSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {guestPostPackages.map((pkg) => (
        <button
          key={pkg.id}
          onClick={() => onSelect(pkg.id)}
          className={cn(
            "w-full p-4 rounded-lg border text-left transition-all",
            selectedId === pkg.id
              ? "border-primary bg-primary/5"
              : "hover:border-muted-foreground/30"
          )}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{pkg.name}</span>
              {pkg.recommended && (
                <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                  推荐
                </span>
              )}
            </div>
            {selectedId === pkg.id && <Check className="h-4 w-4 text-primary" />}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{pkg.articleCount} 篇文章</span>
            {pkg.discount && (
              <span className="text-green-600 dark:text-green-400">省 {pkg.discount}%</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

// 定价表组件
function PricingTable() {
  const platforms: GuestPostPlatformType[] = ["tech", "business", "content"];

  return (
    <div className="space-y-6">
      {platforms.map((platformType) => {
        const platform = guestPostPlatformDetails[platformType];
        return (
          <Card key={platformType}>
            <CardHeader>
              <CardTitle>{platform.label}</CardTitle>
              <CardDescription>{platform.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">等级</th>
                      <th className="text-left py-3 px-4">DA 权重</th>
                      <th className="text-left py-3 px-4">示例平台</th>
                      <th className="text-right py-3 px-4">单价</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platform.tiers.map((tier) => (
                      <tr key={tier.tier} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <span className="font-medium">
                            {tier.tier === "standard" && "标准版"}
                            {tier.tier === "premium" && "高级版"}
                            {tier.tier === "elite" && "精英版"}
                          </span>
                        </td>
                        <td className="py-3 px-4">{tier.daRange}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {tier.examples.map((ex) => (
                              <span
                                key={ex}
                                className="px-2 py-0.5 bg-muted rounded text-xs"
                              >
                                {ex}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">
                          ${tier.pricePerArticle}/篇
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

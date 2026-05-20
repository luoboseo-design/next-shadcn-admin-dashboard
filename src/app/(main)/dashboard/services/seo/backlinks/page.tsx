"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateTaskForm } from "./_components/create-task-form";
import { PricingCards } from "./_components/pricing-cards";
import { PlatformStats } from "./_components/platform-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link2, Package, BarChart3, Check, ArrowRight, Loader2 } from "lucide-react";
import { servicePackages } from "@/data/mock-tasks";
import { platformTypeDetails } from "@/data/mock-platforms";
import { cn } from "@/lib/utils";
import type { PlatformType } from "@/types/marketing";

export default function BacklinksServicePage() {
  const router = useRouter();
  const [selectedPackageId, setSelectedPackageId] = useState<string>("growth");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 计算基于选中平台的价格
  const getPriceForPackage = (baseQuantity: number) => {
    if (selectedPlatforms.length === 0) {
      return null;
    }
    const avgPrice = selectedPlatforms.reduce((sum, type) => {
      return sum + platformTypeDetails[type].pricePerLink;
    }, 0) / selectedPlatforms.length;
    return Math.round(avgPrice * baseQuantity);
  };

  const handleCreateTask = async () => {
    setIsSubmitting(true);
    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // 跳转到任务中心
    router.push("/dashboard/tasks");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Link2 className="h-7 w-7 text-primary" />
          SEO 外链代发服务
        </h1>
        <p className="text-muted-foreground mt-1">
          通过高质量外链提升网站权重，获得更多自然流量
        </p>
      </div>

      {/* 主要内容 */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="create" className="gap-2">
            <Link2 className="h-4 w-4" />
            创建任务
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <Package className="h-4 w-4" />
            套餐价格
          </TabsTrigger>
          <TabsTrigger value="platforms" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            平台统计
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 左侧：表单 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>创建外链任务</CardTitle>
                  <CardDescription>
                    填写您的网站信息和关键词，AI 将自动为您生成内容并发布
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateTaskForm 
                    selectedPackageId={selectedPackageId}
                    onPlatformChange={setSelectedPlatforms}
                  />
                </CardContent>
              </Card>
            </div>

            {/* 右侧：快速选择套餐 + 创建按钮 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>选择套餐</CardTitle>
                  <CardDescription>根据需求选择合适的外链数量</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickPackageSelector
                    selectedId={selectedPackageId}
                    onSelect={setSelectedPackageId}
                    getPriceForPackage={getPriceForPackage}
                  />
                </CardContent>
              </Card>

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

        <TabsContent value="pricing">
          <PricingCards
            selectedId={selectedPackageId}
            onSelect={setSelectedPackageId}
          />
        </TabsContent>

        <TabsContent value="platforms">
          <PlatformStats />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function QuickPackageSelector({
  selectedId,
  onSelect,
  getPriceForPackage,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  getPriceForPackage: (quantity: number) => number | null;
}) {
  return (
    <div className="space-y-3">
      {servicePackages.map((pkg) => {
        const dynamicPrice = getPriceForPackage(pkg.quantity);
        const displayPrice = dynamicPrice ?? pkg.totalPrice;

        return (
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
              <span className="font-semibold">{pkg.name}</span>
              {selectedId === pkg.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {pkg.quantity} 条外链
              </span>
              <span className="font-semibold">${displayPrice}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

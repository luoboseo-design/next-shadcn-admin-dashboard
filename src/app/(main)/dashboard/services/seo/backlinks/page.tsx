"use client";

import { useState, useMemo } from "react";
import { CreateTaskForm } from "./_components/create-task-form";
import { PricingCards } from "./_components/pricing-cards";
import { PlatformStats } from "./_components/platform-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Package, BarChart3, Check, Clock, Globe, DollarSign } from "lucide-react";
import { servicePackages } from "@/data/mock-tasks";
import { platformTypeDetails, platformTypeLabels } from "@/data/mock-platforms";
import { cn } from "@/lib/utils";
import type { PlatformType } from "@/types/marketing";

export default function BacklinksServicePage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>("growth");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);

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

  // 获取单选平台的详细信息
  const singlePlatformInfo = useMemo(() => {
    if (selectedPlatforms.length === 1) {
      return platformTypeDetails[selectedPlatforms[0]];
    }
    return null;
  }, [selectedPlatforms]);

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

            {/* 右侧：快速选择套餐 + 平台详情 */}
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
                    selectedPlatforms={selectedPlatforms}
                    getPriceForPackage={getPriceForPackage}
                  />
                </CardContent>
              </Card>

              {/* 单选平台详情卡片 */}
              {singlePlatformInfo && (
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{singlePlatformInfo.label}平台详情</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {singlePlatformInfo.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30 text-center">
                        <DollarSign className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <div className="font-semibold">${singlePlatformInfo.pricePerLink}</div>
                        <div className="text-xs text-muted-foreground">每条</div>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-center">
                        <Globe className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                        <div className="font-semibold">DA {singlePlatformInfo.avgDA}+</div>
                        <div className="text-xs text-muted-foreground">平均权重</div>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-center">
                        <Clock className="h-4 w-4 text-amber-600 mx-auto mb-1" />
                        <div className="font-semibold text-xs">{singlePlatformInfo.avgPublishTime}</div>
                        <div className="text-xs text-muted-foreground">发布时间</div>
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

                    <div className="pt-2 border-t text-sm text-muted-foreground">
                      可用平台：{singlePlatformInfo.totalPlatforms} 个
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 多选平台提示 */}
              {selectedPlatforms.length > 1 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-3">
                      已选择 {selectedPlatforms.length} 种平台类型
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlatforms.map(type => (
                        <div 
                          key={type}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-1.5"
                        >
                          <span>{platformTypeLabels[type]}</span>
                          <span className="text-xs opacity-70">${platformTypeDetails[type].pricePerLink}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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
  selectedPlatforms,
  getPriceForPackage,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  selectedPlatforms: PlatformType[];
  getPriceForPackage: (quantity: number) => number | null;
}) {
  return (
    <div className="space-y-3">
      {servicePackages.map((pkg) => {
        const dynamicPrice = getPriceForPackage(pkg.quantity);
        const displayPrice = dynamicPrice ?? pkg.totalPrice;
        const pricePerLink = dynamicPrice 
          ? Math.round((displayPrice / pkg.quantity) * 100) / 100
          : pkg.pricePerLink;

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
                {selectedPlatforms.length > 0 && (
                  <span className="ml-1">· ${pricePerLink}/条</span>
                )}
              </span>
              <span className="font-semibold">${displayPrice}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

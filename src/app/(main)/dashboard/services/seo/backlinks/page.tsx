"use client";

import { useState } from "react";
import { CreateTaskForm } from "./_components/create-task-form";
import { PricingCards } from "./_components/pricing-cards";
import { PlatformStats } from "./_components/platform-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Package, BarChart3 } from "lucide-react";

export default function BacklinksServicePage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>("growth");

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
                  <CreateTaskForm selectedPackageId={selectedPackageId} />
                </CardContent>
              </Card>
            </div>

            {/* 右侧：快速选择套餐 */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>选择套餐</CardTitle>
                  <CardDescription>根据需求选择合适的外链数量</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickPackageSelector
                    selectedId={selectedPackageId}
                    onSelect={setSelectedPackageId}
                  />
                </CardContent>
              </Card>
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

import { servicePackages } from "@/data/mock-tasks";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function QuickPackageSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {servicePackages.map((pkg) => (
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
            <span className="text-muted-foreground">{pkg.quantity} 条外链</span>
            <span className="font-semibold">${pkg.totalPrice}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

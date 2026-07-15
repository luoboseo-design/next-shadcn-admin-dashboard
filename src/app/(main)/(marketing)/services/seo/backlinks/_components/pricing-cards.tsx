"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { servicePackages } from "@/data/mock-tasks";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardsProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PricingCards({ selectedId, onSelect }: PricingCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicePackages.map((pkg) => (
        <Card
          key={pkg.id}
          className={cn(
            "relative transition-all",
            selectedId === pkg.id && "border-primary shadow-lg",
            pkg.recommended && "border-primary"
          )}
        >
          {pkg.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">
                最受欢迎
              </Badge>
            </div>
          )}
          {pkg.discount && (
            <div className="absolute -top-3 right-4">
              <Badge variant="destructive">-{pkg.discount}%</Badge>
            </div>
          )}
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">{pkg.name}</CardTitle>
            <CardDescription>{pkg.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 价格 */}
            <div className="text-center">
              <div className="text-4xl font-bold">${pkg.totalPrice}</div>
              <div className="text-sm text-muted-foreground">
                ${pkg.pricePerLink} / 条外链
              </div>
            </div>

            {/* 外链数量 */}
            <div className="text-center py-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-primary">{pkg.quantity}</div>
              <div className="text-sm text-muted-foreground">条高质量外链</div>
            </div>

            {/* 特性列表 */}
            <ul className="space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* 选择按钮 */}
            <Button
              className="w-full"
              variant={selectedId === pkg.id ? "default" : "outline"}
              onClick={() => onSelect(pkg.id)}
            >
              {selectedId === pkg.id ? "已选择" : "选择此套餐"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

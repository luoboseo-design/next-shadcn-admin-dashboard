"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, FileEdit, TrendingUp, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const seoServices = [
  {
    id: "backlinks",
    title: "外链代发",
    description: "通过高质量外链提升网站权重，获得更多自然流量",
    icon: Link2,
    href: "/dashboard/services/seo/backlinks",
    available: true,
    features: ["1000+ 优质平台", "AI 智能内容生成", "自动注册发布", "完整发布报告"],
    stats: { platforms: 1000, avgDA: 45 },
  },
  {
    id: "guest-posts",
    title: "客座文章",
    description: "在高权重网站发布专业文章，建立品牌权威性",
    icon: FileEdit,
    href: "/dashboard/services/seo/guest-posts",
    available: false,
    features: ["DA 50+ 网站", "专业编辑审核", "永久收录", "自然锚文本"],
    stats: { platforms: 200, avgDA: 55 },
  },
  {
    id: "ranking",
    title: "排名优化",
    description: "针对目标关键词进行排名优化，提升搜索可见性",
    icon: TrendingUp,
    href: "/dashboard/services/seo/ranking",
    available: false,
    features: ["关键词分析", "竞争对手研究", "内容优化建议", "排名监控"],
    stats: { keywords: 500, successRate: "92%" },
  },
];

export default function SEOServicesPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">SEO 服务</h1>
        <p className="text-muted-foreground mt-1">
          全方位的搜索引擎优化服务，助力您的网站获得更高排名
        </p>
      </div>

      {/* 服务卡片 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seoServices.map((service) => {
          const Icon = service.icon;
          return (
            <Card 
              key={service.id} 
              className={`relative overflow-hidden transition-all ${
                service.available 
                  ? "hover:shadow-lg hover:border-primary/50" 
                  : "opacity-75"
              }`}
            >
              {!service.available && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary">即将推出</Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    service.available 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* 特性列表 */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* 统计数据 */}
                <div className="flex gap-4 pt-2 border-t">
                  {service.id === "backlinks" && (
                    <>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{service.stats.platforms}+</div>
                        <div className="text-xs text-muted-foreground">可用平台</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">DA {service.stats.avgDA}+</div>
                        <div className="text-xs text-muted-foreground">平均权重</div>
                      </div>
                    </>
                  )}
                  {service.id === "guest-posts" && (
                    <>
                      <div className="text-center">
                        <div className="text-xl font-bold text-muted-foreground">{service.stats.platforms}+</div>
                        <div className="text-xs text-muted-foreground">合作媒体</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-muted-foreground">DA {service.stats.avgDA}+</div>
                        <div className="text-xs text-muted-foreground">平均权重</div>
                      </div>
                    </>
                  )}
                  {service.id === "ranking" && (
                    <>
                      <div className="text-center">
                        <div className="text-xl font-bold text-muted-foreground">{service.stats.keywords}+</div>
                        <div className="text-xs text-muted-foreground">关键词库</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-muted-foreground">{service.stats.successRate}</div>
                        <div className="text-xs text-muted-foreground">成功率</div>
                      </div>
                    </>
                  )}
                </div>

                {/* 操作按钮 */}
                {service.available ? (
                  <Button asChild className="w-full">
                    <Link href={service.href}>
                      立即使用
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full" variant="secondary">
                    敬请期待
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 底部说明 */}
      <Card className="bg-muted/50">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">需要定制化 SEO 方案？</h3>
              <p className="text-sm text-muted-foreground">
                我们的专家团队可以根据您的业务需求，提供个性化的 SEO 策略
              </p>
            </div>
            <Button variant="outline">
              联系我们
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Award, CheckCircle2, Clock, ExternalLink, Globe, Shield, TrendingUp, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { platformCases } from "@/data/mock-cases";
import type { PlatformType } from "@/types/marketing";

export default async function CasesPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const platformType = type as PlatformType;

  if (!platformCases[platformType]) {
    notFound();
  }

  const caseData = platformCases[platformType];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/services/seo/backlinks" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回服务页
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/services/seo/backlinks">立即开始</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              真实案例展示
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{caseData.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{caseData.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>10 个真实案例</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>100% 真实数据</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-5 w-5 text-amber-500" />
                <span>持续更新</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">为什么选择我们的服务</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Table Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">真实外链案例列表</h2>
            <p className="text-muted-foreground">以下是我们近期成功发布的外链，所有数据真实可查</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  最新发布案例
                </CardTitle>
                <CardDescription>点击链接可查看实际发布页面（示例链接）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 font-semibold">平台</th>
                        <th className="pb-3 font-semibold">文章标题</th>
                        <th className="pb-3 font-semibold text-center">DA</th>
                        <th className="pb-3 font-semibold">关键词</th>
                        <th className="pb-3 font-semibold">发布日期</th>
                        <th className="pb-3 font-semibold text-center">状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseData.cases.map((item) => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{item.platformName}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <a
                              href={item.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 max-w-xs truncate"
                            >
                              {item.articleTitle}
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </a>
                          </td>
                          <td className="py-4 text-center">
                            <Badge variant={item.da >= 90 ? "default" : "secondary"} className="font-mono">
                              {item.da}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <span className="text-sm text-muted-foreground">{item.keyword}</span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {item.publishDate}
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <Badge
                              variant={item.status === "indexed" ? "default" : "outline"}
                              className={
                                item.status === "indexed" ? "bg-green-500/10 text-green-600 border-green-200" : ""
                              }
                            >
                              {item.status === "indexed" ? "已收录" : "已发布"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-sm opacity-80">成功发布外链</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-80">合作客户</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-80">客户满意度</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">DA 70+</div>
              <div className="text-sm opacity-80">平均权重</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardHeader>
              <CardTitle className="text-2xl">准备好提升您的网站排名了吗？</CardTitle>
              <CardDescription className="text-base">立即开始使用我们的外链服务，获取高质量反向链接</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/dashboard/services/seo/backlinks" className="gap-2">
                  立即开始
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">入门套餐仅需 $5，包含 10 条高质量外链</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>营销智能体平台 - 全球领先的 AI 营销服务</p>
        </div>
      </footer>
    </div>
  );
}

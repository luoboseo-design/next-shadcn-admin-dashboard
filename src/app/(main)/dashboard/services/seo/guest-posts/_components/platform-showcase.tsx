"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Star, TrendingUp, Users } from "lucide-react";
import {
  guestPostPlatformDetails,
  type GuestPostPlatformType,
} from "@/data/guest-posts";

// 模拟的平台详细数据
const platformExamples = {
  tech: [
    { name: "TechCrunch", da: 94, traffic: "50M+", type: "精英" },
    { name: "Wired", da: 93, traffic: "30M+", type: "精英" },
    { name: "The Verge", da: 92, traffic: "40M+", type: "精英" },
    { name: "VentureBeat", da: 82, traffic: "15M+", type: "高级" },
    { name: "36氪", da: 78, traffic: "20M+", type: "高级" },
    { name: "虎嗅", da: 76, traffic: "10M+", type: "高级" },
    { name: "InfoQ", da: 74, traffic: "8M+", type: "高级" },
    { name: "Hackernoon", da: 68, traffic: "5M+", type: "标准" },
    { name: "Dev.to", da: 65, traffic: "3M+", type: "标准" },
    { name: "DZone", da: 62, traffic: "2M+", type: "标准" },
  ],
  business: [
    { name: "Forbes", da: 95, traffic: "100M+", type: "精英" },
    { name: "Bloomberg", da: 94, traffic: "80M+", type: "精英" },
    { name: "第一财经", da: 88, traffic: "30M+", type: "精英" },
    { name: "Entrepreneur", da: 83, traffic: "20M+", type: "高级" },
    { name: "Inc.", da: 82, traffic: "25M+", type: "高级" },
    { name: "界面新闻", da: 78, traffic: "15M+", type: "高级" },
    { name: "创业邦", da: 72, traffic: "8M+", type: "高级" },
    { name: "Business2Community", da: 65, traffic: "3M+", type: "标准" },
    { name: "AllBusiness", da: 62, traffic: "2M+", type: "标准" },
    { name: "StartupNation", da: 58, traffic: "1M+", type: "标准" },
  ],
  content: [
    { name: "Medium", da: 96, traffic: "200M+", type: "精英" },
    { name: "知乎", da: 92, traffic: "100M+", type: "精英" },
    { name: "Substack", da: 90, traffic: "50M+", type: "精英" },
    { name: "知乎专栏", da: 85, traffic: "80M+", type: "高级" },
    { name: "掘金", da: 78, traffic: "10M+", type: "高级" },
    { name: "少数派", da: 75, traffic: "5M+", type: "高级" },
    { name: "简书", da: 72, traffic: "20M+", type: "标准" },
    { name: "CSDN", da: 70, traffic: "30M+", type: "标准" },
    { name: "博客园", da: 68, traffic: "8M+", type: "标准" },
    { name: "V2EX", da: 65, traffic: "3M+", type: "标准" },
  ],
};

export function PlatformShowcase() {
  const platforms: GuestPostPlatformType[] = ["tech", "business", "content"];

  return (
    <div className="space-y-8">
      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">合作平台</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">DA 60+</div>
                <div className="text-sm text-muted-foreground">平均权重</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">10B+</div>
                <div className="text-sm text-muted-foreground">月访问量</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">发布成功率</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 平台列表 */}
      {platforms.map((platformType) => {
        const platform = guestPostPlatformDetails[platformType];
        const examples = platformExamples[platformType];

        return (
          <Card key={platformType}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{platform.label}</CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </div>
                <Badge variant="outline">{examples.length} 个平台</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
                {examples.map((ex) => (
                  <div
                    key={ex.name}
                    className="p-3 rounded-lg border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{ex.name}</span>
                      <Badge
                        variant="secondary"
                        className={
                          ex.type === "精英"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : ex.type === "高级"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-muted"
                        }
                      >
                        {ex.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>DA {ex.da}</span>
                      <span>{ex.traffic} 访问</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* 服务优势 */}
      <Card>
        <CardHeader>
          <CardTitle>为什么选择我们的客座文章服务</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "高权重平台",
                description: "与 500+ 家高权重媒体建立长期合作，确保文章发布在优质平台",
              },
              {
                title: "专业内容团队",
                description: "AI 辅助 + 人工审核，确保文章质量符合各平台发布标准",
              },
              {
                title: "永久外链保障",
                description: "所有文章均为永久发布，外链长期有效，支持后续查验",
              },
              {
                title: "快速交付",
                description: "标准订单 7 天内完成，紧急订单可加急 3 天交付",
              },
              {
                title: "透明报告",
                description: "提供完整的发布报告，包含文章链接、收录状态、外链位置",
              },
              {
                title: "售后保障",
                description: "30 天内文章失效可免费补发，专属客服一对一服务",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

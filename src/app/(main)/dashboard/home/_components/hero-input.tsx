"use client";

import { useState } from "react";

import { ArrowRight, Bot, Globe, Search, Sparkles, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DiagnosisMode = "seo" | "geo";

interface HeroInputProps {
  onSubmit: (url: string) => void;
}

export function HeroInput({ onSubmit }: HeroInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<DiagnosisMode>("seo");

  const validateUrl = (value: string): boolean => {
    try {
      const urlToTest = value.startsWith("http") ? value : `https://${value}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("请输入网站地址");
      return;
    }

    if (!validateUrl(url)) {
      setError("请输入有效的网站地址");
      return;
    }

    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    onSubmit(finalUrl);
  };

  const seoFeatures = [
    {
      icon: <Search className="h-5 w-5" />,
      title: "SEO 深度分析",
      description: "检测技术问题、内容质量和外链情况",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "关键词排名",
      description: "分析目标关键词在搜索引擎中的排名",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "增长建议",
      description: "基于诊断结果提供针对性的优化方案",
      gradient: "from-orange-500/20 to-red-500/20",
    },
  ];

  const geoFeatures = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI 引用检测",
      description: "分析在 ChatGPT、Perplexity 等 AI 搜索中的可见度",
      gradient: "from-violet-500/20 to-purple-500/20",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "品牌提及分析",
      description: "检测品牌在 AI 回答中的提及频率和语境",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "优化建议",
      description: "提供提升 AI 搜索可见度的具体策略",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
  ];

  const features = mode === "seo" ? seoFeatures : geoFeatures;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* 输入框区域 */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-12">
          {/* Tab 切换 */}
          <div className="flex items-center gap-6 mb-4">
            <button
              type="button"
              onClick={() => setMode("seo")}
              className={cn(
                "relative pb-2 text-sm font-medium transition-colors",
                mode === "seo" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              SEO 诊断
              {mode === "seo" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />}
            </button>
            <button
              type="button"
              onClick={() => setMode("geo")}
              className={cn(
                "relative pb-2 text-sm font-medium transition-colors",
                mode === "geo" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              GEO 诊断
              {mode === "geo" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />}
            </button>
          </div>

          {/* 输入框 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative flex items-center gap-3 bg-card border border-border rounded-xl p-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/80">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="输入您的网站地址，例如：example.com"
                className="flex-1 h-10 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
              />
              <Button type="submit" className="h-10 px-5 rounded-lg text-sm font-medium gap-2">
                开始诊断
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-3 text-center">{error}</p>}
        </form>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex flex-col p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card h-[160px]"
            >
              {/* 渐变背景 */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                  feature.gradient,
                )}
              />

              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/80 border border-border/50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 底部信任标识 */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/60 mb-4">已为 10,000+ 网站提供诊断服务</p>
          <div className="flex items-center justify-center gap-8 opacity-40">
            {["Vercel", "Supabase", "Linear", "Stripe"].map((name) => (
              <span key={name} className="text-sm font-medium text-muted-foreground">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

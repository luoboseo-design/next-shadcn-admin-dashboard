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
    { icon: <Search className="h-5 w-5" />, title: "SEO 深度分析", description: "检测技术问题、内容质量和外链情况" },
    { icon: <Sparkles className="h-5 w-5" />, title: "关键词排名", description: "分析目标关键词在搜索引擎中的排名" },
    { icon: <TrendingUp className="h-5 w-5" />, title: "增长建议", description: "基于诊断结果提供针对性的优化方案" },
  ];

  const geoFeatures = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI 引用检测",
      description: "分析在 ChatGPT、Perplexity 等 AI 搜索中的可见度",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "品牌提及分析",
      description: "检测品牌在 AI 回答中的提及频率和语境",
    },
    { icon: <TrendingUp className="h-5 w-5" />, title: "优化建议", description: "提供提升 AI 搜索可见度的具体策略" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {/* 标题区域 */}
      <div className="text-center mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          <span>AI 驱动的营销智能平台</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
          让 AI 诊断您的网站
          <br />
          <span className="text-muted-foreground">发现增长机会</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          输入您的网站地址，AI 将深度分析 SEO 表现、AI 搜索引擎可见度、业务类型和目标客户，为您提供专业的营销建议
        </p>
      </div>

      {/* 输入框区域 */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        {/* SEO / GEO Tab 切换 - 左对齐与输入框对齐 */}
        <div className="flex items-center gap-8 mb-3 pl-2">
          <button
            type="button"
            onClick={() => setMode("seo")}
            className={cn(
              "relative pb-2 text-base font-medium transition-colors",
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
              "relative pb-2 text-base font-medium transition-colors",
              mode === "geo" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            GEO 诊断
            {mode === "geo" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />}
          </button>
        </div>
        <div className="relative flex items-center gap-2 bg-card border border-border rounded-xl p-2 shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
            <Globe className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="输入您的网站地址，例如：example.com"
            className="flex-1 h-12 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
          />
          <Button type="submit" size="lg" className="h-12 px-6 rounded-lg text-base font-medium gap-2">
            开始诊断
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive mt-3 text-center">{error}</p>}
      </form>

      {/* 功能特点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
        {(mode === "seo" ? seoFeatures : geoFeatures).map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/50 border border-border/50 transition-all hover:border-border hover:shadow-sm"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

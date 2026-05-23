"use client";

import { useState } from "react";

import { ArrowRight, Bot, ChevronRight, Globe, Search, Sparkles, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DiagnosisMode = "seo" | "geo" | null;

interface HeroInputProps {
  onSubmit: (url: string) => void;
}

export function HeroInput({ onSubmit }: HeroInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<DiagnosisMode>(null);

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

  // 未选择模式时，显示选择卡片
  if (!mode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI 驱动的营销智能平台</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">选择诊断类型</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            根据您的需求选择诊断方式，获取专业的优化建议
          </p>
        </div>

        {/* 两个大卡片选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {/* SEO 诊断卡片 */}
          <button
            type="button"
            onClick={() => setMode("seo")}
            className="group relative flex flex-col p-8 rounded-2xl border-2 border-border bg-card text-left transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 mb-6">
              <Search className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">SEO 诊断</h2>
            <p className="text-muted-foreground mb-6">
              分析网站在 Google、百度等传统搜索引擎中的表现，检测技术问题并提供优化建议
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">技术 SEO</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">内容质量</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">外链分析</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">关键词排名</span>
            </div>
          </button>

          {/* GEO 诊断卡片 */}
          <button
            type="button"
            onClick={() => setMode("geo")}
            className="group relative flex flex-col p-8 rounded-2xl border-2 border-border bg-card text-left transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-2 py-0.5 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium">
                新功能
              </span>
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 mb-6">
              <Bot className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">GEO 诊断</h2>
            <p className="text-muted-foreground mb-6">
              分析品牌在 ChatGPT、Perplexity 等 AI 搜索引擎中的可见度和引用情况
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">AI 引用检测</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">品牌提及</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">竞品对比</span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">优化策略</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // 已选择模式，显示输入框
  const isGeo = mode === "geo";

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {/* 返回按钮 + 模式标识 */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => setMode(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          返回选择
        </button>
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
            isGeo ? "bg-purple-500/10 text-purple-600" : "bg-blue-500/10 text-blue-600",
          )}
        >
          {isGeo ? <Bot className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          <span>{isGeo ? "GEO 诊断" : "SEO 诊断"}</span>
        </div>
      </div>

      {/* 标题区域 */}
      <div className="text-center mb-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
          {isGeo ? (
            <>
              检测 AI 搜索可见度
              <br />
              <span className="text-muted-foreground">提升品牌曝光</span>
            </>
          ) : (
            <>
              让 AI 诊断您的网站
              <br />
              <span className="text-muted-foreground">发现增长机会</span>
            </>
          )}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          {isGeo
            ? "输入您的网站地址，AI 将分析品牌在 ChatGPT、Perplexity 等 AI 搜索引擎中的引用情况"
            : "输入您的网站地址，AI 将深度分析 SEO 表现、技术问题和内容质量，为您提供专业建议"}
        </p>
      </div>

      {/* 输入框区域 */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-10">
        <div className="relative group">
          <div
            className={cn(
              "absolute -inset-1 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500",
              isGeo
                ? "bg-gradient-to-r from-purple-500/50 via-purple-500 to-pink-500/50"
                : "bg-gradient-to-r from-blue-500/50 via-blue-500 to-cyan-500/50",
            )}
          />
          <div className="relative flex items-center gap-2 bg-card border border-border rounded-xl p-2 shadow-lg">
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-lg",
                isGeo ? "bg-purple-500/10" : "bg-blue-500/10",
              )}
            >
              <Globe className={cn("h-5 w-5", isGeo ? "text-purple-500" : "text-blue-500")} />
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
            <Button
              type="submit"
              size="lg"
              className={cn(
                "h-12 px-6 rounded-lg text-base font-medium gap-2",
                isGeo && "bg-purple-600 hover:bg-purple-700",
              )}
            >
              开始诊断
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {error && <p className="text-sm text-destructive mt-3 text-center">{error}</p>}
      </form>

      {/* 功能特点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
        {isGeo ? (
          <>
            <FeatureCard
              icon={<Bot className="h-5 w-5 text-purple-500" />}
              title="AI 引用检测"
              description="分析在 ChatGPT、Perplexity 等 AI 搜索中的可见度"
              color="purple"
            />
            <FeatureCard
              icon={<Target className="h-5 w-5 text-purple-500" />}
              title="品牌提及分析"
              description="检测品牌在 AI 回答中的提及频率和语境"
              color="purple"
            />
            <FeatureCard
              icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
              title="优化建议"
              description="提供提升 AI 搜索可见度的具体策略"
              color="purple"
            />
          </>
        ) : (
          <>
            <FeatureCard
              icon={<Search className="h-5 w-5 text-blue-500" />}
              title="SEO 深度分析"
              description="检测技术问题、内容质量和外链情况"
              color="blue"
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5 text-blue-500" />}
              title="关键词排名"
              description="分析目标关键词在搜索引擎中的排名"
              color="blue"
            />
            <FeatureCard
              icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
              title="增长建议"
              description="基于诊断结果提供针对性的优化方案"
              color="blue"
            />
          </>
        )}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: "blue" | "purple";
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/50 border border-border/50 transition-all hover:border-border hover:shadow-sm">
      <div
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full border mb-4",
          color === "purple" ? "bg-purple-500/10 border-purple-500/20" : "bg-blue-500/10 border-blue-500/20",
        )}
      >
        {icon}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

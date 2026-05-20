"use client";

import { useState } from "react";

import { ArrowRight, Globe, Search, Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroInputProps {
  onSubmit: (url: string) => void;
}

export function HeroInput({ onSubmit }: HeroInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {/* 标题区域 */}
      <div className="text-center mb-10 max-w-3xl">
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
          输入您的网站地址，AI 将深度分析 SEO 表现、AI 搜索引擎可见度、业务类型和目标客户， 为您提供专业的营销建议
        </p>
      </div>

      {/* 输入框区域 */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
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
        </div>
        {error && <p className="text-sm text-destructive mt-3 text-center">{error}</p>}
      </form>

      {/* 功能特点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
        <FeatureCard
          icon={<Search className="h-5 w-5" />}
          title="SEO 深度分析"
          description="检测技术问题、内容质量和外链情况"
        />
        <FeatureCard
          icon={<Sparkles className="h-5 w-5" />}
          title="AI 引用检测"
          description="分析在 ChatGPT、Perplexity 等 AI 搜索中的可见度"
        />
        <FeatureCard
          icon={<TrendingUp className="h-5 w-5" />}
          title="增长建议"
          description="基于诊断结果提供针对性的营销方案"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/50 border border-border/50">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
        {icon}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

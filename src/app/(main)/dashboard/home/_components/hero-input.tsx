"use client";

import { useState } from "react";

import { ArrowRight, Globe } from "lucide-react";

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

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
      {/* 标题 */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          让 AI 诊断您的网站
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-muted-foreground/40 mt-2">
          发现增长机会
        </h2>
        <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
          输入您的网站地址，AI 将深度分析 SEO 表现、AI 搜索引擎可见度、业务类型和目标客户，为您提供专业的营销建议
        </p>
      </div>

      {/* 输入框区域 */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        {/* Tab 切换 */}
        <div className="flex items-center gap-6 mb-3">
          <button
            type="button"
            onClick={() => setMode("seo")}
            className={cn(
              "relative pb-2 text-sm font-medium transition-colors",
              mode === "seo" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            SEO 诊断
            {mode === "seo" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
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
            {mode === "geo" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
          </button>
        </div>

        {/* 输入框 */}
        <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1.5 shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 text-muted-foreground">
            <Globe className="h-5 w-5" />
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
          <Button type="submit" className="h-10 px-5 gap-2">
            开始诊断
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </form>

      {/* 简单的功能提示 */}
      <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
        <span>SEO 深度分析</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>AI 引用检测</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>增长建议</span>
      </div>
    </div>
  );
}

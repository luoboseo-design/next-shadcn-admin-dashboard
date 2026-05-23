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
          <p className="text-sm text-muted-foreground/60 mb-6">
            已为 <span className="font-semibold text-foreground">10,000+</span> 网站提供诊断服务
          </p>
          <div className="flex items-center justify-center gap-10 opacity-50 grayscale hover:grayscale-0 hover:opacity-70 transition-all">
            {/* Vercel */}
            <svg className="h-5" viewBox="0 0 283 64" fill="currentColor">
              <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" />
            </svg>
            {/* Supabase */}
            <svg className="h-5" viewBox="0 0 109 113" fill="none">
              <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)" />
              <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear)" fillOpacity="0.2" />
              <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" />
              <defs>
                <linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#249361" />
                  <stop offset="1" stopColor="#3ECF8E" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* Linear */}
            <svg className="h-5" viewBox="0 0 100 100" fill="currentColor">
              <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5765C20.0515 94.4582 5.54817 79.9558 1.22541 61.5228ZM.00189135 46.8891c-.07737-.6916.55389-.7965 1.06017-.2786C1.54167 47.0882 24.9112 70.4577 50.723 96.2695c.5179.5063.4131 1.1375-.2785 1.0602C25.9992 95.1822 6.01817 78.4403.00189 46.8891ZM78.5765 98.0358c.5179.5063.4131 1.1375-.2785 1.0602-9.1013-1.1118-17.4355-4.5355-24.3715-9.6631L78.5765 98.0358ZM.00189135 27.3891C-.00820877 26.698.59163 26.5982 1.06241 27.0575c.00242.0024.00485.0048.00728.0072.27292.2713.68717.6814 1.21334 1.2033 1.05233 1.0434 2.58SEO7 2.5683 4.51264 4.505 1.92676 1.9368 4.25362 4.2735 6.8783 6.909 2.62467 2.6355 5.54673 5.5677 8.6572 8.6896 3.1104 3.122 6.4084 6.4317 9.7846 9.8206 3.376 3.389 6.8302 6.857 10.2529 10.294 3.4228 3.437 6.8143 6.8421 10.0649 10.1074 3.2507 3.2654 6.3606 6.3903 9.22 9.2664 2.8595 2.876 5.4692 5.502 7.7193 7.77 2.2501 2.268 4.1408 4.177 5.5628 5.619.3554.361.6903.701 1.0033 1.018.4593.471.3594 1.071-.3298 1.061C29.8514 94.2166 7.37393 75.8139.00189135 27.3891ZM.00038 8.38914C-.01024 7.69799.59068 7.59651 1.06078 8.0558c.47014.4593 1.19021 1.1685 2.15004 2.1192.95983.9507 2.15961 2.143 3.58928 3.5773 1.42967 1.4344 3.08923 3.1102 4.96862 5.0276 1.87939 1.9175 3.97867 4.0761 6.28783 6.4758 2.3091 2.3997 4.8281 5.0406 7.5467 7.9225 2.7186 2.8819 5.6369 6.0048 8.7448 9.3687 3.1079 3.364 6.4052 6.9689 9.8819 10.8149 3.4766 3.846 7.1327 7.9329 10.9581 12.261 3.8254 4.328 7.8202 8.897 11.9744 13.707 4.1542 4.81 8.4678 9.861 12.9308 15.153.5165.612.4022 1.206-.3259 1.191C29.9535 93.2097 8.54893 70.8054.00038 8.38914Z" />
            </svg>
            {/* Stripe */}
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor">
              <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a12.87 12.87 0 0 1-4.56.83c-4.14 0-6.94-2.54-6.94-6.96 0-4.14 2.62-7.01 6.48-7.01 3.89 0 5.88 2.87 5.88 6.75 0 .5-.05 1.06-.05 1.47zM53.95 9.6c0-1.3-.85-2.32-2.23-2.32-1.35 0-2.32.97-2.55 2.32h4.78zm-12.23 9.91c-2.55 0-3.63-1.35-3.63-3.8V2.34l4.19-.7v13.2c0 .75.31 1.2 1.01 1.2.17 0 .47-.02.67-.08l.7 3.15c-.56.28-1.39.4-2.94.4zm-7.4-.05h-4.19V6.21h4.19v13.25zm-2.1-15.52c-1.35 0-2.37-.97-2.37-2.23 0-1.25 1.02-2.2 2.37-2.2s2.37.95 2.37 2.2c0 1.26-1.02 2.23-2.37 2.23zM25.5 6.21c-.78-.22-1.8-.47-3.17-.47-1.65 0-2.46.65-2.46 1.4 0 .85.95 1.17 2.15 1.65 1.98.72 4.25 1.75 4.25 4.47 0 3.15-2.54 5.25-6.3 5.25-1.79 0-3.66-.37-5.17-1l.77-3.37c1.28.55 3.04 1.02 4.38 1.02 1.6 0 2.32-.5 2.32-1.4 0-.9-.9-1.3-2.37-1.87-2.04-.8-4.03-1.93-4.03-4.5 0-2.9 2.29-5.02 5.98-5.02 1.73 0 3.35.3 4.62.78l-.97 3.06zm-15.63 3.7c.92 0 1.76.1 2.49.3V6.59a4.26 4.26 0 0 0-.87-.07c-1.43 0-2.74.72-3.35 2.04V6.21H4V19.46h4.19v-7.43c0-1.52.83-2.12 1.68-2.12zM0 12.84c0-4.04 2.26-6.78 5.56-6.78 1.48 0 2.67.47 3.66 1.3V.27L5.03 0v6.78c-.72-.55-1.8-.92-2.95-.92C.91 5.86 0 8.08 0 12.84z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

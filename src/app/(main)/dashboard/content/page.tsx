"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  CheckCircle2,
  Bot,
  Target,
  Lightbulb,
  Loader2,
  FileText,
  Hash,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ContentMode = "seo" | "geo";

interface ScoreItem {
  label: string;
  score: number;
  maxScore: number;
  status: "good" | "warning" | "error";
}

export default function ContentPage() {
  const [mode, setMode] = useState<ContentMode>("seo");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setHasResult(true);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setContent(
      mode === "seo"
        ? "# 如何提升网站SEO排名\n\n搜索引擎优化（SEO）是提升网站自然流量的关键策略。本文将介绍五个核心技巧，帮助您的网站在搜索结果中获得更高排名。\n\n## 1. 关键词研究与优化\n\n深入了解目标用户的搜索习惯，选择高价值、低竞争的长尾关键词。使用工具如 Ahrefs、SEMrush 进行关键词分析。\n\n## 2. 内容质量优化\n\n创建有价值、独特的内容，解决用户实际问题。确保内容结构清晰，使用合适的标题层级。\n\n## 3. 技术SEO\n\n- 优化页面加载速度\n- 确保移动端友好\n- 使用结构化数据\n- 优化URL结构\n\n## 4. 外链建设\n\n通过优质内容获取自然外链，开展客座文章合作，建立行业关系。\n\n## 5. 用户体验优化\n\n降低跳出率，增加页面停留时间，提升转化率。"
        : "# 优化AI搜索引擎可见度\n\n随着ChatGPT、Perplexity等AI搜索引擎的普及，品牌需要重新思考内容策略。本文将探讨如何让您的内容在AI驱动的搜索中获得更多曝光。\n\n## 1. 结构化内容创作\n\n清晰的层级结构和FAQ格式有助于AI理解和引用您的内容。使用明确的标题、列表和定义。\n\n## 2. 权威信号建设\n\n- 引用可靠数据来源\n- 展示专业资质\n- 获取权威网站背书\n\n## 3. 事实准确性\n\n确保所有数据和声明都有可验证的来源，AI更倾向于引用准确可靠的信息。\n\n## 4. 语义丰富度\n\n使用相关概念和术语，帮助AI理解内容的完整语境。"
    );
    setIsGenerating(false);
    setHasResult(true);
  };

  const handleClear = () => {
    setContent("");
    setKeywords("");
    setHasResult(false);
  };

  const seoScores: ScoreItem[] = [
    { label: "关键词密度", score: 85, maxScore: 100, status: "good" },
    { label: "标题优化", score: 72, maxScore: 100, status: "warning" },
    { label: "内链结构", score: 90, maxScore: 100, status: "good" },
    { label: "Meta描述", score: 65, maxScore: 100, status: "warning" },
    { label: "可读性", score: 88, maxScore: 100, status: "good" },
  ];

  const geoScores: ScoreItem[] = [
    { label: "AI 可理解性", score: 92, maxScore: 100, status: "good" },
    { label: "结构化程度", score: 78, maxScore: 100, status: "warning" },
    { label: "引用价值", score: 85, maxScore: 100, status: "good" },
    { label: "事实准确性", score: 70, maxScore: 100, status: "warning" },
    { label: "权威信号", score: 82, maxScore: 100, status: "good" },
  ];

  const scores = mode === "seo" ? seoScores : geoScores;
  const totalScore = Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);
  const wordCount = content.length;
  const readingTime = Math.ceil(wordCount / 500);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Dark Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-10 pb-20">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-600/20 via-violet-600/30 to-purple-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8"
          >
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-slate-300">AI 驱动的营销内容平台</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            让 AI 优化您的内容
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
              提升搜索可见度
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-12"
          >
            输入您的内容，AI 将深度分析 SEO 表现、AI 搜索引擎可见度，为您提供专业的优化建议
          </motion.p>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex p-1.5 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 shadow-xl"
          >
            <button
              onClick={() => setMode("seo")}
              className={cn(
                "relative px-10 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300",
                mode === "seo"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {mode === "seo" && (
                <motion.div
                  layoutId="activeContentTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-500/25"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO 优化
              </span>
            </button>
            <button
              onClick={() => setMode("geo")}
              className={cn(
                "relative px-10 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300",
                mode === "geo"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {mode === "geo" && (
                <motion.div
                  layoutId="activeContentTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Bot className="h-4 w-4" />
                GEO 优化
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid lg:grid-cols-[1fr_360px] gap-6"
        >
          {/* Left: Editor Card */}
          <div className="bg-card rounded-2xl border shadow-2xl shadow-slate-900/10 overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-muted/50 to-muted/30">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-11 w-11 rounded-xl flex items-center justify-center shadow-lg",
                  mode === "seo" 
                    ? "bg-gradient-to-br from-blue-500 to-violet-600" 
                    : "bg-gradient-to-br from-violet-500 to-purple-600"
                )}>
                  {mode === "seo" ? (
                    <Search className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {mode === "seo" ? "SEO 内容编辑器" : "GEO 内容编辑器"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mode === "seo" 
                      ? "优化搜索引擎排名" 
                      : "提升 AI 搜索可见度"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="gap-2 h-9"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  AI 生成
                </Button>
                <Button
                  size="sm"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !content.trim()}
                  className={cn(
                    "gap-2 h-9 shadow-lg",
                    mode === "seo"
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-blue-500/25"
                      : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-violet-500/25"
                  )}
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  开始分析
                </Button>
              </div>
            </div>

            {/* Keywords Input */}
            <div className="px-6 py-4 border-b bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <Hash className="h-4 w-4" />
                  <span>关键词</span>
                </div>
                <Input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="输入目标关键词，用逗号分隔..."
                  className="border-0 bg-transparent focus-visible:ring-0 px-0 text-sm"
                />
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-6">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  mode === "seo"
                    ? "输入或粘贴您的内容，AI 将分析关键词密度、标题结构、内链布局等 SEO 指标...\n\n支持 Markdown 格式"
                    : "输入或粘贴您的内容，AI 将分析结构化程度、引用价值、权威信号等 GEO 指标...\n\n支持 Markdown 格式"
                }
                className="min-h-[420px] resize-none border-0 p-0 focus-visible:ring-0 text-base leading-relaxed placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Editor Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/20">
              <div className="flex items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {wordCount} 字符
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  约 {readingTime} 分钟阅读
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-muted-foreground hover:text-foreground">
                  <Copy className="h-3.5 w-3.5" />
                  复制
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear} className="gap-1.5 h-8 text-muted-foreground hover:text-foreground">
                  <RefreshCw className="h-3.5 w-3.5" />
                  清空
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Score Panel */}
          <div className="space-y-5">
            {/* Score Card */}
            <div className="bg-card rounded-2xl border shadow-2xl shadow-slate-900/10 overflow-hidden">
              <div className="p-6 text-center border-b bg-gradient-to-b from-muted/30 to-transparent">
                <div className="text-sm text-muted-foreground mb-3 font-medium">
                  {mode === "seo" ? "SEO 综合评分" : "GEO 综合评分"}
                </div>
                <AnimatePresence mode="wait">
                  {hasResult ? (
                    <motion.div
                      key="score"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="relative inline-flex"
                    >
                      <svg className="w-36 h-36 -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-muted/20"
                        />
                        <motion.circle
                          cx="72"
                          cy="72"
                          r="64"
                          fill="none"
                          stroke="url(#scoreGradient)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0 402" }}
                          animate={{ strokeDasharray: `${(totalScore / 100) * 402} 402` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={mode === "seo" ? "#3b82f6" : "#8b5cf6"} />
                            <stop offset="100%" stopColor={mode === "seo" ? "#8b5cf6" : "#a855f7"} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold">{totalScore}</span>
                        <span className="text-xs text-muted-foreground mt-1">/ 100</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-36 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                          <Target className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <span className="text-muted-foreground text-sm">
                          输入内容后开始分析
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Score Breakdown */}
              <div className="p-5 space-y-4">
                {scores.map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: hasResult ? index * 0.1 : 0 }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={cn(
                        "font-semibold tabular-nums",
                        hasResult && item.status === "good" && "text-emerald-500",
                        hasResult && item.status === "warning" && "text-amber-500",
                        hasResult && item.status === "error" && "text-red-500",
                        !hasResult && "text-muted-foreground/50"
                      )}>
                        {hasResult ? item.score : "--"}
                      </span>
                    </div>
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                      {hasResult && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                          className={cn(
                            "h-full rounded-full",
                            item.status === "good" && "bg-gradient-to-r from-emerald-500 to-teal-400",
                            item.status === "warning" && "bg-gradient-to-r from-amber-500 to-orange-400",
                            item.status === "error" && "bg-gradient-to-r from-red-500 to-rose-400"
                          )}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggestions Card */}
            <div className="bg-card rounded-2xl border shadow-xl p-5">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                </div>
                优化建议
              </h4>
              {hasResult ? (
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">关键词布局合理，密度适中</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Target className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">建议添加更多内部链接增强页面权重</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Target className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">Meta 描述可以更具吸引力和行动号召</span>
                  </li>
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  分析完成后将显示具体的优化建议
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-5 mt-10"
        >
          {[
            {
              icon: Search,
              title: "SEO 深度分析",
              description: "检测技术问题、内容质量和外链情况，全面优化搜索排名",
              color: "from-blue-500 to-cyan-500",
              shadowColor: "shadow-blue-500/20",
            },
            {
              icon: Bot,
              title: "AI 引用检测",
              description: "分析在 ChatGPT、Perplexity 等 AI 搜索中的可见度和引用概率",
              color: "from-violet-500 to-purple-500",
              shadowColor: "shadow-violet-500/20",
            },
            {
              icon: TrendingUp,
              title: "增长建议",
              description: "基于诊断结果提供针对性的内容优化和营销方案",
              color: "from-emerald-500 to-teal-500",
              shadowColor: "shadow-emerald-500/20",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "group relative bg-card rounded-2xl border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                feature.shadowColor
              )}
            >
              <div className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br shadow-lg",
                feature.color,
                feature.shadowColor
              )}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              <ArrowRight className="absolute right-5 bottom-5 h-5 w-5 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

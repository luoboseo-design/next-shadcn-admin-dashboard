"use client";

import Link from "next/link";

import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileCode,
  FileText,
  Gauge,
  Globe,
  Image,
  Info,
  Link2,
  RefreshCw,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Type,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { categoryLabels, severityColors, severityLabels } from "@/data/mock-diagnosis";
import { cn } from "@/lib/utils";
import type { DiagnosisReport as DiagnosisReportType, AuditItem } from "@/types/marketing";

interface DiagnosisReportProps {
  report: DiagnosisReportType;
  onReset: () => void;
}

export function DiagnosisReport({ report, onReset }: DiagnosisReportProps) {
  const isSEO = report.mode === "seo";

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 顶部概览 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Globe className="h-4 w-4" />
            <span className="font-mono">{report.url}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {isSEO ? "SEO 审计报告" : "GEO 诊断报告"}
          </h1>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          重新诊断
        </Button>
      </div>

      {isSEO ? (
        <SEOReportContent report={report} />
      ) : (
        <GEOReportContent report={report} />
      )}

      {/* 问题诊断 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            发现的问题
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.issues.map((issue) => (
              <div key={issue.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                <div className="mt-0.5">
                  {issue.severity === "critical" && <AlertCircle className="h-5 w-5 text-red-500" />}
                  {issue.severity === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                  {issue.severity === "info" && <Info className="h-5 w-5 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold">{issue.title}</span>
                    <Badge className={severityColors[issue.severity]} variant="secondary">
                      {severityLabels[issue.severity]}
                    </Badge>
                    <Badge variant="outline">{categoryLabels[issue.category]}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 服务推荐 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            推荐服务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {report.recommendations.map((rec) => (
              <div
                key={rec.id}
                className={cn("p-4 rounded-lg border transition-all hover:shadow-md", rec.priority === "high" && "border-primary bg-primary/5")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{rec.title}</span>
                  <Badge variant={rec.priority === "high" ? "default" : "secondary"}>
                    {rec.priority === "high" ? "强烈推荐" : "推荐"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    预期效果: {rec.estimatedImpact}
                  </span>
                  {rec.serviceType === "backlinks" ? (
                    <Button size="sm" className="gap-1" asChild>
                      <Link href="/dashboard/services/seo/backlinks">
                        立即使用
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="gap-1" disabled>
                      即将推出
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// SEO 报告内容 - 全新专业设计
function SEOReportContent({ report }: { report: DiagnosisReportType }) {
  const seoAudit = report.seoAudit;
  const [expandedSections, setExpandedSections] = useState<string[]>(["onpage", "technical"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // 计算各项审计的通过数
  const getAuditStats = () => {
    if (!seoAudit) return { passed: 0, warnings: 0, failed: 0, total: 0 };
    const items = [
      seoAudit.titleTag,
      seoAudit.metaDescription,
      seoAudit.headerStructure,
      seoAudit.contentQuality,
      seoAudit.keywordUsage,
      seoAudit.internalLinks,
      seoAudit.images,
      seoAudit.technicalOnPage,
    ];
    return {
      passed: items.filter(i => i.status === "pass").length,
      warnings: items.filter(i => i.status === "warning").length,
      failed: items.filter(i => i.status === "fail").length,
      total: items.length,
    };
  };

  const stats = getAuditStats();

  return (
    <>
      {/* 主评分区域 - 大型综合评分 + 分项评分 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 综合评分 - 大卡片 */}
        <Card className="col-span-12 md:col-span-4 bg-gradient-to-br from-background to-muted/30">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
            <div className="text-sm text-muted-foreground mb-2 font-medium">综合 SEO 评分</div>
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(report.overallScore / 100) * 352} 352`}
                  strokeLinecap="round"
                  className={cn(
                    report.overallScore >= 80 ? "text-green-500" :
                    report.overallScore >= 60 ? "text-amber-500" : "text-red-500"
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn(
                  "text-4xl font-bold",
                  report.overallScore >= 80 ? "text-green-600" :
                  report.overallScore >= 60 ? "text-amber-600" : "text-red-600"
                )}>
                  {report.overallScore}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground">{stats.passed} 通过</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-muted-foreground">{stats.warnings} 警告</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-muted-foreground">{stats.failed} 失败</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 分项评分卡片 */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <SEOScoreCard 
            title="页面 SEO" 
            score={report.seoScore} 
            icon={<FileText className="h-5 w-5" />}
            description="标题、描述、标签"
          />
          <SEOScoreCard 
            title="技术 SEO" 
            score={report.technicalScore} 
            icon={<Settings className="h-5 w-5" />}
            description="速度、移动端、结构"
          />
          <SEOScoreCard 
            title="内容质量" 
            score={report.contentScore} 
            icon={<Type className="h-5 w-5" />}
            description="可读性、关键词、深度"
          />
          <SEOScoreCard 
            title="用户体验" 
            score={Math.round((report.technicalScore + report.contentScore) / 2)} 
            icon={<Users className="h-5 w-5" />}
            description="Core Web Vitals"
          />
        </div>
      </div>

      {/* Core Web Vitals - 独立重要区块 */}
      {seoAudit && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gauge className="h-5 w-5 text-blue-500" />
                Core Web Vitals
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Google 核心指标
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CWVCard
                metric="LCP"
                fullName="Largest Contentful Paint"
                value={seoAudit.coreWebVitals.lcp}
                unit="s"
                thresholds={{ good: 2.5, poor: 4 }}
                description="最大内容绘制时间"
              />
              <CWVCard
                metric="INP"
                fullName="Interaction to Next Paint"
                value={seoAudit.coreWebVitals.inp}
                unit="ms"
                thresholds={{ good: 200, poor: 500 }}
                description="交互到下一次绘制"
              />
              <CWVCard
                metric="CLS"
                fullName="Cumulative Layout Shift"
                value={seoAudit.coreWebVitals.cls}
                unit=""
                thresholds={{ good: 0.1, poor: 0.25 }}
                description="累积布局偏移"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO 审计详情 - 可折叠的专业审计列表 */}
      {seoAudit && (
        <div className="space-y-4">
          {/* 页面元素审计 */}
          <AuditSection
            title="页面元素审计"
            icon={<FileCode className="h-5 w-5" />}
            expanded={expandedSections.includes("onpage")}
            onToggle={() => toggleSection("onpage")}
            items={[
              { 
                icon: <Type className="h-4 w-4" />,
                title: "Title Tag", 
                subtitle: "标题标签优化",
                item: seoAudit.titleTag,
                tip: "建议：50-60 字符，包含主要关键词"
              },
              { 
                icon: <FileText className="h-4 w-4" />,
                title: "Meta Description", 
                subtitle: "元描述优化",
                item: seoAudit.metaDescription,
                tip: "建议：150-160 字符，包含 CTA"
              },
              { 
                icon: <Type className="h-4 w-4" />,
                title: "Header 结构", 
                subtitle: "标题层级结构",
                item: seoAudit.headerStructure,
                tip: "建议：H1 唯一，层级递进清晰"
              },
            ]}
          />

          {/* 内容审计 */}
          <AuditSection
            title="内容质量审计"
            icon={<FileText className="h-5 w-5" />}
            expanded={expandedSections.includes("content")}
            onToggle={() => toggleSection("content")}
            items={[
              { 
                icon: <Type className="h-4 w-4" />,
                title: "内容质量", 
                subtitle: "文字质量与深度",
                item: seoAudit.contentQuality,
                tip: "建议：字数充足、可读性高、E-E-A-T 信号"
              },
              { 
                icon: <Target className="h-4 w-4" />,
                title: "关键词优化", 
                subtitle: "关键词使用策略",
                item: seoAudit.keywordUsage,
                tip: "建议：关键词密度 1-2%，自然分布"
              },
              { 
                icon: <Link2 className="h-4 w-4" />,
                title: "内链结构", 
                subtitle: "内部链接策略",
                item: seoAudit.internalLinks,
                tip: "建议：相关锚文本，合理链接密度"
              },
              { 
                icon: <Image className="h-4 w-4" />,
                title: "图片优化", 
                subtitle: "图片 SEO 状态",
                item: seoAudit.images,
                tip: "建议：描述性 ALT 文本、优化文件大小"
              },
            ]}
          />

          {/* 技术审计 */}
          <AuditSection
            title="技术 SEO 审计"
            icon={<Settings className="h-5 w-5" />}
            expanded={expandedSections.includes("technical")}
            onToggle={() => toggleSection("technical")}
            items={[
              { 
                icon: <Globe className="h-4 w-4" />,
                title: "URL 结构", 
                subtitle: "URL 规范化",
                item: seoAudit.technicalOnPage,
                tip: "建议：简洁 URL、canonical 标签、HTTPS"
              },
              { 
                icon: <Smartphone className="h-4 w-4" />,
                title: "移动端适配", 
                subtitle: "响应式设计",
                item: {
                  score: seoAudit.technicalOnPage.score,
                  status: seoAudit.technicalOnPage.status,
                  findings: ["移动端友好性检测"],
                  recommendations: ["确保响应式设计"]
                },
                tip: "建议：移动优先设计、触控友好"
              },
            ]}
          />

          {/* 外链审计 */}
          <AuditSection
            title="外链审计"
            icon={<ExternalLink className="h-5 w-5" />}
            expanded={expandedSections.includes("backlinks")}
            onToggle={() => toggleSection("backlinks")}
            items={[
              { 
                icon: <Link2 className="h-4 w-4" />,
                title: "外链数量", 
                subtitle: "反向链接数量分析",
                item: {
                  score: Math.floor(Math.random() * 4) + 3,
                  status: "warning" as const,
                  findings: ["检测到外链数量较少"],
                  recommendations: ["建议通过客座文章等方式增加高质量外链"]
                },
                tip: "建议：获取高权重网站的反向链接"
              },
              { 
                icon: <TrendingUp className="h-4 w-4" />,
                title: "外链质量", 
                subtitle: "链接来源权重",
                item: {
                  score: Math.floor(Math.random() * 3) + 4,
                  status: "warning" as const,
                  findings: ["外链质量有提升空间"],
                  recommendations: ["建议获取更多高 DA 网站的外链"]
                },
                tip: "建议：专注于权威网站、行业相关网站"
              },
              { 
                icon: <FileText className="h-4 w-4" />,
                title: "锚文本分布", 
                subtitle: "链接文本多样性",
                item: {
                  score: Math.floor(Math.random() * 3) + 5,
                  status: "pass" as const,
                  findings: ["锚文本分布较为自然"],
                  recommendations: ["保持锚文本多样化"]
                },
                tip: "建议：混合使用品牌词、关键词、自然锚文本"
              },
            ]}
          />
        </div>
      )}
    </>
  );
}

// SEO 评分卡片组件
function SEOScoreCard({ 
  title, 
  score, 
  icon, 
  description 
}: { 
  title: string; 
  score: number; 
  icon: React.ReactNode;
  description: string;
}) {
  const getColor = (s: number) => {
    if (s >= 80) return { text: "text-green-600", bg: "bg-green-500", light: "bg-green-100 dark:bg-green-900/30" };
    if (s >= 60) return { text: "text-amber-600", bg: "bg-amber-500", light: "bg-amber-100 dark:bg-amber-900/30" };
    return { text: "text-red-600", bg: "bg-red-500", light: "bg-red-100 dark:bg-red-900/30" };
  };

  const colors = getColor(score);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-4 pb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", colors.light)}>
          <span className={colors.text}>{icon}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">{title}</div>
        <div className={cn("text-3xl font-bold mb-1", colors.text)}>{score}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all", colors.bg)} 
            style={{ width: `${score}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Core Web Vitals 卡片
function CWVCard({
  metric,
  fullName,
  value,
  unit,
  thresholds,
  description,
}: {
  metric: string;
  fullName: string;
  value: number;
  unit: string;
  thresholds: { good: number; poor: number };
  description: string;
}) {
  const isGood = value <= thresholds.good;
  const isPoor = value > thresholds.poor;
  const status = isGood ? "good" : isPoor ? "poor" : "needs-improvement";
  
  const statusConfig = {
    good: { 
      color: "text-green-600", 
      bg: "bg-green-100 dark:bg-green-900/30", 
      border: "border-green-200 dark:border-green-800",
      label: "良好"
    },
    "needs-improvement": { 
      color: "text-amber-600", 
      bg: "bg-amber-100 dark:bg-amber-900/30", 
      border: "border-amber-200 dark:border-amber-800",
      label: "需改进"
    },
    poor: { 
      color: "text-red-600", 
      bg: "bg-red-100 dark:bg-red-900/30", 
      border: "border-red-200 dark:border-red-800",
      label: "较差"
    },
  };

  const config = statusConfig[status];
  const displayValue = unit === "s" ? value.toFixed(2) : unit === "ms" ? Math.round(value) : value.toFixed(3);

  return (
    <div className={cn("p-4 rounded-lg border-2 transition-all", config.border, config.bg)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{metric}</span>
        <Badge variant="outline" className={cn("text-xs", config.color)}>
          {config.label}
        </Badge>
      </div>
      <div className={cn("text-3xl font-bold mb-1", config.color)}>
        {displayValue}{unit}
      </div>
      <div className="text-xs text-muted-foreground mb-2">{description}</div>
      <div className="text-xs text-muted-foreground">
        目标: {"<"} {thresholds.good}{unit}
      </div>
    </div>
  );
}

// 审计区块组件
function AuditSection({
  title,
  icon,
  expanded,
  onToggle,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  items: Array<{
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    item: AuditItem;
    tip: string;
  }>;
}) {
  const passedCount = items.filter(i => i.item.status === "pass").length;

  return (
    <Card>
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary">{icon}</span>
          <span className="font-semibold">{title}</span>
          <Badge variant="outline" className="text-xs">
            {passedCount}/{items.length} 通过
          </Badge>
        </div>
        {expanded ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      {expanded && (
        <CardContent className="pt-0 pb-4">
          <div className="space-y-3">
            {items.map((item, index) => (
              <AuditItemRow key={index} {...item} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// 审计项目行
function AuditItemRow({
  icon,
  title,
  subtitle,
  item,
  tip,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  item: AuditItem;
  tip: string;
}) {
  const statusConfig = {
    pass: { 
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-100 dark:border-green-900/30",
    },
    warning: { 
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bg: "bg-amber-50 dark:bg-amber-900/10",
      border: "border-amber-100 dark:border-amber-900/30",
    },
    fail: { 
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-100 dark:border-red-900/30",
    },
  };

  const config = statusConfig[item.status];

  return (
    <div className={cn("p-4 rounded-lg border transition-all", config.bg, config.border)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-muted-foreground">{icon}</div>
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{subtitle}</div>
            {item.findings.length > 0 && (
              <div className="mt-2 text-sm text-muted-foreground">
                {item.findings[0]}
              </div>
            )}
            <div className="mt-2 text-xs text-muted-foreground/80">{tip}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className={cn(
              "text-lg font-bold",
              item.score >= 8 ? "text-green-600" : item.score >= 5 ? "text-amber-600" : "text-red-600"
            )}>
              {item.score}/10
            </div>
          </div>
          {config.icon}
        </div>
      </div>
    </div>
  );
}

// GEO 报告内容
function GEOReportContent({ report }: { report: DiagnosisReportType }) {
  const geoAudit = report.geoAudit;

  return (
    <>
      {/* GEO 评分卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ScoreCard title="综合评分" score={report.overallScore} large className="col-span-2 md:col-span-1" color="violet" />
        <ScoreCard title="AI 引用" score={report.geoScore} color="violet" />
        <ScoreCard title="内容" score={report.contentScore} color="violet" />
        <ScoreCard title="SEO" score={report.seoScore} color="violet" />
        <ScoreCard title="技术" score={report.technicalScore} color="violet" />
      </div>

      {/* AI 引擎可见度 */}
      {geoAudit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-violet-500" />
              AI 搜索引擎可见度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AIEngineCard 
                name="ChatGPT" 
                status={geoAudit.aiEngineVisibility.chatgpt}
              />
              <AIEngineCard 
                name="Perplexity" 
                status={geoAudit.aiEngineVisibility.perplexity}
              />
              <AIEngineCard 
                name="Claude" 
                status={geoAudit.aiEngineVisibility.claude}
              />
              <AIEngineCard 
                name="Gemini" 
                status={geoAudit.aiEngineVisibility.gemini}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* GEO 详细审计 */}
      {geoAudit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              GEO 内容优化审计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <AuditItemCard 
                icon={<FileText className="h-4 w-4" />}
                title="引用就绪度" 
                item={geoAudit.citationReadiness}
                description="清晰定义、可直接引用的声明"
                color="violet"
              />
              <AuditItemCard 
                icon={<FileText className="h-4 w-4" />}
                title="可引用内容" 
                item={geoAudit.quotableContent}
                description="25-50字的独立定义性语句"
                color="violet"
              />
              <AuditItemCard 
                icon={<Target className="h-4 w-4" />}
                title="事实密度" 
                item={geoAudit.factualDensity}
                description="具体数据、统计和可验证事实"
                color="violet"
              />
              <AuditItemCard 
                icon={<Link2 className="h-4 w-4" />}
                title="来源归因" 
                item={geoAudit.sourceAttribution}
                description="权威来源引用和专家观点"
                color="violet"
              />
              <AuditItemCard 
                icon={<FileText className="h-4 w-4" />}
                title="结构化内容" 
                item={geoAudit.structuredContent}
                description="Q&A格式、表格、列表"
                color="violet"
              />
              <AuditItemCard 
                icon={<Target className="h-4 w-4" />}
                title="实体优化" 
                item={geoAudit.entityOptimization}
                description="品牌/产品名称消歧"
                color="violet"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* 业务类型和受众 */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-violet-500" />
              业务类型
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {report.businessType}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-violet-500" />
              目标受众
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {report.targetAudience.map((audience, i) => (
                <Badge key={i} variant="outline">
                  {audience}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI 引用情况 - 详细 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI 搜索引擎引用详情
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.aiCitations.map((citation, i) => (
              <div
                key={i}
                className={cn(
                  "p-4 rounded-lg border",
                  citation.isReferenced
                    ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                    : "bg-muted/50",
                )}
              >
                <div className="font-semibold mb-1">{citation.source}</div>
                <div className="text-sm text-muted-foreground mb-2 truncate">{citation.query}</div>
                {citation.isReferenced ? (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">{citation.rank ? `排名 #${citation.rank}` : "已被引用"}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">未被引用</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// 评分卡片 - GEO用
function ScoreCard({
  title,
  score,
  large,
  className,
  color = "default",
}: {
  title: string;
  score: number;
  large?: boolean;
  className?: string;
  color?: "default" | "violet";
}) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-600 dark:text-green-400";
    if (s >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressColor = (s: number) => {
    if (s >= 80) return "bg-green-500";
    if (s >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className={className}>
      <CardContent className={cn("pt-4", large && "pt-6")}>
        <div className="text-sm text-muted-foreground mb-1">{title}</div>
        <div className={cn("font-bold mb-2", large ? "text-4xl" : "text-2xl", getScoreColor(score))}>{score}</div>
        <Progress value={score} className={cn("h-1.5", `[&>div]:${getProgressColor(score)}`)} />
      </CardContent>
    </Card>
  );
}

// 审计项目卡片 - GEO用
function AuditItemCard({ 
  icon, 
  title, 
  item, 
  description,
  color = "default"
}: { 
  icon: React.ReactNode;
  title: string; 
  item: AuditItem;
  description: string;
  color?: "default" | "violet";
}) {
  const statusColors = {
    pass: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    warning: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    fail: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusLabels = {
    pass: "通过",
    warning: "警告",
    fail: "未通过",
  };

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={color === "violet" ? "text-violet-500" : "text-primary"}>{icon}</span>
          <span className="font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-lg font-bold",
            item.score >= 8 ? "text-green-600" : item.score >= 5 ? "text-amber-600" : "text-red-600"
          )}>
            {item.score}/10
          </span>
          <Badge className={statusColors[item.status]} variant="secondary">
            {statusLabels[item.status]}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      {item.findings.length > 0 && (
        <p className="text-sm">
          <span className="text-muted-foreground">发现：</span>
          {item.findings[0]}
        </p>
      )}
    </div>
  );
}

// AI 引擎卡片
function AIEngineCard({ 
  name, 
  status 
}: { 
  name: string; 
  status: { isIndexed: boolean; citationCount: number; visibility: string }; 
}) {
  const visibilityConfig = {
    high: { label: "高可见度", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
    medium: { label: "中等可见度", color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    low: { label: "低可见度", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
    none: { label: "未被索引", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
  };

  const config = visibilityConfig[status.visibility as keyof typeof visibilityConfig];

  return (
    <div className={cn("p-4 rounded-lg border", config.bg)}>
      <div className="font-semibold mb-2">{name}</div>
      <div className={cn("text-sm font-medium mb-1", config.color)}>{config.label}</div>
      {status.isIndexed && (
        <div className="text-xs text-muted-foreground">引用次数: {status.citationCount}</div>
      )}
    </div>
  );
}

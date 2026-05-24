"use client";

import Link from "next/link";

import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  Info,
  Link2,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* 顶部概览 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Globe className="h-4 w-4" />
            <span>{report.url}</span>
            <Badge variant="outline" className={cn(
              isSEO ? "border-primary text-primary" : "border-violet-500 text-violet-500"
            )}>
              {isSEO ? "SEO 诊断" : "GEO 诊断"}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">诊断报告</h1>
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

      {/* 问题诊断 - 通用 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            发现的问题
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.issues.map((issue) => (
              <div key={issue.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
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
            <TrendingUp className="h-5 w-5 text-primary" />
            推荐服务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {report.recommendations.map((rec) => (
              <div
                key={rec.id}
                className={cn("p-4 rounded-lg border", rec.priority === "high" && "border-primary bg-primary/5")}
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

// SEO 报告内容
function SEOReportContent({ report }: { report: DiagnosisReportType }) {
  const seoAudit = report.seoAudit;

  return (
    <>
      {/* SEO 评分卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ScoreCard title="综合评分" score={report.overallScore} large className="col-span-2 md:col-span-1" />
        <ScoreCard title="SEO" score={report.seoScore} />
        <ScoreCard title="技术" score={report.technicalScore} />
        <ScoreCard title="内容" score={report.contentScore} />
        <ScoreCard title="AI 引用" score={report.geoScore} />
      </div>

      {/* SEO 详细审计 */}
      {seoAudit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              SEO 详细审计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="onpage" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="onpage">页面元素</TabsTrigger>
                <TabsTrigger value="content">内容质量</TabsTrigger>
                <TabsTrigger value="technical">技术指标</TabsTrigger>
              </TabsList>
              
              <TabsContent value="onpage" className="mt-4 space-y-4">
                <AuditItemCard 
                  icon={<FileText className="h-4 w-4" />}
                  title="Title Tag" 
                  item={seoAudit.titleTag}
                  description="50-60字符，包含目标关键词"
                />
                <AuditItemCard 
                  icon={<FileText className="h-4 w-4" />}
                  title="Meta Description" 
                  item={seoAudit.metaDescription}
                  description="150-160字符，包含CTA"
                />
                <AuditItemCard 
                  icon={<FileText className="h-4 w-4" />}
                  title="Header 结构" 
                  item={seoAudit.headerStructure}
                  description="H1唯一，层级清晰"
                />
              </TabsContent>

              <TabsContent value="content" className="mt-4 space-y-4">
                <AuditItemCard 
                  icon={<FileText className="h-4 w-4" />}
                  title="内容质量" 
                  item={seoAudit.contentQuality}
                  description="字数、可读性、E-E-A-T信号"
                />
                <AuditItemCard 
                  icon={<Target className="h-4 w-4" />}
                  title="关键词使用" 
                  item={seoAudit.keywordUsage}
                  description="关键词密度和位置分布"
                />
                <AuditItemCard 
                  icon={<Link2 className="h-4 w-4" />}
                  title="内链结构" 
                  item={seoAudit.internalLinks}
                  description="链接数量和锚文本相关性"
                />
                <AuditItemCard 
                  icon={<FileText className="h-4 w-4" />}
                  title="图片优化" 
                  item={seoAudit.images}
                  description="ALT文本、文件名、大小"
                />
              </TabsContent>

              <TabsContent value="technical" className="mt-4 space-y-4">
                <AuditItemCard 
                  icon={<Zap className="h-4 w-4" />}
                  title="技术页面元素" 
                  item={seoAudit.technicalOnPage}
                  description="URL、canonical、移动端、HTTPS"
                />
                
                {/* Core Web Vitals */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Core Web Vitals</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <CWVMetric 
                      label="LCP" 
                      value={seoAudit.coreWebVitals.lcp.toFixed(2)} 
                      unit="s"
                      good={seoAudit.coreWebVitals.lcp <= 2.5}
                      threshold="< 2.5s"
                    />
                    <CWVMetric 
                      label="INP" 
                      value={Math.round(seoAudit.coreWebVitals.inp)} 
                      unit="ms"
                      good={seoAudit.coreWebVitals.inp <= 200}
                      threshold="< 200ms"
                    />
                    <CWVMetric 
                      label="CLS" 
                      value={seoAudit.coreWebVitals.cls.toFixed(3)} 
                      unit=""
                      good={seoAudit.coreWebVitals.cls <= 0.1}
                      threshold="< 0.1"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* 业务类型和受众 */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
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
              <Users className="h-5 w-5 text-primary" />
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
    </>
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

// 评分卡片
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

// 审计项目卡片
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
        <div className="text-sm">
          <span className="font-medium">发现：</span>
          <span className="text-muted-foreground">{item.findings.join("、")}</span>
        </div>
      )}
    </div>
  );
}

// Core Web Vitals 指标
function CWVMetric({ 
  label, 
  value, 
  unit, 
  good, 
  threshold 
}: { 
  label: string; 
  value: string | number; 
  unit: string;
  good: boolean;
  threshold: string;
}) {
  return (
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className={cn(
        "text-2xl font-bold",
        good ? "text-green-600" : "text-red-600"
      )}>
        {value}{unit}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        目标: {threshold}
      </div>
    </div>
  );
}

// AI 引擎卡片
function AIEngineCard({ 
  name, 
  status 
}: { 
  name: string; 
  status: { isIndexed: boolean; citationCount: number; visibility: string; sampleQueries: string[] };
}) {
  const visibilityColors = {
    high: "text-green-600 bg-green-100 dark:bg-green-900/30",
    medium: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
    low: "text-orange-600 bg-orange-100 dark:bg-orange-900/30",
    none: "text-red-600 bg-red-100 dark:bg-red-900/30",
  };

  const visibilityLabels = {
    high: "高可见度",
    medium: "中等可见度",
    low: "低可见度",
    none: "未被索引",
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border",
      status.isIndexed ? "bg-violet-50/50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800" : "bg-muted/50"
    )}>
      <div className="font-semibold mb-2">{name}</div>
      <Badge className={visibilityColors[status.visibility as keyof typeof visibilityColors]} variant="secondary">
        {visibilityLabels[status.visibility as keyof typeof visibilityLabels]}
      </Badge>
      {status.isIndexed && (
        <div className="mt-2 text-sm text-muted-foreground">
          引用次数: <span className="font-medium text-foreground">{status.citationCount}</span>
        </div>
      )}
    </div>
  );
}

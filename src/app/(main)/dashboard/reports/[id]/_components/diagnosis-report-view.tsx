"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileCode,
  FileText,
  Gauge,
  Globe,
  HelpCircle,
  Image,
  Info,
  Link2,
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { DiagnosisReport, AuditItem, AIEngineStatus } from "@/types/marketing";

interface DiagnosisReportViewProps {
  report: DiagnosisReport;
}

// 分数颜色映射
const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-amber-500";
  return "text-red-500";
};

const getScoreBgColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
};

// 严重程度标签和颜色
const severityLabels = {
  critical: "严重",
  warning: "警告",
  info: "建议",
};

const severityColors = {
  critical: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

// 分类标签
const categoryLabels = {
  seo: "SEO",
  geo: "GEO",
  technical: "技术",
  content: "内容",
  performance: "性能",
};

export function DiagnosisReportView({ report }: DiagnosisReportViewProps) {
  const isSEO = report.mode === "seo";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 报告头部 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {isSEO ? "SEO" : "GEO"} 诊断报告
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{report.url}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ScoreCircle score={report.overallScore} label="综合评分" />
        </div>
      </div>

      {/* 报告内容 */}
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

      {/* 推荐服务 */}
      <RecommendedServices mode={isSEO ? "seo" : "geo"} />
    </div>
  );
}

// 分数圆圈组件
function ScoreCircle({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "w-20 h-20 rounded-full border-4 flex items-center justify-center",
        score >= 80 ? "border-green-500" : score >= 60 ? "border-amber-500" : "border-red-500"
      )}>
        <span className={cn("text-2xl font-bold", getScoreColor(score))}>{score}</span>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

// 评分卡片组件
function ScoreCard({ title, score, large, className, color = "primary" }: { 
  title: string; 
  score: number; 
  large?: boolean; 
  className?: string;
  color?: "primary" | "violet";
}) {
  return (
    <Card className={cn(className)}>
      <CardContent className={cn("flex flex-col items-center justify-center", large ? "py-6" : "py-4")}>
        <span className={cn(
          "font-bold",
          large ? "text-4xl" : "text-2xl",
          getScoreColor(score)
        )}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground mt-1">{title}</span>
        <Progress 
          value={score} 
          className={cn("h-1.5 mt-2", large ? "w-24" : "w-16")} 
        />
      </CardContent>
    </Card>
  );
}

// AI引擎卡片
function AIEngineCard({ name, status }: { name: string; status: AIEngineStatus }) {
  return (
    <div className={cn(
      "p-4 rounded-lg border text-center",
      status.isIndexed 
        ? status.visibility === "high" 
          ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
          : status.visibility === "medium"
            ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"
            : "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800"
        : "bg-muted/50"
    )}>
      <div className="font-semibold mb-1">{name}</div>
      {status.isIndexed ? (
        <>
          <div className={cn(
            "text-sm font-medium",
            status.visibility === "high" ? "text-green-600 dark:text-green-400" :
            status.visibility === "medium" ? "text-amber-600 dark:text-amber-400" :
            "text-orange-600 dark:text-orange-400"
          )}>
            {status.visibility === "high" ? "高可见度" : status.visibility === "medium" ? "中等可见度" : "低可见度"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            引用次数: {status.citationCount}
          </div>
        </>
      ) : (
        <div className="text-sm text-muted-foreground">未被索引</div>
      )}
    </div>
  );
}

// 审计项卡片
function AuditItemCard({ 
  icon, 
  title, 
  item, 
  description,
  color = "primary"
}: { 
  icon: React.ReactNode;
  title: string; 
  item: AuditItem;
  description: string;
  color?: "primary" | "violet";
}) {
  const statusColors = {
    pass: "text-green-500",
    warning: "text-amber-500",
    fail: "text-red-500",
  };

  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={color === "violet" ? "text-violet-500" : "text-primary"}>{icon}</span>
          <span className="font-medium">{title}</span>
        </div>
        <span className={cn("font-bold", statusColors[item.status])}>
          {item.score}/10
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      <Progress 
        value={item.score * 10} 
        className="h-1.5"
      />
    </div>
  );
}

// SEO报告内容
function SEOReportContent({ report }: { report: DiagnosisReport }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["onpage"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const seoAudit = report.seoAudit;

  return (
    <>
      {/* 评分概览 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ScoreCard title="综合评分" score={report.overallScore} large className="col-span-2 md:col-span-1" />
        <ScoreCard title="SEO" score={report.seoScore} />
        <ScoreCard title="内容" score={report.contentScore} />
        <ScoreCard title="技术" score={report.technicalScore} />
        <ScoreCard title="GEO" score={report.geoScore} />
      </div>

      {/* SEO审计详情 */}
      {seoAudit && (
        <div className="space-y-4">
          <AuditSection
            title="页面SEO审计"
            icon={<FileText className="h-5 w-5" />}
            expanded={expandedSections.includes("onpage")}
            onToggle={() => toggleSection("onpage")}
            items={[
              { icon: <Type className="h-4 w-4" />, title: "标题标签", subtitle: "Title Tag 优化", item: seoAudit.titleTag, tip: "建议：50-60字符，包含主关键词" },
              { icon: <FileText className="h-4 w-4" />, title: "Meta描述", subtitle: "Meta Description", item: seoAudit.metaDescription, tip: "建议：150-160字符，吸引点击" },
              { icon: <Type className="h-4 w-4" />, title: "H1标签", subtitle: "主标题优化", item: seoAudit.h1Tag, tip: "建议：每页一个H1，包含主关键词" },
              { icon: <Image className="h-4 w-4" />, title: "图片Alt", subtitle: "图片替代文本", item: seoAudit.imageAlt, tip: "建议：描述图片内容，包含关键词" },
              { icon: <Link2 className="h-4 w-4" />, title: "内部链接", subtitle: "站内链接结构", item: seoAudit.internalLinks, tip: "建议：合理的内链结构" },
            ]}
          />
        </div>
      )}
    </>
  );
}

// GEO报告内容
function GEOReportContent({ report }: { report: DiagnosisReport }) {
  const geoAudit = report.geoAudit;
  const businessProfile = geoAudit?.businessProfile;

  return (
    <>
      {/* 业务画像 */}
      {businessProfile && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              业务画像
            </CardTitle>
            <CardDescription>AI 自动识别的网站业务信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">品牌名称</div>
                <div className="font-semibold">{businessProfile.brandName}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">语言 / 市场</div>
                <div className="font-semibold">{businessProfile.language} / {businessProfile.country}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">行业类型</div>
                <div className="font-semibold">{businessProfile.industry}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">业务模式</div>
                <div className="font-semibold">{businessProfile.businessModel}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 sm:col-span-2">
                <div className="text-xs text-muted-foreground mb-1">核心产品/服务</div>
                <div className="font-semibold">{businessProfile.coreProducts}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 sm:col-span-2">
                <div className="text-xs text-muted-foreground mb-1">目标客户</div>
                <div className="font-semibold">{businessProfile.targetCustomers}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI搜索引擎可见度 */}
      {geoAudit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI 搜索引擎可见度
            </CardTitle>
            <CardDescription>检测您的网站在各AI平台的引用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <AIEngineCard name="ChatGPT" status={geoAudit.aiEngineVisibility.chatgpt} />
              <AIEngineCard name="Perplexity" status={geoAudit.aiEngineVisibility.perplexity} />
              <AIEngineCard name="Claude" status={geoAudit.aiEngineVisibility.claude} />
              <AIEngineCard name="Gemini" status={geoAudit.aiEngineVisibility.gemini} />
              {geoAudit.aiEngineVisibility.deepseek && (
                <AIEngineCard name="DeepSeek" status={geoAudit.aiEngineVisibility.deepseek} />
              )}
              {geoAudit.aiEngineVisibility.doubao && (
                <AIEngineCard name="豆包" status={geoAudit.aiEngineVisibility.doubao} />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* GEO内容审计 */}
      {geoAudit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              GEO 内容审计
            </CardTitle>
            <CardDescription>评估内容被AI引用的就绪程度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* 竞争对手分析 */}
      {geoAudit?.competitors && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              竞争对手分析
            </CardTitle>
            <CardDescription>主要竞争对手的AI可见度对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {geoAudit.competitors.map((competitor, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {competitor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{competitor.name}</div>
                      <div className="text-sm text-muted-foreground">{competitor.domain}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{competitor.strength}</div>
                    <Badge 
                      variant={competitor.aiVisibility === "high" ? "default" : "secondary"}
                      className={cn(
                        competitor.aiVisibility === "high" && "bg-green-500",
                        competitor.aiVisibility === "medium" && "bg-amber-500",
                        competitor.aiVisibility === "low" && "bg-red-500"
                      )}
                    >
                      AI可见度: {competitor.aiVisibility === "high" ? "高" : competitor.aiVisibility === "medium" ? "中" : "低"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 关键词建议 */}
      {geoAudit?.keywordSuggestions && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              关键词及问答建议
            </CardTitle>
            <CardDescription>AI推荐的优化关键词和常见问题</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-sm font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                核心关键词
              </div>
              <div className="flex flex-wrap gap-2">
                {geoAudit.keywordSuggestions.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1.5">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                长尾关键词
              </div>
              <div className="flex flex-wrap gap-2">
                {geoAudit.keywordSuggestions.longTails.map((keyword, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1.5">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                问答覆盖建议
              </div>
              <div className="space-y-2">
                {geoAudit.keywordSuggestions.queries.map((query, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <HelpCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{query}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
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
  const passCount = items.filter(i => i.item.status === "pass").length;
  const totalCount = items.length;

  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-primary">{icon}</span>
            {title}
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="outline">
              {passCount}/{totalCount} 通过
            </Badge>
            {expanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className="text-primary">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-semibold",
                    item.item.status === "pass" ? "text-green-500" :
                    item.item.status === "warning" ? "text-amber-500" : "text-red-500"
                  )}>
                    {item.item.score}/10
                  </span>
                  {item.item.status === "pass" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {item.item.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                  {item.item.status === "fail" && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// 推荐服务组件
function RecommendedServices({ mode }: { mode: "seo" | "geo" }) {
  const geoServices = [
    {
      id: "geo-optimization",
      title: "AI 搜索优化 (GEO)",
      description: "优化内容以提升在 AI 搜索引擎中的可见度和引用率",
      impact: "+200% AI 引用量",
      priority: "high" as const,
      available: true,
      href: "/dashboard/services/geo",
    },
    {
      id: "social-distribution",
      title: "新媒体分发服务",
      description: "一键将内容分发到多个社交平台，扩大品牌影响力",
      impact: "+150% 社交曝光",
      priority: "high" as const,
      available: false,
      href: "/dashboard/services/social",
    },
    {
      id: "content-publishing",
      title: "软文发稿服务",
      description: "专业媒体渠道发布优质内容，提升品牌曝光和权威性",
      impact: "+300% 品牌曝光",
      priority: "high" as const,
      available: false,
      href: "/dashboard/services/publishing",
    },
    {
      id: "seo-backlink",
      title: "SEO 外链建设服务",
      description: "通过高质量外链提升网站权重，预计可提升 DA 15-25 分",
      impact: "+40% 自然流量",
      priority: "medium" as const,
      available: true,
      href: "/dashboard/services/seo/backlinks",
    },
  ];

  const seoServices = [
    {
      id: "seo-backlink",
      title: "SEO 外链建设服务",
      description: "通过高质量外链提升网站权重，预计可提升 DA 15-25 分",
      impact: "+40% 自然流量",
      priority: "high" as const,
      available: true,
      href: "/dashboard/services/seo/backlinks",
    },
    {
      id: "content-publishing",
      title: "软文发稿服务",
      description: "专业媒体渠道发布优质内容，提升品牌曝光和权威性",
      impact: "+300% 品牌曝光",
      priority: "high" as const,
      available: false,
      href: "/dashboard/services/publishing",
    },
    {
      id: "geo-optimization",
      title: "AI 搜索优化 (GEO)",
      description: "优化内容以提升在 AI 搜索引擎中的可见度和引用率",
      impact: "+200% AI 引用量",
      priority: "medium" as const,
      available: true,
      href: "/dashboard/services/geo",
    },
    {
      id: "social-distribution",
      title: "新媒体分发服务",
      description: "一键将内容分发到多个社交平台，扩大品牌影响力",
      impact: "+150% 社交曝光",
      priority: "medium" as const,
      available: false,
      href: "/dashboard/services/social",
    },
  ];

  const services = mode === "geo" ? geoServices : seoServices;

  return (
    <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-500 text-white">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="text-green-700 dark:text-green-400">推荐服务</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "p-5 rounded-xl border-2 bg-card transition-all hover:shadow-lg",
                service.priority === "high" 
                  ? "border-green-300 dark:border-green-700" 
                  : "border-border"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-base">{service.title}</h3>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs font-medium",
                    service.priority === "high"
                      ? "border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50"
                      : "border-primary text-primary"
                  )}
                >
                  {service.priority === "high" ? "强烈推荐" : "推荐"}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">预期效果: </span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {service.impact}
                  </span>
                </div>
                {service.available ? (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                  >
                    立即使用
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    即将推出
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

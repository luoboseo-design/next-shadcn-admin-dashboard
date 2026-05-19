"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Info,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { DiagnosisReport as DiagnosisReportType } from "@/types/marketing";
import { severityColors, severityLabels, categoryLabels } from "@/data/mock-diagnosis";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DiagnosisReportProps {
  report: DiagnosisReportType;
  onReset: () => void;
}

export function DiagnosisReport({ report, onReset }: DiagnosisReportProps) {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      {/* 顶部概览 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Globe className="h-4 w-4" />
            <span>{report.url}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">诊断报告</h1>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          重新诊断
        </Button>
      </div>

      {/* 评分卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ScoreCard
          title="综合评分"
          score={report.overallScore}
          large
          className="col-span-2 md:col-span-1"
        />
        <ScoreCard title="SEO" score={report.seoScore} />
        <ScoreCard title="AI 引用" score={report.geoScore} />
        <ScoreCard title="技术" score={report.technicalScore} />
        <ScoreCard title="内容" score={report.contentScore} />
      </div>

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

      {/* AI 引用情况 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 搜索引擎引用情况
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
                    : "bg-muted/50"
                )}
              >
                <div className="font-semibold mb-1">{citation.source}</div>
                <div className="text-sm text-muted-foreground mb-2 truncate">
                  {citation.query}
                </div>
                {citation.isReferenced ? (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {citation.rank ? `排名 #${citation.rank}` : "已被引用"}
                    </span>
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

      {/* 问题诊断 */}
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
              <div
                key={issue.id}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
              >
                <div className="mt-0.5">
                  {issue.severity === "critical" && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {issue.severity === "warning" && (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                  {issue.severity === "info" && (
                    <Info className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{issue.title}</span>
                    <Badge className={severityColors[issue.severity]} variant="secondary">
                      {severityLabels[issue.severity]}
                    </Badge>
                    <Badge variant="outline">{categoryLabels[issue.category]}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {issue.description}
                  </p>
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
                className={cn(
                  "p-4 rounded-lg border",
                  rec.priority === "high" && "border-primary bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{rec.title}</span>
                  <Badge
                    variant={rec.priority === "high" ? "default" : "secondary"}
                  >
                    {rec.priority === "high" ? "强烈推荐" : "推荐"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {rec.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    预期效果: {rec.estimatedImpact}
                  </span>
                  {rec.serviceType === "backlinks" ? (
                    <Button size="sm" className="gap-1" asChild>
                      <Link href="/dashboard/services/backlinks">
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

function ScoreCard({
  title,
  score,
  large,
  className,
}: {
  title: string;
  score: number;
  large?: boolean;
  className?: string;
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
        <div
          className={cn(
            "font-bold mb-2",
            large ? "text-4xl" : "text-2xl",
            getScoreColor(score)
          )}
        >
          {score}
        </div>
        <Progress
          value={score}
          className={cn("h-1.5", `[&>div]:${getProgressColor(score)}`)}
        />
      </CardContent>
    </Card>
  );
}

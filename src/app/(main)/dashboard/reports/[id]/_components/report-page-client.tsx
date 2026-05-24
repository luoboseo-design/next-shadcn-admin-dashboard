"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Share2, Calendar, Globe, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { generateMockDiagnosis } from "@/data/mock-diagnosis";
import type { DiagnosisReport, DiagnosisMode } from "@/types/marketing";

// 导入首页的诊断报告组件
import { DiagnosisReportContent } from "@/app/(main)/dashboard/home/_components/diagnosis-report";

interface ReportPageClientProps {
  reportId: string;
  initialData: {
    id: string;
    url: string;
    mode: DiagnosisMode;
    createdAt: string;
  };
}

// AI分析网站业务画像
async function analyzeWebsite(url: string) {
  try {
    const response = await fetch("/api/analyze-website", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) {
      throw new Error("Analysis failed");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Website analysis error:", error);
    return null;
  }
}

export function ReportPageClient({ reportId, initialData }: ReportPageClientProps) {
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 加载报告数据
    // TODO: 替换为真实的数据库查询
    const loadReport = async () => {
      setIsLoading(true);
      
      const url = initialData.url.startsWith("http") ? initialData.url : `https://${initialData.url}`;
      
      // 并行执行AI分析
      const aiAnalysis = await analyzeWebsite(url);
      
      // 生成报告数据（实际开发时从数据库获取）
      const fullReport = generateMockDiagnosis(url, initialData.mode, aiAnalysis);
      
      setReport(fullReport);
      setIsLoading(false);
    };

    loadReport();
  }, [initialData]);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${initialData.mode === "seo" ? "SEO" : "GEO"}诊断报告`,
          text: `查看 ${initialData.url} 的诊断报告`,
          url,
        });
      } catch {
        // 用户取消分享
      }
    } else {
      // 复制链接到剪贴板
      await navigator.clipboard.writeText(url);
      alert("链接已复制到剪贴板");
    }
  };

  const handleDownload = () => {
    // TODO: 实现PDF下载功能
    alert("PDF下载功能即将推出");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Link>
            </Button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span className="font-medium text-foreground">{initialData.url}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(initialData.createdAt)}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              下载PDF
            </Button>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">加载报告中...</p>
        </div>
      ) : report ? (
        <DiagnosisReportContent report={report} />
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">报告数据加载失败</p>
        </div>
      )}
    </div>
  );
}

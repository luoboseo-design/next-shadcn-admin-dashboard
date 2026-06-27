import { Metadata } from "next";
import { notFound } from "next/navigation";

import type { DiagnosisMode } from "@/types/marketing";

import { ReportPageClient } from "./_components/report-page-client";

// 从报告ID和URL参数解析报告信息
// TODO: 替换为真实的数据库查询
async function getReport(id: string, urlParam?: string) {
  // 如果报告不存在，返回 null
  if (id === "not-found") {
    return null;
  }

  // 从报告ID解析模式（格式：mode-domain-timestamp）
  let mode: DiagnosisMode = "geo";
  let url = urlParam || "https://example.com";
  
  // 通过ID前缀区分报告类型
  if (id.startsWith("seo-")) {
    mode = "seo";
  } else if (id.startsWith("geo-")) {
    mode = "geo";
  }
  
  // 如果没有URL参数，尝试从ID中提取域名
  if (!urlParam) {
    const parts = id.split("-");
    if (parts.length >= 2) {
      // 移除第一个部分（mode）和最后一个部分（timestamp）
      const domainParts = parts.slice(1, -1);
      if (domainParts.length > 0) {
        const domain = domainParts.join("."); // 将 example-com 转回 example.com
        url = `https://${domain}`;
      }
    }
  }

  return {
    id,
    url,
    mode,
    createdAt: new Date().toISOString(),
  };
}

// 动态生成页面元数据（SEO优化）
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ url?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { url: urlParam } = await searchParams;
  const report = await getReport(id, urlParam);

  if (!report) {
    return {
      title: "报告未找到 - MarketingFlow",
    };
  }

  const modeLabel = report.mode === "seo" ? "SEO" : "GEO";

  return {
    title: `${modeLabel}诊断报告 - ${report.url} | MarketingFlow`,
    description: `查看 ${report.url} 的${modeLabel}诊断报告，包含详细的优化建议和改进方案。`,
    openGraph: {
      title: `${modeLabel}诊断报告 - ${report.url}`,
      description: `查看 ${report.url} 的${modeLabel}诊断报告`,
      type: "article",
    },
  };
}

export default async function ReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ url?: string }>;
}) {
  const { id } = await params;
  const { url: urlParam } = await searchParams;
  const report = await getReport(id, urlParam);

  if (!report) {
    notFound();
  }

  return <ReportPageClient reportId={id} initialData={report} />;
}

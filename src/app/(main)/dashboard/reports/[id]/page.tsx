import { Metadata } from "next";
import { notFound } from "next/navigation";

import type { DiagnosisMode } from "@/types/marketing";

import { ReportPageClient } from "./_components/report-page-client";

// 模拟从数据库获取报告数据
// TODO: 替换为真实的数据库查询
async function getReport(id: string) {
  // 模拟数据 - 实际开发时从数据库获取
  // 如果报告不存在，返回 null
  if (id === "not-found") {
    return null;
  }

  // 从报告ID解析模式（用于演示）
  // 实际开发时从数据库获取
  let mode: DiagnosisMode = "geo";
  let url = "https://example.com";
  
  // 支持通过ID前缀区分报告类型
  if (id.startsWith("seo-") || id.includes("-seo-")) {
    mode = "seo";
  } else if (id.startsWith("geo-") || id.includes("-geo-")) {
    mode = "geo";
  }
  
  // 支持从ID中提取域名（格式：mode-domain-timestamp）
  const parts = id.split("-");
  if (parts.length >= 2) {
    const domain = parts.slice(1, -1).join("-");
    if (domain && !domain.includes("_")) {
      url = `https://${domain}`;
    }
  }

  // 模拟报告数据
  return {
    id,
    url,
    mode,
    createdAt: new Date().toISOString(),
    // 其他报告数据将在客户端组件中生成或从数据库获取
  };
}

// 动态生成页面元数据（SEO优化）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const report = await getReport(id);

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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) {
    notFound();
  }

  return <ReportPageClient reportId={id} initialData={report} />;
}

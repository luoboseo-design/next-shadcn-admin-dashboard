"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { generateMockDiagnosis } from "@/data/mock-diagnosis";
import type { DiagnosisReport as DiagnosisReportType, DiagnosisMode } from "@/types/marketing";

import { DiagnosisLoading } from "./_components/diagnosis-loading";
import { DiagnosisReport } from "./_components/diagnosis-report";
import { HeroInput } from "./_components/hero-input";

type DiagnosisState = "idle" | "loading" | "complete";

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
    console.error("[v0] Website analysis error:", error);
    return null;
  }
}

// 生成报告ID（实际开发时由数据库生成）
function generateReportId() {
  return `rpt_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
}

export default function HomePage() {
  const router = useRouter();
  const [state, setState] = useState<DiagnosisState>("idle");
  const [report, setReport] = useState<DiagnosisReportType | null>(null);
  const [currentMode, setCurrentMode] = useState<DiagnosisMode>("seo");
  const [reportId, setReportId] = useState<string | null>(null);

  const handleDiagnosis = async (url: string, mode: DiagnosisMode) => {
    setState("loading");
    setCurrentMode(mode);

    // 生成报告ID
    const newReportId = generateReportId();
    setReportId(newReportId);

    // 并行执行：AI分析网站 + 等待动画时间
    const [aiAnalysis] = await Promise.all([
      analyzeWebsite(url),
      new Promise((resolve) => setTimeout(resolve, 12000)), // 动画时间
    ]);

    // 生成诊断报告，使用真实的AI分析结果
    const diagnosisReport = generateMockDiagnosis(url, mode, aiAnalysis);
    setReport(diagnosisReport);
    setState("complete");

    // TODO: 将报告保存到数据库
    // await saveReportToDatabase(newReportId, diagnosisReport);
  };

  const handleReset = () => {
    setState("idle");
    setReport(null);
    setReportId(null);
  };

  const handleViewReport = () => {
    if (reportId) {
      router.push(`/dashboard/reports/${reportId}`);
    }
  };

  return (
    <div className="flex flex-col">
      {state === "idle" && <HeroInput onSubmit={handleDiagnosis} />}
      {state === "loading" && <DiagnosisLoading mode={currentMode} />}
      {state === "complete" && report && (
        <DiagnosisReport 
          report={report} 
          onReset={handleReset}
          reportId={reportId}
          onViewReport={handleViewReport}
        />
      )}
    </div>
  );
}

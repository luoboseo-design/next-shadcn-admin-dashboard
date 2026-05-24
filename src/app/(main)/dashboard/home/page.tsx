"use client";

import { useState } from "react";

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

export default function HomePage() {
  const [state, setState] = useState<DiagnosisState>("idle");
  const [report, setReport] = useState<DiagnosisReportType | null>(null);
  const [currentMode, setCurrentMode] = useState<DiagnosisMode>("seo");

  const handleDiagnosis = async (url: string, mode: DiagnosisMode) => {
    setState("loading");
    setCurrentMode(mode);

    // 并行执行：AI分析网站 + 等待动画时间
    const [aiAnalysis] = await Promise.all([
      analyzeWebsite(url),
      new Promise((resolve) => setTimeout(resolve, 12000)), // 动画时间
    ]);

    // 生成诊断报告，使用真实的AI分析结果
    const diagnosisReport = generateMockDiagnosis(url, mode, aiAnalysis);
    setReport(diagnosisReport);
    setState("complete");
  };

  const handleReset = () => {
    setState("idle");
    setReport(null);
  };

  return (
    <div className="flex flex-col">
      {state === "idle" && <HeroInput onSubmit={handleDiagnosis} />}
      {state === "loading" && <DiagnosisLoading mode={currentMode} />}
      {state === "complete" && report && <DiagnosisReport report={report} onReset={handleReset} />}
    </div>
  );
}

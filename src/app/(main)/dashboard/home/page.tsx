"use client";

import { useState } from "react";

import { generateMockDiagnosis } from "@/data/mock-diagnosis";
import type { DiagnosisReport as DiagnosisReportType, DiagnosisMode } from "@/types/marketing";

import { DiagnosisLoading } from "./_components/diagnosis-loading";
import { DiagnosisReport } from "./_components/diagnosis-report";
import { HeroInput } from "./_components/hero-input";

type DiagnosisState = "idle" | "loading" | "complete";

export default function HomePage() {
  const [state, setState] = useState<DiagnosisState>("idle");
  const [report, setReport] = useState<DiagnosisReportType | null>(null);
  const [currentMode, setCurrentMode] = useState<DiagnosisMode>("seo");

  const handleDiagnosis = async (url: string, mode: DiagnosisMode) => {
    setState("loading");
    setCurrentMode(mode);

    // 模拟诊断过程（总共约12秒）
    await new Promise((resolve) => setTimeout(resolve, 12000));

    const diagnosisReport = generateMockDiagnosis(url, mode);
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

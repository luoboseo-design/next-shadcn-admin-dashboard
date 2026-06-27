"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { DiagnosisMode } from "@/types/marketing";

import { DiagnosisLoading } from "./_components/diagnosis-loading";
import { HeroInput } from "./_components/hero-input";

type DiagnosisState = "idle" | "loading";

// 生成报告ID - 包含模式和域名信息
function generateReportId(url: string, mode: DiagnosisMode) {
  const domain = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].replace(/\./g, "-");
  const timestamp = Date.now().toString(36);
  return `${mode}-${domain}-${timestamp}`;
}

export default function HomePage() {
  const router = useRouter();
  const [state, setState] = useState<DiagnosisState>("idle");
  const [currentMode, setCurrentMode] = useState<DiagnosisMode>("seo");

  const handleDiagnosis = async (url: string, mode: DiagnosisMode) => {
    setState("loading");
    setCurrentMode(mode);

    // 生成报告ID（包含模式和域名）
    const reportId = generateReportId(url, mode);

    // 等待加载动画完成后跳转到报告页面
    await new Promise((resolve) => setTimeout(resolve, 12000));

    // 跳转到独立的报告页面
    // URL中包含域名信息，报告页面会解析并获取数据
    router.push(`/dashboard/reports/${reportId}?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="flex flex-col">
      {state === "idle" && <HeroInput onSubmit={handleDiagnosis} />}
      {state === "loading" && <DiagnosisLoading mode={currentMode} />}
    </div>
  );
}

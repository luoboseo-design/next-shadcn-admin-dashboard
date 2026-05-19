"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { diagnosisSteps } from "@/data/mock-diagnosis";
import { cn } from "@/lib/utils";

export function DiagnosisLoading() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let totalDelay = 0;
    
    diagnosisSteps.forEach((step, index) => {
      // 开始步骤
      setTimeout(() => {
        setCurrentStep(index);
      }, totalDelay);

      // 完成步骤
      totalDelay += step.duration;
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
      }, totalDelay);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* 动画圆环 */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-muted animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            </div>
          </div>
        </div>

        {/* 标题 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">AI 正在诊断您的网站</h2>
          <p className="text-muted-foreground">
            请稍候，我们正在深度分析您的网站数据
          </p>
        </div>

        {/* 步骤列表 */}
        <div className="space-y-3">
          {diagnosisSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index && !isCompleted;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                  isCompleted && "bg-green-50 dark:bg-green-950/20",
                  isCurrent && "bg-primary/5 border border-primary/20",
                  !isCompleted && !isCurrent && "opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                    isCompleted && "bg-green-500 text-white",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium transition-colors duration-300",
                    isCompleted && "text-green-700 dark:text-green-400",
                    isCurrent && "text-primary"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

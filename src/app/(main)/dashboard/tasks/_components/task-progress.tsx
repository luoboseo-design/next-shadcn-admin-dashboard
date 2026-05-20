"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { BacklinkTask } from "@/types/marketing";
import { cn } from "@/lib/utils";

interface TaskProgressProps {
  task: BacklinkTask;
}

const progressSteps = [
  { id: "pending", label: "任务创建", minProgress: 0 },
  { id: "analyzing", label: "AI 分析", minProgress: 10 },
  { id: "publishing", label: "内容发布", minProgress: 30 },
  { id: "awaiting", label: "等待验收", minProgress: 100 },
  { id: "completed", label: "已完成", minProgress: 100 },
];

export function TaskProgress({ task }: TaskProgressProps) {
  const currentStepIndex = progressSteps.findIndex(
    (step) => step.id === task.status
  );

  return (
    <div className="space-y-6">
      {/* 进度条 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{task.currentStep}</span>
          <span className="text-sm text-muted-foreground">{task.progress}%</span>
        </div>
        <Progress value={task.progress} className="h-3" />
      </div>

      {/* 步骤指示器 */}
      <div className="space-y-3">
        {progressSteps.slice(0, -1).map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                isCurrent && "bg-primary/5"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full",
                  isCompleted && "bg-green-500 text-white",
                  isCurrent && "bg-primary text-primary-foreground",
                  isPending && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "font-medium",
                  isCompleted && "text-green-600 dark:text-green-400",
                  isCurrent && "text-primary",
                  isPending && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

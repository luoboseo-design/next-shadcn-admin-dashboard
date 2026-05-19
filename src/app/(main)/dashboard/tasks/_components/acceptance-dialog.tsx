"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { BacklinkTask } from "@/types/marketing";

interface AcceptanceDialogProps {
  task: BacklinkTask;
}

export function AcceptanceDialog({ task }: AcceptanceDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleAccept = async () => {
    if (!confirmed) return;

    setIsSubmitting(true);

    // 模拟验收过程
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsOpen(false);

    // 刷新页面
    router.refresh();
  };

  const successCount = task.publishResults.filter((r) => r.status === "success").length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          确认验收
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>确认验收</DialogTitle>
          <DialogDescription>
            请确认以下任务完成情况后进行验收
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 任务概要 */}
          <div className="p-4 rounded-lg bg-muted/50 border space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">任务 ID</span>
              <span className="font-mono">{task.id.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">目标网址</span>
              <span className="truncate max-w-[200px]">{task.targetUrl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">成功发布</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {successCount} / {task.totalPlatforms}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">成功率</span>
              <span className="font-semibold">{task.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">套餐费用</span>
              <span className="font-semibold">${task.pricing.totalPrice}</span>
            </div>
          </div>

          {/* 确认复选框 */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                我已确认发布结果
              </Label>
              <p className="text-sm text-muted-foreground">
                我已检查所有发布链接，确认任务完成符合预期
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            取消
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!confirmed || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                处理中...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                确认验收
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

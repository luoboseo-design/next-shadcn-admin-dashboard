"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { taskStatusLabels, taskStatusColors } from "@/data/mock-tasks";
import type { BacklinkTask } from "@/types/marketing";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: BacklinkTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>任务 ID</TableHead>
            <TableHead>目标网址</TableHead>
            <TableHead>关键词</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>进度</TableHead>
            <TableHead>套餐</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-mono text-sm">
                {task.id.slice(-6).toUpperCase()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 max-w-[200px]">
                  <span className="truncate">{task.targetUrl}</span>
                  <a
                    href={task.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-[150px]">
                  {task.keywords.slice(0, 2).map((kw, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {kw}
                    </Badge>
                  ))}
                  {task.keywords.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{task.keywords.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={cn(taskStatusColors[task.status])} variant="secondary">
                  {taskStatusLabels[task.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Progress value={task.progress} className="h-2 flex-1" />
                  <span className="text-sm text-muted-foreground w-10">
                    {task.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{task.pricing.packageName}</span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString("zh-CN")}
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" className="gap-1" asChild>
                  <Link href={`/dashboard/tasks/${task.id}`}>
                    查看
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

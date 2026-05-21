"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, ExternalLink, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ServiceCategory, serviceCategoryConfig, taskStatusColors, taskStatusLabels } from "@/data/mock-tasks";
import { cn } from "@/lib/utils";
import type { BacklinkTask } from "@/types/marketing";

interface TaskListProps {
  tasks: (BacklinkTask & { serviceCategory: ServiceCategory; serviceType: string })[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<BacklinkTask["status"] | "all">("all");

  // 筛选任务
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.targetUrl.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || task.serviceCategory === categoryFilter;
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 获取服务类型标签
  const getServiceTypeLabel = (category: ServiceCategory, serviceType: string) => {
    const config = serviceCategoryConfig[category];
    const subType = config.subTypes.find((t) => t.key === serviceType);
    return subType?.label || serviceType;
  };

  return (
    <div className="space-y-4">
      {/* 筛选栏 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索任务名称、ID或网址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as ServiceCategory | "all")}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="服务类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部服务</SelectItem>
            {Object.entries(serviceCategoryConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as BacklinkTask["status"] | "all")}>
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            {Object.entries(taskStatusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 任务表格 */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>任务ID</TableHead>
              <TableHead>任务名称</TableHead>
              <TableHead>服务类别</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>进度</TableHead>
              <TableHead>套餐</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  暂无符合条件的任务
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-mono text-sm">{task.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{task.name}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="truncate max-w-[150px]">{task.targetUrl}</span>
                        <a
                          href={task.targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 hover:text-foreground"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">{serviceCategoryConfig[task.serviceCategory].label}</span>
                      <Badge variant="outline" className="text-xs w-fit">
                        {getServiceTypeLabel(task.serviceCategory, task.serviceType)}
                      </Badge>
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
                      <span className="text-sm text-muted-foreground w-10">{task.progress}%</span>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 结果统计 */}
      <div className="text-sm text-muted-foreground">
        共 {filteredTasks.length} 个任务
        {(categoryFilter !== "all" || statusFilter !== "all" || searchQuery) && (
          <span>（筛选自 {tasks.length} 个）</span>
        )}
      </div>
    </div>
  );
}

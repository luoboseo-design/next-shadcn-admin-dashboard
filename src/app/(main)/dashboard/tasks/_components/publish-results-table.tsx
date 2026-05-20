"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheckCircle2, XCircle, Clock, ChevronDown, ExternalLink, Copy, Check } from "lucide-react";
import type { PublishResult } from "@/types/marketing";
import { cn } from "@/lib/utils";

interface PublishResultsTableProps {
  results: PublishResult[];
}

export function PublishResultsTable({ results }: PublishResultsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      label: "成功",
      className: "text-green-600 dark:text-green-400",
      badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    pending: {
      icon: Clock,
      label: "进行中",
      className: "text-amber-600 dark:text-amber-400",
      badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    failed: {
      icon: XCircle,
      label: "失败",
      className: "text-red-600 dark:text-red-400",
      badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>平台</TableHead>
            <TableHead>标题</TableHead>
            <TableHead>发布链接</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>发布时间</TableHead>
            <TableHead className="w-[100px]">账号信息</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => {
            const config = statusConfig[result.status];
            const StatusIcon = config.icon;
            const isExpanded = expandedRows.has(result.id);

            return (
              <Collapsible key={result.id} asChild open={isExpanded}>
                <>
                  <TableRow>
                    <TableCell className="font-mono text-sm">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{result.platformName}</span>
                        <a
                          href={result.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:underline"
                        >
                          {result.platformUrl}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <span className="truncate block">{result.title}</span>
                    </TableCell>
                    <TableCell>
                      {result.publishUrl ? (
                        <a
                          href={result.publishUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <span className="truncate max-w-[150px]">
                            {result.publishUrl}
                          </span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={config.badgeClass} variant="secondary">
                        <StatusIcon className={cn("h-3 w-3 mr-1", config.className)} />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {result.publishedAt
                        ? new Date(result.publishedAt).toLocaleDateString("zh-CN")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {result.accountInfo ? (
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                            onClick={() => toggleRow(result.id)}
                          >
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                isExpanded && "rotate-180"
                              )}
                            />
                            {isExpanded ? "收起" : "展开"}
                          </Button>
                        </CollapsibleTrigger>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                  {result.accountInfo && (
                    <CollapsibleContent asChild>
                      <TableRow className="bg-muted/50">
                        <TableCell colSpan={7}>
                          <div className="p-4 space-y-3">
                            <div className="text-sm font-medium">账号信息</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                                <div>
                                  <div className="text-xs text-muted-foreground">用户名</div>
                                  <div className="font-mono">{result.accountInfo.username}</div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    copyToClipboard(
                                      result.accountInfo!.username,
                                      `${result.id}-username`
                                    )
                                  }
                                >
                                  {copiedId === `${result.id}-username` ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                                <div>
                                  <div className="text-xs text-muted-foreground">密码</div>
                                  <div className="font-mono">{result.accountInfo.password}</div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    copyToClipboard(
                                      result.accountInfo!.password,
                                      `${result.id}-password`
                                    )
                                  }
                                >
                                  {copiedId === `${result.id}-password` ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                              {result.accountInfo.email && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                                  <div>
                                    <div className="text-xs text-muted-foreground">邮箱</div>
                                    <div className="font-mono text-sm truncate">
                                      {result.accountInfo.email}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      copyToClipboard(
                                        result.accountInfo!.email!,
                                        `${result.id}-email`
                                      )
                                    }
                                  >
                                    {copiedId === `${result.id}-email` ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  )}
                </>
              </Collapsible>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

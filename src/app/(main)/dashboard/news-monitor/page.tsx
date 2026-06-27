"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Trash2,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Loader2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 模拟发稿任务数据
const newsOrders = [
  {
    id: "NR-001",
    name: "新品发布会报道",
    keywords: ["新品发布", "科技"],
    websiteUrl: "https://example.com/product",
    packageName: "10媒体套餐",
    mediaCount: 10,
    completedCount: 10,
    status: "completed",
    progress: 100,
    createdAt: "2024-01-08",
    articles: [
      { id: 1, title: "XX公司发布全新智能产品", platform: "新浪科技", status: "completed", url: "https://tech.sina.com/xxx" },
      { id: 2, title: "创新科技引领未来", platform: "腾讯科技", status: "completed", url: "https://tech.qq.com/xxx" },
      { id: 3, title: "新品发布会亮点解读", platform: "网易科技", status: "completed", url: "https://tech.163.com/xxx" },
      { id: 4, title: "XX公司新品震撼上市", platform: "搜狐科技", status: "completed", url: "https://it.sohu.com/xxx" },
      { id: 5, title: "行业新标杆诞生", platform: "凤凰科技", status: "completed", url: "https://tech.ifeng.com/xxx" },
      { id: 6, title: "新品发布引热议", platform: "中关村在线", status: "completed", url: "https://zol.com.cn/xxx" },
      { id: 7, title: "科技新品抢先看", platform: "太平洋电脑网", status: "completed", url: "https://pconline.com.cn/xxx" },
      { id: 8, title: "XX公司创新之路", platform: "驱动之家", status: "completed", url: "https://mydrivers.com/xxx" },
      { id: 9, title: "新品发布会全程回顾", platform: "IT之家", status: "completed", url: "https://ithome.com/xxx" },
      { id: 10, title: "行业领先技术亮相", platform: "36氪", status: "completed", url: "https://36kr.com/xxx" },
    ],
  },
  {
    id: "NR-002",
    name: "企业融资新闻",
    keywords: ["融资", "投资"],
    websiteUrl: "https://example.com/funding",
    packageName: "5媒体套餐",
    mediaCount: 5,
    completedCount: 3,
    status: "publishing",
    progress: 60,
    createdAt: "2024-01-15",
    articles: [
      { id: 1, title: "XX公司完成B轮融资", platform: "36氪", status: "completed", url: "https://36kr.com/xxx" },
      { id: 2, title: "资本看好科技创新", platform: "投资界", status: "completed", url: "https://pedaily.cn/xxx" },
      { id: 3, title: "XX公司获数亿融资", platform: "创业邦", status: "completed", url: "https://cyzone.cn/xxx" },
      { id: 4, title: "融资背后的故事", platform: "虎嗅", status: "publishing", url: null },
      { id: 5, title: "XX公司融资解读", platform: "钛媒体", status: "publishing", url: null },
    ],
  },
  {
    id: "NR-003",
    name: "品牌活动推广",
    keywords: ["品牌", "活动"],
    websiteUrl: "https://example.com/event",
    packageName: "20媒体套餐",
    mediaCount: 20,
    completedCount: 5,
    status: "publishing",
    progress: 25,
    createdAt: "2024-01-20",
    articles: [
      { id: 1, title: "XX品牌年度盛典", platform: "新浪财经", status: "completed", url: "https://finance.sina.com/xxx" },
      { id: 2, title: "品牌活动精彩回顾", platform: "网易财经", status: "completed", url: "https://money.163.com/xxx" },
      { id: 3, title: "XX品牌引领潮流", platform: "凤凰财经", status: "completed", url: "https://finance.ifeng.com/xxx" },
      { id: 4, title: "品牌活动圆满成功", platform: "和讯网", status: "completed", url: "https://hexun.com/xxx" },
      { id: 5, title: "XX品牌再创佳绩", platform: "东方财富", status: "completed", url: "https://eastmoney.com/xxx" },
    ],
  },
  {
    id: "NR-004",
    name: "行业报告发布",
    keywords: ["行业报告", "市场分析"],
    websiteUrl: "https://example.com/report",
    packageName: "8媒体套餐",
    mediaCount: 8,
    completedCount: 0,
    status: "publishing",
    progress: 0,
    createdAt: "2024-01-25",
    articles: [],
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  completed: {
    label: "已完成",
    color: "bg-emerald-500/10 text-emerald-500",
    icon: CheckCircle2,
  },
  publishing: {
    label: "发布中",
    color: "bg-amber-500/10 text-amber-500",
    icon: Loader2,
  },
};

export default function NewsMonitorPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  // 统计数据
  const stats = {
    total: newsOrders.length,
    totalPlatforms: newsOrders.reduce((acc, o) => acc + o.mediaCount, 0),
    publishing: newsOrders.filter((o) => o.status === "publishing").length,
    completed: newsOrders.filter((o) => o.status === "completed").length,
  };

  // 筛选数据
  const filteredOrders = newsOrders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    return true;
  });

  const toggleSelection = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">发稿任务</h1>
          <p className="text-sm text-muted-foreground mt-1">
            查看新闻媒体发稿任务的执行进度与完成报告
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1.5" />
            筛选
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/services/press-release">
              <Plus className="h-4 w-4 mr-1.5" />
              新建订单
            </Link>
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">总文章数</div>
          <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">总平台数</div>
          <div className="mt-1 text-2xl font-semibold">{stats.totalPlatforms}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">发布中</div>
          <div className="mt-1 text-2xl font-semibold text-amber-500">{stats.publishing}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">已完成</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-500">{stats.completed}</div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex items-center justify-end">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="全部状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="publishing">发布中</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 批量操作栏 */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
          <span className="text-sm text-muted-foreground">已选择 {selectedOrders.length} 项</span>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1.5" />
              导出
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1.5" />
              删除
            </Button>
          </div>
        </div>
      )}

      {/* 订单列表 */}
      <div className="rounded-lg border overflow-hidden">
        {/* 表头 */}
        <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 border-b text-sm font-medium text-muted-foreground">
          <Checkbox
            checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
            onCheckedChange={toggleAllSelection}
            className="h-4 w-4"
          />
          <div className="flex-1">任务名称</div>
          <div className="w-28 text-center hidden sm:block">状态</div>
          <div className="w-32 text-center hidden md:block">进度</div>
          <div className="w-10" />
        </div>

        {/* 列表项 */}
        <div className="divide-y">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            const isSelected = selectedOrders.includes(order.id);
            const isExpanded = expandedOrders.includes(order.id);

            return (
              <div key={order.id}>
                <div
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/30 cursor-pointer",
                    isSelected && "bg-primary/5",
                  )}
                  onClick={() => toggleExpand(order.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleSelection(order.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{order.name}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
                      <span className="font-mono">{order.id}</span>
                      <span>·</span>
                      <span className="truncate max-w-[180px]">{order.websiteUrl}</span>
                      {order.keywords.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            {order.keywords.map((kw) => (
                              <Badge key={kw} variant="secondary" className="text-xs h-5">{kw}</Badge>
                            ))}
                          </span>
                        </>
                      )}
                      <span>·</span>
                      <span className="text-primary/80 font-medium">{order.packageName}</span>
                      <span>·</span>
                      <span>{order.completedCount}/{order.mediaCount} 已发布</span>
                    </div>
                  </div>

                  <div className="w-28 hidden sm:flex justify-center">
                    <Badge variant="secondary" className={cn("text-xs", status.color)}>
                      <StatusIcon className={cn("h-3 w-3 mr-1", order.status === "publishing" && "animate-spin")} />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="w-32 hidden md:flex items-center gap-2 justify-center">
                    <Progress value={order.progress} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground w-8 text-right">{order.progress}%</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>导出报告</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">删除任务</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* 展开详情 - 发布文章列表 */}
                {isExpanded && order.articles.length > 0 && (
                  <div className="px-4 pb-4 bg-muted/20">
                    <div className="ml-8 border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
                        <div className="col-span-5">文章标题</div>
                        <div className="col-span-3">发布平台</div>
                        <div className="col-span-2 text-center">状态</div>
                        <div className="col-span-2 text-center">链接</div>
                      </div>
                      <div className="divide-y">
                        {order.articles.map((article) => (
                          <div key={article.id} className="grid grid-cols-12 gap-2 px-3 py-2.5 text-sm items-center">
                            <div className="col-span-5 truncate">{article.title}</div>
                            <div className="col-span-3 text-muted-foreground">{article.platform}</div>
                            <div className="col-span-2 flex justify-center">
                              {article.status === "completed" ? (
                                <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-500">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  已发布
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-500">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  发布中
                                </Badge>
                              )}
                            </div>
                            <div className="col-span-2 flex justify-center">
                              {article.url ? (
                                <a
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link2 className="h-3.5 w-3.5" />
                                  <span className="text-xs">查看</span>
                                </a>
                              ) : (
                                <span className="text-muted-foreground text-xs">-</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-8 mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        创建于 {order.createdAt}
                      </span>
                    </div>
                  </div>
                )}

                {isExpanded && order.articles.length === 0 && (
                  <div className="px-4 pb-4 bg-muted/20">
                    <div className="ml-8 p-6 border rounded-lg text-center text-sm text-muted-foreground">
                      暂无发布记录，任务正在处理中...
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

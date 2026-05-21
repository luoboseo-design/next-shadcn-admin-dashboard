"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Download,
  Globe,
  ChevronDown,
  ChevronRight,
  Search,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// 模拟任务数据 - 简化为客户报告所需字段
const tasks = [
  {
    id: "SOC-001",
    name: "品牌软文推广计划",
    websiteUrl: "https://example.com",
    keywords: ["AI工具", "效率提升"],
    totalArticles: 10,
    totalPlatforms: 8,
    pending: 2,
    published: 8,
    createdAt: "2024-01-15",
    articles: [
      { id: 1, title: "AI工具如何提升工作效率", platform: "Reddit", status: "published", url: "https://reddit.com/r/tech/abc123" },
      { id: 2, title: "自动化工作流程分享", platform: "知乎", status: "published", url: "https://zhihu.com/p/123456" },
      { id: 3, title: "2024年必备效率工具", platform: "Medium", status: "published", url: "https://medium.com/@user/abc" },
      { id: 4, title: "从繁琐到高效的转变", platform: "微博", status: "published", url: "https://weibo.com/123456" },
      { id: 5, title: "AI自动化的真实体验", platform: "Twitter/X", status: "published", url: "https://x.com/user/status/123" },
      { id: 6, title: "提高团队协作效率", platform: "LinkedIn", status: "published", url: "https://linkedin.com/posts/123" },
      { id: 7, title: "数字化转型案例", platform: "小红书", status: "published", url: "https://xiaohongshu.com/abc" },
      { id: 8, title: "智能办公新趋势", platform: "百家号", status: "published", url: "https://baijiahao.baidu.com/abc" },
      { id: 9, title: "企业效率提升指南", platform: "头条", status: "pending", url: null },
      { id: 10, title: "AI赋能企业发展", platform: "搜狐", status: "pending", url: null },
    ],
  },
  {
    id: "SOC-002",
    name: "新品上市宣传",
    websiteUrl: "https://newproduct.com",
    keywords: ["新品发布", "科技创新"],
    totalArticles: 5,
    totalPlatforms: 5,
    pending: 0,
    published: 5,
    createdAt: "2024-01-18",
    articles: [
      { id: 1, title: "革命性新品震撼发布", platform: "Reddit", status: "published", url: "https://reddit.com/r/gadgets/xyz" },
      { id: 2, title: "科技创新引领未来", platform: "知乎", status: "published", url: "https://zhihu.com/p/789" },
      { id: 3, title: "新品深度评测", platform: "Medium", status: "published", url: "https://medium.com/@tech/review" },
      { id: 4, title: "用户体验全面升级", platform: "微博", status: "published", url: "https://weibo.com/789" },
      { id: 5, title: "行业专家解读", platform: "LinkedIn", status: "published", url: "https://linkedin.com/posts/456" },
    ],
  },
  {
    id: "SOC-003",
    name: "SEO外链建设",
    websiteUrl: "https://mybusiness.com",
    keywords: ["SEO优化", "外链建设"],
    totalArticles: 20,
    totalPlatforms: 15,
    pending: 8,
    published: 12,
    createdAt: "2024-01-20",
    articles: [
      { id: 1, title: "SEO优化完整指南", platform: "Reddit", status: "published", url: "https://reddit.com/r/seo/guide" },
      { id: 2, title: "外链建设策略", platform: "知乎", status: "published", url: "https://zhihu.com/p/seo" },
      { id: 3, title: "搜索排名提升技巧", platform: "Medium", status: "published", url: "https://medium.com/@seo/tips" },
      { id: 4, title: "内容营销与SEO", platform: "微博", status: "published", url: "https://weibo.com/seo" },
      { id: 5, title: "关键词研究方法", platform: "LinkedIn", status: "published", url: "https://linkedin.com/posts/seo" },
      { id: 6, title: "网站优化实战", platform: "小红书", status: "published", url: "https://xiaohongshu.com/seo" },
      { id: 7, title: "技术SEO详解", platform: "百家号", status: "published", url: "https://baijiahao.baidu.com/seo" },
      { id: 8, title: "移动端SEO优化", platform: "头条", status: "published", url: "https://toutiao.com/seo" },
      { id: 9, title: "本地SEO策略", platform: "搜狐", status: "published", url: "https://sohu.com/seo" },
      { id: 10, title: "电商SEO技巧", platform: "网易", status: "published", url: "https://163.com/seo" },
      { id: 11, title: "SEO数据分析", platform: "凤凰网", status: "published", url: "https://ifeng.com/seo" },
      { id: 12, title: "语音搜索优化", platform: "腾讯", status: "published", url: "https://qq.com/seo" },
      { id: 13, title: "视频SEO优化", platform: "B站", status: "pending", url: null },
      { id: 14, title: "图片SEO技巧", platform: "抖音", status: "pending", url: null },
      { id: 15, title: "新闻稿SEO", platform: "快手", status: "pending", url: null },
      { id: 16, title: "社交媒体SEO", platform: "微信公众号", status: "pending", url: null },
      { id: 17, title: "品牌SEO建设", platform: "豆瓣", status: "pending", url: null },
      { id: 18, title: "竞品SEO分析", platform: "简书", status: "pending", url: null },
      { id: 19, title: "SEO工具推荐", platform: "CSDN", status: "pending", url: null },
      { id: 20, title: "SEO趋势预测", platform: "掘金", status: "pending", url: null },
    ],
  },
];

export default function SocialMonitorPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  // 计算总体统计
  const totalArticles = tasks.reduce((sum, t) => sum + t.totalArticles, 0);
  const totalPlatforms = tasks.reduce((sum, t) => sum + t.totalPlatforms, 0);
  const totalPending = tasks.reduce((sum, t) => sum + t.pending, 0);
  const totalPublished = tasks.reduce((sum, t) => sum + t.published, 0);

  // 筛选任务
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.pending === 0) ||
      (statusFilter === "in_progress" && task.pending > 0);
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">社交媒体发布报告</h1>
          <p className="text-muted-foreground mt-1">查看任务发布情况和完成状态</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          导出报告
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总文章数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{totalArticles}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总平台数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{totalPlatforms}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              待发布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{totalPending}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              已发布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{totalPublished}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选栏 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索任务名称或网站..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
            <SelectItem value="in_progress">进行中</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 任务列表 */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="overflow-hidden">
            {/* 任务摘要 */}
            <div
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    {expandedTask === task.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{task.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{task.websiteUrl}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {task.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{task.totalArticles}</div>
                    <div className="text-xs text-muted-foreground">总文章</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{task.totalPlatforms}</div>
                    <div className="text-xs text-muted-foreground">总平台</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-600">{task.pending}</div>
                    <div className="text-xs text-muted-foreground">待发布</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{task.published}</div>
                    <div className="text-xs text-muted-foreground">已发布</div>
                  </div>
                  <Badge variant={task.pending === 0 ? "default" : "secondary"}>
                    {task.pending === 0 ? "已完成" : "进行中"}
                  </Badge>
                </div>
              </div>

              {/* 关键词 */}
              <div className="flex items-center gap-2 mt-3 ml-11">
                <span className="text-xs text-muted-foreground">关键词：</span>
                {task.keywords.map((kw) => (
                  <Badge key={kw} variant="outline" className="text-xs">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 展开详情 - 文章列表 */}
            {expandedTask === task.id && (
              <div className="border-t bg-muted/30">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>文章标题</TableHead>
                      <TableHead>发布平台</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>发布链接</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.articles.map((article, index) => (
                      <TableRow key={article.id}>
                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.platform}</TableCell>
                        <TableCell>
                          {article.status === "published" ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              已发布
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              待发布
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {article.url ? (
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-3 w-3" />
                              查看链接
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>没有找到匹配的任务</p>
          </div>
        )}
      </div>
    </div>
  );
}

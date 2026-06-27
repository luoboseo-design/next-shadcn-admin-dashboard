"use client";

import { useState } from "react";
import {
  FileText,
  MessageSquare,
  Heart,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  ChevronDown,
  ChevronRight,
  Search,
  Calendar,
  Link2,
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

// 服务类型
const serviceTypes = [
  { id: "post", label: "发帖", icon: FileText },
  { id: "comment", label: "评论", icon: MessageSquare },
  { id: "like", label: "点赞", icon: Heart },
  { id: "follower", label: "粉丝增长", icon: Users },
];

// 平台（用于评论、点赞、粉丝增长）
const platforms = [
  { id: "reddit", label: "Reddit", color: "bg-orange-500" },
  { id: "instagram", label: "Instagram", color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" },
  { id: "twitter", label: "X (Twitter)", color: "bg-black" },
];

// 发布平台（用于发帖服务）
const publishPlatforms = [
  "Reddit", "知乎", "Medium", "微博", "Twitter/X", 
  "LinkedIn", "小红书", "百家号", "头条", "搜狐"
];

// 模拟任务数据
const tasks = [
  // 发帖任务
  {
    id: "SM-001",
    name: "品牌软文推广",
    serviceType: "post",
    platform: "reddit", // 下单时选择的平台
    websiteUrl: "https://example.com",
    keywords: ["AI工具", "效率提升"],
    createdAt: "2024-01-15",
    // 发帖特有字段
    totalArticles: 5,
    totalPlatforms: 5,
    pending: 1,
    published: 4,
    articles: [
      { id: 1, title: "AI工具如何提升工作效率", platform: "Reddit", status: "published", url: "https://reddit.com/r/tech/abc123" },
      { id: 2, title: "自动化工作流程分享", platform: "知乎", status: "published", url: "https://zhihu.com/p/123456" },
      { id: 3, title: "2024年必备效率工具", platform: "Medium", status: "published", url: "https://medium.com/@user/abc" },
      { id: 4, title: "从繁琐到高效的转变", platform: "小红书", status: "published", url: "https://xiaohongshu.com/note/abc" },
      { id: 5, title: "AI自动化的真实体验", platform: "头条", status: "pending", url: null },
    ],
  },
  {
    id: "SM-002",
    name: "新品发布宣传",
    serviceType: "post",
    platform: "instagram",
    websiteUrl: "https://newproduct.com",
    keywords: ["新品发布", "科技创新"],
    createdAt: "2024-01-18",
    totalArticles: 3,
    totalPlatforms: 3,
    pending: 0,
    published: 3,
    articles: [
      { id: 1, title: "革命性新品震撼发布", platform: "微博", status: "published", url: "https://weibo.com/123456" },
      { id: 2, title: "科技创新引领未来", platform: "百家号", status: "published", url: "https://baijiahao.baidu.com/abc" },
      { id: 3, title: "新品深度评测", platform: "搜狐", status: "published", url: "https://sohu.com/a/123456" },
    ],
  },
  // 评论任务
  {
    id: "SM-003",
    name: "Reddit评论引流",
    serviceType: "comment",
    platform: "reddit",
    websiteUrl: "https://myproduct.com",
    keywords: ["推荐", "好用"],
    createdAt: "2024-01-20",
    totalComments: 50,
    completed: 48,
    pending: 2,
    targetPosts: [
      { id: 1, postUrl: "https://reddit.com/r/tech/post1", commentsPlaced: 10, status: "completed" },
      { id: 2, postUrl: "https://reddit.com/r/gadgets/post2", commentsPlaced: 10, status: "completed" },
      { id: 3, postUrl: "https://reddit.com/r/productivity/post3", commentsPlaced: 10, status: "completed" },
      { id: 4, postUrl: "https://reddit.com/r/software/post4", commentsPlaced: 10, status: "completed" },
      { id: 5, postUrl: "https://reddit.com/r/tools/post5", commentsPlaced: 8, status: "in_progress" },
    ],
  },
  {
    id: "SM-004",
    name: "Instagram评论互动",
    serviceType: "comment",
    platform: "instagram",
    websiteUrl: "https://instagram.com/mybrand",
    keywords: ["喜欢", "关注"],
    createdAt: "2024-01-22",
    totalComments: 30,
    completed: 30,
    pending: 0,
    targetPosts: [
      { id: 1, postUrl: "https://instagram.com/p/abc123", commentsPlaced: 10, status: "completed" },
      { id: 2, postUrl: "https://instagram.com/p/def456", commentsPlaced: 10, status: "completed" },
      { id: 3, postUrl: "https://instagram.com/p/ghi789", commentsPlaced: 10, status: "completed" },
    ],
  },
  // 点赞任务
  {
    id: "SM-005",
    name: "X帖子点赞推广",
    serviceType: "like",
    platform: "twitter",
    websiteUrl: "https://x.com/myaccount",
    keywords: [],
    createdAt: "2024-01-23",
    totalLikes: 200,
    completed: 200,
    pending: 0,
    targetPosts: [
      { id: 1, postUrl: "https://x.com/user/status/123", likesAdded: 50, status: "completed" },
      { id: 2, postUrl: "https://x.com/user/status/456", likesAdded: 50, status: "completed" },
      { id: 3, postUrl: "https://x.com/user/status/789", likesAdded: 50, status: "completed" },
      { id: 4, postUrl: "https://x.com/user/status/012", likesAdded: 50, status: "completed" },
    ],
  },
  {
    id: "SM-006",
    name: "Reddit帖子点赞",
    serviceType: "like",
    platform: "reddit",
    websiteUrl: "https://reddit.com/user/mybrand",
    keywords: [],
    createdAt: "2024-01-24",
    totalLikes: 100,
    completed: 75,
    pending: 25,
    targetPosts: [
      { id: 1, postUrl: "https://reddit.com/r/tech/post1", likesAdded: 25, status: "completed" },
      { id: 2, postUrl: "https://reddit.com/r/gadgets/post2", likesAdded: 25, status: "completed" },
      { id: 3, postUrl: "https://reddit.com/r/software/post3", likesAdded: 25, status: "completed" },
      { id: 4, postUrl: "https://reddit.com/r/tools/post4", likesAdded: 0, status: "pending" },
    ],
  },
  // 粉丝增长任务
  {
    id: "SM-007",
    name: "Instagram粉丝增长",
    serviceType: "follower",
    platform: "instagram",
    websiteUrl: "https://instagram.com/mybrand",
    keywords: [],
    createdAt: "2024-01-25",
    targetFollowers: 500,
    addedFollowers: 320,
    pending: 180,
    status: "in_progress",
  },
  {
    id: "SM-008",
    name: "X账号粉丝增长",
    serviceType: "follower",
    platform: "twitter",
    websiteUrl: "https://x.com/mybrand",
    keywords: [],
    createdAt: "2024-01-26",
    targetFollowers: 1000,
    addedFollowers: 1000,
    pending: 0,
    status: "completed",
  },
];

export default function SocialMonitorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  // 筛选任务
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === "all" || task.serviceType === serviceFilter;
    const matchesPlatform = platformFilter === "all" || task.platform === platformFilter;
    return matchesSearch && matchesService && matchesPlatform;
  });

  // 统计数据
  const stats = {
    postTasks: tasks.filter(t => t.serviceType === "post").length,
    commentTasks: tasks.filter(t => t.serviceType === "comment").length,
    likeTasks: tasks.filter(t => t.serviceType === "like").length,
    followerTasks: tasks.filter(t => t.serviceType === "follower").length,
  };

  const getServiceInfo = (type: string) => {
    return serviceTypes.find(s => s.id === type) || serviceTypes[0];
  };

  const getPlatformInfo = (platformId: string) => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };

  const getTaskStatus = (task: typeof tasks[0]) => {
    if (task.serviceType === "post") {
      return task.pending === 0 ? "completed" : "in_progress";
    }
    if (task.serviceType === "comment" || task.serviceType === "like") {
      return task.pending === 0 ? "completed" : "in_progress";
    }
    if (task.serviceType === "follower") {
      return task.status;
    }
    return "in_progress";
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">社交媒体报告</h1>
          <p className="text-muted-foreground mt-1">查看任务完成情况</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          导出报告
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.postTasks}</p>
                <p className="text-xs text-muted-foreground">发帖任务</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-100">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.commentTasks}</p>
                <p className="text-xs text-muted-foreground">评论任务</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-pink-100">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.likeTasks}</p>
                <p className="text-xs text-muted-foreground">点赞任务</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.followerTasks}</p>
                <p className="text-xs text-muted-foreground">粉丝任务</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选栏 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索任务名称或ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="服务类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                {serviceTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="平台" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部平台</SelectItem>
                {platforms.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 任务列表 */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const serviceInfo = getServiceInfo(task.serviceType);
          const platformInfo = getPlatformInfo(task.platform);
          const ServiceIcon = serviceInfo.icon;
          const isExpanded = expandedTask === task.id;
          const status = getTaskStatus(task);

          return (
            <Card key={task.id} className="overflow-hidden">
              {/* 任务摘要行 */}
              <div
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedTask(isExpanded ? null : task.id)}
              >
                <div className="flex items-center gap-4">
                  {/* 展开图标 */}
                  <div className="shrink-0 text-muted-foreground">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>

                  {/* 平台图标 */}
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0", platformInfo.color)}>
                    {platformInfo.label.charAt(0)}
                  </div>

                  {/* 任务信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{task.name}</span>
                      <Badge variant="outline" className="shrink-0 text-xs gap-1">
                        <ServiceIcon className="h-3 w-3" />
                        {serviceInfo.label}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="truncate max-w-[200px]">{task.websiteUrl}</span>
                      {task.keywords.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1.5">
                            {task.keywords.map((kw) => (
                              <Badge key={kw} variant="secondary" className="text-xs h-5">{kw}</Badge>
                            ))}
                          </span>
                        </>
                      )}
                      <span>·</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="h-3 w-3" />
                        {task.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* 统计数据 */}
                  <div className="hidden md:flex items-center gap-6 shrink-0">
                    {task.serviceType === "post" && (
                      <>
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
                      </>
                    )}
                    {task.serviceType === "comment" && (
                      <>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{task.totalComments}</div>
                          <div className="text-xs text-muted-foreground">总评论</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-600">{task.pending}</div>
                          <div className="text-xs text-muted-foreground">待完成</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{task.completed}</div>
                          <div className="text-xs text-muted-foreground">已完成</div>
                        </div>
                      </>
                    )}
                    {task.serviceType === "like" && (
                      <>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{task.totalLikes}</div>
                          <div className="text-xs text-muted-foreground">总点赞</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-600">{task.pending}</div>
                          <div className="text-xs text-muted-foreground">待完成</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{task.completed}</div>
                          <div className="text-xs text-muted-foreground">已完成</div>
                        </div>
                      </>
                    )}
                    {task.serviceType === "follower" && (
                      <>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{task.targetFollowers}</div>
                          <div className="text-xs text-muted-foreground">目标粉丝</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-600">{task.pending}</div>
                          <div className="text-xs text-muted-foreground">待增长</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{task.addedFollowers}</div>
                          <div className="text-xs text-muted-foreground">已增长</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* 状态标签 */}
                  <Badge className={cn(
                    "shrink-0",
                    status === "completed" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  )}>
                    {status === "completed" ? "已完成" : "进行中"}
                  </Badge>
                </div>
              </div>

              {/* 展开详情 */}
              {isExpanded && (
                <div className="border-t bg-muted/30 p-4">
                  {/* 发帖任务详情 */}
                  {task.serviceType === "post" && task.articles && (
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
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  已发布
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 gap-1">
                                  <Clock className="h-3 w-3" />
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
                                  <Link2 className="h-3 w-3" />
                                  查看
                                </a>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}

                  {/* 评论任务详情 */}
                  {task.serviceType === "comment" && task.targetPosts && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>目标帖子</TableHead>
                          <TableHead>评论数</TableHead>
                          <TableHead>状态</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {task.targetPosts.map((post, index) => (
                          <TableRow key={post.id}>
                            <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                            <TableCell>
                              <a
                                href={post.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Link2 className="h-3 w-3" />
                                {post.postUrl}
                              </a>
                            </TableCell>
                            <TableCell>{post.commentsPlaced}</TableCell>
                            <TableCell>
                              {post.status === "completed" ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  已完成
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 gap-1">
                                  <Clock className="h-3 w-3" />
                                  进行中
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}

                  {/* 点赞任务详情 */}
                  {task.serviceType === "like" && task.targetPosts && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>目标帖子</TableHead>
                          <TableHead>点赞数</TableHead>
                          <TableHead>状态</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {task.targetPosts.map((post, index) => (
                          <TableRow key={post.id}>
                            <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                            <TableCell>
                              <a
                                href={post.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Link2 className="h-3 w-3" />
                                {post.postUrl}
                              </a>
                            </TableCell>
                            <TableCell>{post.likesAdded}</TableCell>
                            <TableCell>
                              {post.status === "completed" ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  已完成
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 gap-1">
                                  <Clock className="h-3 w-3" />
                                  待完成
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}

                  {/* 粉丝增长任务详情 */}
                  {task.serviceType === "follower" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-background rounded-lg border text-center">
                          <p className="text-2xl font-bold">{task.targetFollowers}</p>
                          <p className="text-xs text-muted-foreground mt-1">目标粉丝数</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border text-center">
                          <p className="text-2xl font-bold text-green-600">+{task.addedFollowers}</p>
                          <p className="text-xs text-muted-foreground mt-1">已增长</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border text-center">
                          <p className="text-2xl font-bold text-yellow-600">{task.pending}</p>
                          <p className="text-xs text-muted-foreground mt-1">待增长</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">完成进度</span>
                          <span className="font-medium">{Math.round(task.addedFollowers / task.targetFollowers * 100)}%</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: `${task.addedFollowers / task.targetFollowers * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}

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

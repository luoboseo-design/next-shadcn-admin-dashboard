"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Globe,
  Calendar,
  Tag,
  FileText,
  Languages,
  Copy,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// 支持的语言
const languages = [
  { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", name: "繁體中文", flag: "🇹🇼" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

// 分类
const categories = [
  { id: "news", name: "新闻动态" },
  { id: "tutorial", name: "使用教程" },
  { id: "case", name: "案例分享" },
  { id: "industry", name: "行业资讯" },
  { id: "announcement", name: "平台公告" },
];

// 模拟博文数据
const mockPosts = [
  {
    id: "post-001",
    title: "如何利用外链提升网站SEO排名",
    slug: "how-to-improve-seo-with-backlinks",
    excerpt: "外链是SEO优化中最重要的因素之一，本文将详细介绍如何有效建设高质量外链...",
    category: "tutorial",
    status: "published",
    author: "管理员",
    languages: ["zh-CN", "en", "ja"],
    primaryLanguage: "zh-CN",
    views: 12580,
    publishedAt: "2024-01-20",
    updatedAt: "2024-01-22",
    featured: true,
  },
  {
    id: "post-002",
    title: "2024年GEO优化趋势预测",
    slug: "geo-optimization-trends-2024",
    excerpt: "随着AI搜索的崛起，GEO优化成为新的流量入口，了解最新趋势抢占先机...",
    category: "industry",
    status: "published",
    author: "管理员",
    languages: ["zh-CN", "en"],
    primaryLanguage: "zh-CN",
    views: 8920,
    publishedAt: "2024-01-18",
    updatedAt: "2024-01-18",
    featured: true,
  },
  {
    id: "post-003",
    title: "客户案例：某科技公司3个月流量增长300%",
    slug: "case-study-tech-company-growth",
    excerpt: "通过我们的SEO和GEO服务组合，该客户实现了惊人的流量增长...",
    category: "case",
    status: "published",
    author: "管理员",
    languages: ["zh-CN"],
    primaryLanguage: "zh-CN",
    views: 5640,
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    featured: false,
  },
  {
    id: "post-004",
    title: "平台功能更新：新增社交媒体自动化",
    slug: "platform-update-social-automation",
    excerpt: "我们很高兴地宣布，平台现已支持Reddit、Twitter等社交媒体的自动化发布...",
    category: "announcement",
    status: "published",
    author: "管理员",
    languages: ["zh-CN", "en", "ja", "ko"],
    primaryLanguage: "zh-CN",
    views: 3280,
    publishedAt: "2024-01-12",
    updatedAt: "2024-01-12",
    featured: false,
  },
  {
    id: "post-005",
    title: "SEO vs GEO：如何选择适合你的优化策略",
    slug: "seo-vs-geo-which-to-choose",
    excerpt: "传统SEO和新兴GEO各有优势，本文帮你分析如何根据业务选择...",
    category: "tutorial",
    status: "draft",
    author: "管理员",
    languages: ["zh-CN"],
    primaryLanguage: "zh-CN",
    views: 0,
    publishedAt: null,
    updatedAt: "2024-01-25",
    featured: false,
  },
  {
    id: "post-006",
    title: "新闻稿发布最佳实践指南",
    slug: "press-release-best-practices",
    excerpt: "如何撰写有效的新闻稿并选择合适的媒体渠道进行发布...",
    category: "tutorial",
    status: "scheduled",
    author: "管理员",
    languages: ["zh-CN", "en"],
    primaryLanguage: "zh-CN",
    views: 0,
    publishedAt: "2024-02-01",
    updatedAt: "2024-01-24",
    featured: false,
  },
];

export default function BlogManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    const matchesLanguage = languageFilter === "all" || post.languages.includes(languageFilter);
    return matchesSearch && matchesStatus && matchesCategory && matchesLanguage;
  });

  const stats = {
    total: mockPosts.length,
    published: mockPosts.filter((p) => p.status === "published").length,
    draft: mockPosts.filter((p) => p.status === "draft").length,
    scheduled: mockPosts.filter((p) => p.status === "scheduled").length,
    totalViews: mockPosts.reduce((sum, p) => sum + p.views, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">已发布</Badge>;
      case "draft":
        return <Badge variant="secondary">草稿</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">定时发布</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  const getLanguageFlags = (langCodes: string[]) => {
    return langCodes.map((code) => {
      const lang = languages.find((l) => l.code === code);
      return lang ? lang.flag : code;
    }).join(" ");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(filteredPosts.map((p) => p.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">博文管理</h1>
          <p className="text-muted-foreground mt-1">管理多语言博客内容，支持定时发布</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/blog/categories">
              <Tag className="h-4 w-4 mr-2" />
              分类管理
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              新建博文
            </Link>
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总博文数</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已发布</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">草稿</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">定时发布</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总浏览量</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Globe className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索标题或URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="published">已发布</SelectItem>
                <SelectItem value="draft">草稿</SelectItem>
                <SelectItem value="scheduled">定时发布</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部语言</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 批量操作 */}
          {selectedPosts.length > 0 && (
            <div className="mt-4 flex items-center gap-4 p-3 bg-muted rounded-lg">
              <span className="text-sm">已选择 {selectedPosts.length} 篇博文</span>
              <Button size="sm" variant="outline">
                批量发布
              </Button>
              <Button size="sm" variant="outline">
                批量下架
              </Button>
              <Button size="sm" variant="destructive">
                批量删除
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 博文列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>标题</TableHead>
                <TableHead className="w-[100px]">分类</TableHead>
                <TableHead className="w-[100px]">语言</TableHead>
                <TableHead className="w-[100px]">状态</TableHead>
                <TableHead className="w-[100px] text-right">浏览量</TableHead>
                <TableHead className="w-[120px]">更新时间</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.title}</span>
                        {post.featured && (
                          <Badge variant="outline" className="text-xs">置顶</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate max-w-md">
                        /{post.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCategoryName(post.category)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{getLanguageFlags(post.languages)}</span>
                      <span className="text-xs text-muted-foreground">({post.languages.length})</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{post.updatedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/${post.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            编辑
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/${post.id}/translations`}>
                            <Languages className="h-4 w-4 mr-2" />
                            管理翻译
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          复制博文
                        </DropdownMenuItem>
                        {post.status === "published" && (
                          <DropdownMenuItem asChild>
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              查看页面
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setPostToDelete(post.id);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 删除确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要删除这篇博文吗？此操作将同时删除所有语言版本，且无法恢复。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // 删除逻辑
                setShowDeleteDialog(false);
                setPostToDelete(null);
              }}
            >
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

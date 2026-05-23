"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileEdit,
  Plus,
  Search,
  Sparkles,
  Copy,
  Trash2,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  FileText,
  Globe,
  Share2,
  Newspaper,
  Loader2,
  Wand2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 内容类型
const contentTypes = [
  { id: "blog", name: "博客文章", icon: FileText },
  { id: "social", name: "社交媒体", icon: Share2 },
  { id: "seo", name: "SEO 内容", icon: Globe },
  { id: "press", name: "新闻稿", icon: Newspaper },
];

// 模拟历史内容
const mockContents = [
  {
    id: "1",
    title: "2024年SEO优化最佳实践指南",
    type: "blog",
    status: "completed",
    createdAt: "2024-01-15",
    wordCount: 2500,
  },
  {
    id: "2",
    title: "新产品发布 - AI智能营销助手",
    type: "press",
    status: "completed",
    createdAt: "2024-01-14",
    wordCount: 800,
  },
  {
    id: "3",
    title: "Reddit讨论帖：如何提升网站流量",
    type: "social",
    status: "generating",
    createdAt: "2024-01-14",
    wordCount: 0,
  },
  {
    id: "4",
    title: "外链建设策略完整教程",
    type: "seo",
    status: "completed",
    createdAt: "2024-01-13",
    wordCount: 3200,
  },
  {
    id: "5",
    title: "Twitter推文系列：品牌故事",
    type: "social",
    status: "draft",
    createdAt: "2024-01-12",
    wordCount: 280,
  },
];

export default function ContentPage() {
  const [selectedType, setSelectedType] = useState("blog");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("zh");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setGeneratedContent("");

    // 模拟AI生成
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const sampleContent = `# ${topic}

## 引言

在当今数字化时代，${topic}已成为企业和个人不可忽视的重要领域。本文将深入探讨相关策略和最佳实践，帮助您在竞争激烈的市场中脱颖而出。

## 核心要点

### 1. 理解基础概念

${keywords ? `围绕关键词"${keywords}"，我们需要首先理解...` : "首先，让我们理解基础概念..."}

### 2. 实施策略

- 制定明确的目标和KPI
- 持续监控和优化
- 数据驱动的决策

### 3. 最佳实践

通过系统化的方法，您可以显著提升效果...

## 结论

${topic}是一个持续演进的领域，保持学习和适应能力至关重要。

---
*本文由 AI 智能生成，建议根据实际情况进行修改和完善。*`;

    setGeneratedContent(sampleContent);
    setIsGenerating(false);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileEdit className="h-6 w-6" />
          内容撰写
        </h1>
        <p className="text-muted-foreground">
          使用 AI 智能生成高质量的营销内容，支持多种内容类型和语言
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI 生成
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Clock className="h-4 w-4" />
            历史内容
          </TabsTrigger>
        </TabsList>

        {/* AI 生成 */}
        <TabsContent value="create">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* 左侧：输入配置 */}
            <Card>
              <CardHeader>
                <CardTitle>内容配置</CardTitle>
                <CardDescription>设置内容参数，AI 将根据您的需求生成内容</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 内容类型 */}
                <div className="space-y-3">
                  <Label>内容类型</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {contentTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border transition-all text-left",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "hover:border-muted-foreground/30"
                          )}
                        >
                          <Icon className={cn("h-4 w-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-sm font-medium", isSelected && "text-primary")}>
                            {type.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 主题 */}
                <div className="space-y-2">
                  <Label htmlFor="topic">主题 / 标题 *</Label>
                  <Input
                    id="topic"
                    placeholder="例如：2024年数字营销趋势分析"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                {/* 关键词 */}
                <div className="space-y-2">
                  <Label htmlFor="keywords">目标关键词（可选）</Label>
                  <Input
                    id="keywords"
                    placeholder="多个关键词用逗号分隔"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                {/* 语气和语言 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>语气风格</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">专业正式</SelectItem>
                        <SelectItem value="casual">轻松随意</SelectItem>
                        <SelectItem value="friendly">亲切友好</SelectItem>
                        <SelectItem value="authoritative">权威可信</SelectItem>
                        <SelectItem value="creative">创意活泼</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>输出语言</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh">简体中文</SelectItem>
                        <SelectItem value="zh-TW">繁體中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="ko">한국어</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 额外要求 */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">额外要求（可选）</Label>
                  <Textarea
                    id="requirements"
                    placeholder="描述任何特殊要求，如字数限制、特定结构、引用需求等..."
                    rows={3}
                  />
                </div>

                {/* 生成按钮 */}
                <Button
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      AI 正在生成...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      生成内容
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* 右侧：生成结果 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>生成结果</CardTitle>
                    <CardDescription>AI 生成的内容将显示在这里</CardDescription>
                  </div>
                  {generatedContent && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleRegenerate}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        重新生成
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        复制
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                    <p>AI 正在为您生成内容...</p>
                    <p className="text-sm">预计需要 10-30 秒</p>
                  </div>
                ) : generatedContent ? (
                  <div className="space-y-4">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      rows={20}
                      className="font-mono text-sm"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>字数：{generatedContent.length}</span>
                      <span>可直接编辑上方内容</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Sparkles className="h-12 w-12 mb-4 opacity-50" />
                    <p>配置左侧参数后点击生成</p>
                    <p className="text-sm">AI 将为您创作高质量内容</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 历史内容 */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>历史内容</CardTitle>
                  <CardDescription>查看和管理您生成的所有内容</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="搜索内容..." className="pl-9 w-[200px]" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="类型筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      <SelectItem value="blog">博客文章</SelectItem>
                      <SelectItem value="social">社交媒体</SelectItem>
                      <SelectItem value="seo">SEO 内容</SelectItem>
                      <SelectItem value="press">新闻稿</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockContents.map((content) => {
                  const typeInfo = contentTypes.find((t) => t.id === content.type);
                  const Icon = typeInfo?.icon || FileText;

                  return (
                    <div
                      key={content.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{content.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span>{typeInfo?.name}</span>
                            <span>{content.createdAt}</span>
                            {content.wordCount > 0 && <span>{content.wordCount} 字</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            content.status === "completed"
                              ? "default"
                              : content.status === "generating"
                              ? "secondary"
                              : "outline"
                          }
                          className={cn(
                            content.status === "completed" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          )}
                        >
                          {content.status === "completed" && (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          )}
                          {content.status === "generating" && (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          )}
                          {content.status === "completed"
                            ? "已完成"
                            : content.status === "generating"
                            ? "生成中"
                            : "草稿"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileEdit className="h-4 w-4 mr-2" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              复制
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

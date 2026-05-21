"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/rich-text-editor";
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
  Sparkles,
  FileText,
  Target,
  TrendingUp,
  Copy,
  Download,
  Save,
  Wand2,
  Type,
  Hash,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  Loader2,
  Lightbulb,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// SEO 评分项
interface SeoCheckItem {
  id: string;
  label: string;
  status: "good" | "warning" | "error";
  message: string;
}

export default function ContentEditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [brandName, setBrandName] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // 模拟 AI 生成标题
  const generateTitles = async () => {
    if (keywords.length === 0) return;
    
    setIsGenerating(true);
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const brandPrefix = brandName ? `${brandName}：` : "";
    const keyword = keywords[0];
    const mockTitles = [
      `${brandPrefix}${keyword}完整指南：从入门到精通`,
      `2024年${keyword}最佳实践：${brandName || "专业"}解决方案`,
      `${keyword}深度解析：${brandName || "企业"}如何实现突破`,
      `掌握${keyword}的10个关键技巧`,
      `${brandPrefix}${keyword}策略全解析`,
    ];
    
    setSuggestedTitles(mockTitles);
    setTitle(mockTitles[0]); // 默认选择第一个标题
    setIsGenerating(false);
    
    // 自动生成内容
    generateContent(mockTitles[0]);
  };

  // 模拟 AI 生成内容
  const generateContent = async (articleTitle: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const keyword = keywords[0] || "SEO优化";
    const mockContent = `## ${articleTitle}

在当今数字化时代，${keyword}已成为企业成功的关键因素。${brandName ? `${brandName}深知这一点，` : ""}本文将为您深入解析${keyword}的核心要素和最佳实践。

## 什么是${keyword}？

${keyword}是指通过一系列策略和技术手段，提升企业在目标市场中的竞争力和影响力。${brandName ? `作为行业领先者，${brandName}在这一领域积累了丰富的经验。` : ""}

## ${keyword}的核心要素

### 1. 策略规划
在开始${keyword}之前，需要制定清晰的目标和执行计划。这包括：
- 明确目标受众
- 分析竞争对手
- 制定内容策略

### 2. 执行与优化
${keyword}需要持续的执行和优化：
- 定期发布高质量内容
- 监控关键指标
- 根据数据调整策略

### 3. 效果评估
通过数据分析评估${keyword}的效果：
- 流量增长情况
- 转化率变化
- ROI 分析

## 总结

${keyword}是一个需要长期投入的过程。${brandName ? `选择${brandName}，让专业团队助您实现目标。` : "通过持续优化，您一定能够取得理想的效果。"}`;

    setContent(mockContent);
    setIsGenerating(false);
  };

  // 当关键词或品牌名称变化时，自动生成
  const handleGenerateContent = () => {
    if (keywords.length > 0) {
      generateTitles();
    }
  };

  // 转义正则特殊字符
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 计算内容统计
  const wordCount = content.length;
  const readingTime = Math.ceil(wordCount / 500);
  const keywordPattern = keywords.map(escapeRegex).join("|");
  const keywordDensity = keywords.length > 0 && wordCount > 0 && keywordPattern
    ? ((content.match(new RegExp(keywordPattern, "gi"))?.length || 0) / wordCount * 100).toFixed(1)
    : "0";

  // GEO 评分计算
  const geoChecks = {
    // 引用和来源
    citations: {
      label: "引用来源",
      description: "添加权威数据来源和引用",
      count: (content.match(/根据|研究表明|数据显示|报告指出|专家表示|according to|study shows/gi) || []).length,
      target: 3,
      weight: 15,
    },
    // 统计数据
    statistics: {
      label: "统计数据",
      description: "包含具体数字和统计信息",
      count: (content.match(/\d+%|\d+倍|\d+个|\d+年|\d+万|\d+亿/g) || []).length,
      target: 5,
      weight: 15,
    },
    // 专业术语
    expertise: {
      label: "专业深度",
      description: "使用行业专业术语和概念",
      count: keywords.length > 0 
        ? (content.match(new RegExp(keywordPattern, "gi")) || []).length 
        : 0,
      target: 8,
      weight: 15,
    },
    // 结构化内容
    structure: {
      label: "内容结构",
      description: "使用标题、列表、分段组织",
      count: (content.match(/^##\s|^###\s|^-\s|^\d+\.\s/gm) || []).length,
      target: 6,
      weight: 15,
    },
    // 问答格式
    qaFormat: {
      label: "问答覆盖",
      description: "回答用户可能提出的问题",
      count: (content.match(/什么是|如何|为什么|怎么|哪些|多少|what|how|why|which/gi) || []).length,
      target: 3,
      weight: 10,
    },
    // 内容深度
    depth: {
      label: "内容深度",
      description: "全面覆盖主题各方面",
      count: Math.min(Math.floor(wordCount / 300), 10),
      target: 5,
      weight: 15,
    },
    // 可读性
    readability: {
      label: "可读性",
      description: "段落简洁，句子清晰",
      count: content.split(/\n\n+/).filter(p => p.trim().length > 0 && p.trim().length < 500).length,
      target: 5,
      weight: 15,
    },
  };

  // 计算各项得分和总分
  const calculateItemScore = (count: number, target: number, weight: number) => {
    const ratio = Math.min(count / target, 1);
    return Math.round(ratio * weight);
  };

  const geoScoreItems = Object.entries(geoChecks).map(([key, item]) => ({
    key,
    ...item,
    score: calculateItemScore(item.count, item.target, item.weight),
    status: item.count >= item.target ? "good" : item.count >= item.target * 0.5 ? "warning" : "error",
  }));

  const geoTotalScore = geoScoreItems.reduce((sum, item) => sum + item.score, 0);

  // SEO 检查项
  const seoChecks: SeoCheckItem[] = [
    {
      id: "title",
      label: "标题长度",
      status: title.length >= 10 && title.length <= 60 ? "good" : title.length > 0 ? "warning" : "error",
      message: title.length === 0 ? "请输入标题" : title.length < 10 ? "标题过短，建议10-60字" : title.length > 60 ? "标题过长，建议10-60字" : "标题长度合适",
    },
    {
      id: "content",
      label: "内容长度",
      status: wordCount >= 800 ? "good" : wordCount >= 300 ? "warning" : "error",
      message: wordCount < 300 ? "内容过短，建议至少800字" : wordCount < 800 ? "内容偏短，建议增加到800字以上" : "内容长度良好",
    },
    {
      id: "keywords",
      label: "关键词使用",
      status: parseFloat(keywordDensity) >= 1 && parseFloat(keywordDensity) <= 3 ? "good" : parseFloat(keywordDensity) > 0 ? "warning" : "error",
      message: parseFloat(keywordDensity) === 0 ? "未使用关键词" : parseFloat(keywordDensity) < 1 ? "关键词密度过低" : parseFloat(keywordDensity) > 3 ? "关键词密度过高" : "关键词密度合适",
    },
    {
      id: "headings",
      label: "标题结构",
      status: content.includes("##") ? "good" : content.length > 500 ? "warning" : "error",
      message: content.includes("##") ? "包含小标题" : "建议添加小标题结构",
    },
  ];

  const seoScore = Math.round(
    (seoChecks.filter(c => c.status === "good").length / seoChecks.length) * 100
  );

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  return (
    <div className="min-h-screen">
      {/* 顶部工具栏 */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI 内容编辑器</span>
            </div>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              草稿已保存
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              复制
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* 左侧编辑区 */}
        <div className="flex-1 p-6 border-r min-h-[calc(100vh-57px)]">
          {/* 品牌名称、关键词和AI生成按钮 */}
          <div className="mb-8 p-5 bg-muted/30 rounded-xl border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">品牌名称</Label>
                <Input
                  placeholder="例如：LinkFlow"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="h-10 bg-background"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium mb-2 block">目标关键词</Label>
                <div className="flex flex-wrap items-center gap-2 min-h-10">
                  {keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="gap-1 pr-1 h-7">
                      {kw}
                      <button
                        onClick={() => removeKeyword(kw)}
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder="输入关键词"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                      className="h-7 w-32 text-sm bg-background"
                    />
                    <Button variant="ghost" size="sm" className="h-7 px-2" onClick={addKeyword}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {keywords.length === 0 
                  ? "添加关键词后，AI 将自动生成优化内容" 
                  : `已添加 ${keywords.length} 个关键词`}
              </p>
              <Button 
                onClick={handleGenerateContent} 
                disabled={keywords.length === 0 || isGenerating}
                size="sm"
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    AI 智能生成
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 标题输入 - 带下拉建议 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">文章标题</Label>
              <span className="text-xs text-muted-foreground">{title.length}/60 字符</span>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => suggestedTitles.length > 0 && setShowTitleDropdown(true)}
              onMouseLeave={() => setShowTitleDropdown(false)}
            >
              <Input
                placeholder={isGenerating ? "AI 正在生成标题..." : "输入文章标题，或由 AI 自动生成"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => suggestedTitles.length > 0 && setShowTitleDropdown(true)}
                className={cn(
                  "text-lg font-semibold h-12 pr-10",
                  suggestedTitles.length > 0 && "pr-10"
                )}
                disabled={isGenerating}
              />
              {suggestedTitles.length > 0 && (
                <>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <ChevronDown className={cn("h-4 w-4 transition-transform", showTitleDropdown && "rotate-180")} />
                  </div>
                  {showTitleDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50">
                      <div className="px-3 py-2 text-xs text-muted-foreground font-medium border-b">
                        AI 建议标题（点击选择）
                      </div>
                      <div className="py-1">
                        {suggestedTitles.map((suggestedTitle, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setTitle(suggestedTitle);
                              setShowTitleDropdown(false);
                            }}
                            className={cn(
                              "px-3 py-2 cursor-pointer hover:bg-muted flex items-center justify-between",
                              title === suggestedTitle && "bg-muted/50"
                            )}
                          >
                            <span className={cn(
                              "truncate",
                              title === suggestedTitle && "font-medium text-primary"
                            )}>
                              {suggestedTitle}
                            </span>
                            {title === suggestedTitle && (
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 ml-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {title.length > 0 && title.length <= 60 && (
              <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> 标题长度适合 SEO
              </p>
            )}
          </div>

          {/* 内容编辑区 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">文章内容</Label>
            </div>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder={isGenerating ? "AI 正在生成内容..." : "内容将由 AI 自动生成，您也可以手动编辑..."}
              disabled={isGenerating}
            />
          </div>

          {/* AI 生成封面图 */}
          <div className="mb-6 p-4 bg-muted/30 rounded-xl border">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">封面图</Label>
              {!coverImage && content.length > 100 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // 模拟AI生成封面图
                    setCoverImage("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop");
                  }}
                  className="gap-1"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  AI 生成封面
                </Button>
              )}
            </div>
            {coverImage ? (
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={coverImage} 
                  alt="封面图" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      // 重新生成
                      setCoverImage("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop");
                    }}
                  >
                    <Wand2 className="h-4 w-4 mr-1" />
                    重新生成
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                  >
                    <ImagePlus className="h-4 w-4 mr-1" />
                    上传自定义
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setCoverImage(null)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImagePlus className="h-8 w-8" />
                <p className="text-xs">
                  {content.length < 100 ? "输入内容后可生成封面图" : "点击上方按钮生成封面图"}
                </p>
              </div>
            )}
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setCoverImage(e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          {/* 底部统计 */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Type className="h-4 w-4" />
                {wordCount} 字
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                约 {readingTime} 分钟阅读
              </span>
              <span className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                关键词密度 {keywordDensity}%
              </span>
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="w-80 p-6 bg-muted/30">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="write">SEO 分析</TabsTrigger>
              <TabsTrigger value="preview">GEO 分析</TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="space-y-6 mt-0">
              {/* SEO 评分 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      SEO 评分
                    </span>
                    <span className={cn(
                      "text-2xl font-bold",
                      seoScore >= 80 ? "text-green-500" : seoScore >= 50 ? "text-yellow-500" : "text-red-500"
                    )}>
                      {seoScore}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={seoScore} 
                    className={cn(
                      "h-2 mb-4",
                      seoScore >= 80 ? "[&>div]:bg-green-500" : seoScore >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"
                    )}
                  />
                  <div className="space-y-3">
                    {seoChecks.map((check) => (
                      <div key={check.id} className="flex items-start gap-2">
                        {check.status === "good" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        ) : check.status === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{check.label}</div>
                          <div className="text-xs text-muted-foreground">{check.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 内容建议 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    优化建议
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>在标题中包含主要关键词</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>添加 2-3 个小标题来组织内容</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>在首段和结尾自然融入关键词</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>添加内部链接和外部引用</span>
                  </div>
                </CardContent>
              </Card>

              {/* 关键词分析 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    关键词分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {keywords.map((kw) => {
                      const escapedKw = escapeRegex(kw);
                      const count = (content.match(new RegExp(escapedKw, "gi")) || []).length;
                      return (
                        <div key={kw} className="flex items-center justify-between">
                          <span className="text-sm">{kw}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">出现 {count} 次</span>
                            {count > 0 ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="mt-0 space-y-4">
              {/* GEO 总评分 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      GEO 评分
                    </span>
                    <span className={cn(
                      "text-2xl font-bold",
                      geoTotalScore >= 80 ? "text-green-500" : geoTotalScore >= 50 ? "text-yellow-500" : "text-red-500"
                    )}>
                      {geoTotalScore}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={geoTotalScore} 
                    className={cn(
                      "h-2 mb-4",
                      geoTotalScore >= 80 ? "[&>div]:bg-green-500" : geoTotalScore >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"
                    )}
                  />
                  <p className="text-xs text-muted-foreground">
                    GEO (Generative Engine Optimization) 评估内容在 AI 搜索引擎中的可见性
                  </p>
                </CardContent>
              </Card>

              {/* GEO 评分详情 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    评分详情
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {geoScoreItems.map((item) => (
                    <div key={item.key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {item.status === "good" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : item.status === "warning" ? (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.score}/{item.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(item.score / item.weight) * 100} 
                          className={cn(
                            "h-1.5 flex-1",
                            item.status === "good" ? "[&>div]:bg-green-500" : 
                            item.status === "warning" ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"
                          )}
                        />
                        <span className="text-xs text-muted-foreground w-16 text-right">
                          {item.count}/{item.target}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* GEO 优化建议 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    GEO 优化建议
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {geoScoreItems.filter(item => item.status !== "good").slice(0, 4).map((item) => (
                    <div key={item.key} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">{item.label}：</span>
                        <span className="text-muted-foreground">
                          {item.key === "citations" && "添加更多权威来源引用，如「研究表明」「数据显示」"}
                          {item.key === "statistics" && "加入具体数字和统计数据，增强可信度"}
                          {item.key === "expertise" && "更多使用目标关键词，展示专业深度"}
                          {item.key === "structure" && "使用更多标题和列表，优化内容结构"}
                          {item.key === "qaFormat" && "添加问答式内容，覆盖用户常见问题"}
                          {item.key === "depth" && "扩展内容长度，全面覆盖主题各方面"}
                          {item.key === "readability" && "拆分过长段落，提高内容可读性"}
                        </span>
                      </div>
                    </div>
                  ))}
                  {geoScoreItems.filter(item => item.status !== "good").length === 0 && (
                    <div className="text-sm text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      内容已针对 AI 搜索引擎充分优化
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI 搜索预览 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI 搜索回答预览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">
                          {content.length > 50 
                            ? content.replace(/^##?\s.+$/gm, '').replace(/\n+/g, ' ').slice(0, 200) + "..."
                            : "您的内容将被 AI 搜索引擎提取并展示给用户。优质的 GEO 内容能够增加被引用的概率。"}
                        </p>
                        {brandName && (
                          <p className="text-xs text-muted-foreground mt-2">
                            来源：{brandName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    这是您的内容可能在 ChatGPT、Perplexity 等 AI 搜索中被引用的效果
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

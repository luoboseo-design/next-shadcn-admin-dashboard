"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          {/* 品牌名称和关键词 - 放在最上面 */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">品牌名称</Label>
              <Input
                placeholder="输入品牌名称"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="h-9"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">目标关键词</Label>
              <div className="flex flex-wrap items-center gap-2">
                {keywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="gap-1 pr-1">
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
                    placeholder="添加关键词"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                    className="h-7 w-28 text-sm"
                  />
                  <Button variant="ghost" size="sm" className="h-7 px-2" onClick={addKeyword}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* AI 生成按钮 */}
          <div className="mb-6">
            <Button 
              onClick={handleGenerateContent} 
              disabled={keywords.length === 0 || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  AI 正在生成...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  AI 生成内容
                </>
              )}
            </Button>
            {keywords.length === 0 && (
              <p className="text-xs text-muted-foreground mt-2 text-center">请先添加关键词</p>
            )}
          </div>

          {/* 标题输入 - 带下拉建议 */}
          <div className="mb-6 relative">
            <Label className="text-sm text-muted-foreground mb-2 block">文章标题</Label>
            <div className="relative">
              <Input
                placeholder={isGenerating ? "AI 正在生成标题..." : "输入文章标题..."}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold pr-10"
                disabled={isGenerating}
              />
              {suggestedTitles.length > 0 && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <DropdownMenu open={showTitleDropdown} onOpenChange={setShowTitleDropdown}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[500px]">
                      <div className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                        AI 建议标题
                      </div>
                      {suggestedTitles.map((suggestedTitle, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => {
                            setTitle(suggestedTitle);
                            setShowTitleDropdown(false);
                          }}
                          className="cursor-pointer"
                        >
                          <span className={cn(
                            "truncate",
                            title === suggestedTitle && "font-medium text-primary"
                          )}>
                            {suggestedTitle}
                          </span>
                          {title === suggestedTitle && (
                            <CheckCircle2 className="h-4 w-4 ml-auto text-primary shrink-0" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{title.length}/60 字符</span>
              {title.length > 0 && title.length <= 60 && (
                <span className="text-green-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> 长度合适
                </span>
              )}
            </div>
          </div>

          {/* 内容编辑区 */}
          <Textarea
            placeholder={isGenerating ? "AI 正在生成内容..." : "内容将由 AI 自动生成，您也可以手动编辑..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] resize-none text-base leading-relaxed"
            disabled={isGenerating}
          />

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

            <TabsContent value="preview" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    搜索结果预览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg bg-background">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                      {title || "文章标题将显示在这里"}
                    </div>
                    <div className="text-green-700 text-sm mt-1">
                      {"example.com › blog › article"}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {content.slice(0, 160) || "文章描述将显示在这里，建议控制在 160 字符以内，包含核心关键词以提高点击率..."}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    这是您的内容在 Google 搜索结果中的预览效果
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

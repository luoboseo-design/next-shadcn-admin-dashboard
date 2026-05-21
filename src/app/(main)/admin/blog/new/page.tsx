"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  Clock,
  Globe,
  Plus,
  X,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Languages,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 支持的语言 - 默认显示这些语言
const defaultLanguages = [
  { code: "zh-CN", name: "简体中文", shortCode: "CN", isMain: true },
  { code: "zh-TW", name: "繁體中文", shortCode: "TW" },
  { code: "en", name: "English", shortCode: "EN" },
  { code: "ja", name: "日本語", shortCode: "JA" },
  { code: "ko", name: "한국어", shortCode: "KR" },
  { code: "es", name: "Español", shortCode: "ES" },
];

// 可添加的其他语言
const additionalLanguages = [
  { code: "de", name: "Deutsch", shortCode: "DE" },
  { code: "fr", name: "Français", shortCode: "FR" },
  { code: "pt", name: "Português", shortCode: "PT" },
  { code: "ru", name: "Русский", shortCode: "RU" },
  { code: "ar", name: "العربية", shortCode: "AR" },
  { code: "vi", name: "Tiếng Việt", shortCode: "VI" },
  { code: "th", name: "ไทย", shortCode: "TH" },
  { code: "id", name: "Indonesia", shortCode: "ID" },
];

// 分类
const categories = [
  { id: "news", name: "新闻动态" },
  { id: "tutorial", name: "使用教程" },
  { id: "case", name: "案例分享" },
  { id: "industry", name: "行业资讯" },
  { id: "announcement", name: "平台公告" },
];

type TranslationStatus = "none" | "translating" | "success" | "error";

interface LanguageContent {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  translationStatus: TranslationStatus;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [activeLanguage, setActiveLanguage] = useState("zh-CN");
  const [enabledLanguages, setEnabledLanguages] = useState(
    defaultLanguages.map((l) => l.code)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslatingAll, setIsTranslatingAll] = useState(false);

  // 多语言内容
  const [contents, setContents] = useState<Record<string, LanguageContent>>(() => {
    const initial: Record<string, LanguageContent> = {};
    defaultLanguages.forEach((lang) => {
      initial[lang.code] = {
        title: "",
        content: "",
        excerpt: "",
        metaTitle: "",
        metaDescription: "",
        translationStatus: lang.isMain ? "success" : "none",
      };
    });
    return initial;
  });

  // 通用设置
  const [settings, setSettings] = useState({
    slug: "",
    category: "",
    featured: false,
    allowComments: true,
    publishNow: true,
    scheduledDate: "",
    scheduledTime: "",
    coverImage: "",
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState("");

  const allLanguages = [...defaultLanguages, ...additionalLanguages];

  const addLanguage = (langCode: string) => {
    if (!enabledLanguages.includes(langCode)) {
      setEnabledLanguages([...enabledLanguages, langCode]);
      setContents({
        ...contents,
        [langCode]: {
          title: "",
          content: "",
          excerpt: "",
          metaTitle: "",
          metaDescription: "",
          translationStatus: "none",
        },
      });
    }
  };

  const removeLanguage = (langCode: string) => {
    if (langCode === "zh-CN") return; // 主语言不能删除
    setEnabledLanguages(enabledLanguages.filter((l) => l !== langCode));
    const newContents = { ...contents };
    delete newContents[langCode];
    setContents(newContents);
    if (activeLanguage === langCode) {
      setActiveLanguage("zh-CN");
    }
  };

  const updateContent = (field: keyof LanguageContent, value: string) => {
    setContents({
      ...contents,
      [activeLanguage]: {
        ...contents[activeLanguage],
        [field]: value,
      },
    });
  };

  // 翻译单个语言
  const translateSingleLanguage = async (langCode: string) => {
    if (langCode === "zh-CN") return;
    
    // 更新状态为翻译中
    setContents((prev) => ({
      ...prev,
      [langCode]: {
        ...prev[langCode],
        translationStatus: "translating",
      },
    }));

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    // 模拟翻译结果
    const sourceContent = contents["zh-CN"];
    const lang = allLanguages.find((l) => l.code === langCode);
    
    setContents((prev) => ({
      ...prev,
      [langCode]: {
        title: sourceContent.title ? `[${lang?.shortCode}] ${sourceContent.title}` : "",
        content: sourceContent.content ? `[Translated to ${lang?.name}]\n\n${sourceContent.content}` : "",
        excerpt: sourceContent.excerpt ? `[${lang?.shortCode}] ${sourceContent.excerpt}` : "",
        metaTitle: sourceContent.metaTitle ? `[${lang?.shortCode}] ${sourceContent.metaTitle}` : "",
        metaDescription: sourceContent.metaDescription ? `[${lang?.shortCode}] ${sourceContent.metaDescription}` : "",
        translationStatus: "success",
      },
    }));
  };

  // 一键翻译所有语言
  const translateAllLanguages = async () => {
    if (!contents["zh-CN"].content) {
      alert("请先输入中文内容");
      return;
    }

    setIsTranslatingAll(true);

    // 更新所有非主语言状态为翻译中
    const langsToTranslate = enabledLanguages.filter((l) => l !== "zh-CN");
    setContents((prev) => {
      const updated = { ...prev };
      langsToTranslate.forEach((langCode) => {
        updated[langCode] = {
          ...updated[langCode],
          translationStatus: "translating",
        };
      });
      return updated;
    });

    // 并行翻译所有语言
    await Promise.all(
      langsToTranslate.map(async (langCode) => {
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        const sourceContent = contents["zh-CN"];
        const lang = allLanguages.find((l) => l.code === langCode);
        
        // 随机模拟少数失败
        const success = Math.random() > 0.1;
        
        setContents((prev) => ({
          ...prev,
          [langCode]: success
            ? {
                title: sourceContent.title ? `[${lang?.shortCode}] ${sourceContent.title}` : "",
                content: sourceContent.content ? `[Translated to ${lang?.name}]\n\n${sourceContent.content}` : "",
                excerpt: sourceContent.excerpt ? `[${lang?.shortCode}] ${sourceContent.excerpt}` : "",
                metaTitle: sourceContent.metaTitle ? `[${lang?.shortCode}] ${sourceContent.metaTitle}` : "",
                metaDescription: sourceContent.metaDescription ? `[${lang?.shortCode}] ${sourceContent.metaDescription}` : "",
                translationStatus: "success",
              }
            : {
                ...prev[langCode],
                translationStatus: "error",
              },
        }));
      })
    );

    setIsTranslatingAll(false);
  };

  const addTag = () => {
    if (newTag && !settings.tags.includes(newTag)) {
      setSettings({ ...settings, tags: [...settings.tags, newTag] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setSettings({ ...settings, tags: settings.tags.filter((t) => t !== tag) });
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    router.push("/admin/blog");
  };

  const currentContent = contents[activeLanguage] || contents["zh-CN"];
  const currentLang = allLanguages.find((l) => l.code === activeLanguage);
  const isMainLanguage = activeLanguage === "zh-CN";

  // 获取翻译状态图标
  const getStatusIcon = (status: TranslationStatus) => {
    switch (status) {
      case "translating":
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case "success":
        return <Check className="h-3 w-3 text-green-500" />;
      case "error":
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">新建博文</h1>
              <p className="text-muted-foreground text-sm">创建多语言博客内容</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
            <Button onClick={() => handleSave(true)} disabled={isSaving}>
              <Eye className="h-4 w-4 mr-2" />
              发布
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 主编辑区 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 语言版本选择 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    语言版本
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {/* AI 一键翻译按钮 */}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={translateAllLanguages}
                      disabled={isTranslatingAll || !contents["zh-CN"].content}
                    >
                      {isTranslatingAll ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      AI 一键翻译
                    </Button>
                    {/* 添加语言 */}
                    <Select onValueChange={addLanguage}>
                      <SelectTrigger className="w-[140px]">
                        <Plus className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="添加语言" />
                      </SelectTrigger>
                      <SelectContent>
                        {additionalLanguages
                          .filter((l) => !enabledLanguages.includes(l.code))
                          .map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.shortCode} {lang.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 语言标签 */}
                <div className="flex flex-wrap gap-2">
                  {enabledLanguages.map((langCode) => {
                    const lang = allLanguages.find((l) => l.code === langCode);
                    const content = contents[langCode];
                    const isActive = activeLanguage === langCode;
                    const isMain = langCode === "zh-CN";

                    return (
                      <Tooltip key={langCode}>
                        <TooltipTrigger asChild>
                          <div
                            className={`
                              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border cursor-pointer
                              transition-all duration-200
                              ${isActive 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "bg-background hover:bg-muted border-border"
                              }
                            `}
                            onClick={() => setActiveLanguage(langCode)}
                          >
                            <span className="text-xs font-medium opacity-70">
                              {lang?.shortCode}
                            </span>
                            <span className="text-sm font-medium">
                              {lang?.name}
                            </span>
                            {isMain && (
                              <span className="text-xs opacity-60">(主)</span>
                            )}
                            {!isMain && content && (
                              <span className="ml-1">
                                {getStatusIcon(content.translationStatus)}
                              </span>
                            )}
                            {!isMain && (
                              <button
                                className={`
                                  ml-1 rounded-full p-0.5 transition-colors
                                  ${isActive 
                                    ? "hover:bg-primary-foreground/20" 
                                    : "hover:bg-muted-foreground/20"
                                  }
                                `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeLanguage(langCode);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isMain 
                            ? "主语言 (不可删除)" 
                            : content?.translationStatus === "error"
                            ? "翻译失败，点击重试"
                            : content?.translationStatus === "success"
                            ? "已翻译"
                            : "未翻译"
                          }
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 内容编辑 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {currentLang?.shortCode}
                    </span>
                    编辑 {currentLang?.name} 版本
                  </CardTitle>
                  {/* 单语言翻译按钮 */}
                  {!isMainLanguage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => translateSingleLanguage(activeLanguage)}
                      disabled={
                        currentContent.translationStatus === "translating" ||
                        !contents["zh-CN"].content
                      }
                    >
                      {currentContent.translationStatus === "translating" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Languages className="h-4 w-4 mr-2" />
                      )}
                      {currentContent.translationStatus === "error" 
                        ? "重新翻译" 
                        : currentContent.translationStatus === "success"
                        ? "重新翻译"
                        : "翻译此语言"
                      }
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">标题</Label>
                  <Input
                    id="title"
                    placeholder={isMainLanguage ? "输入博文标题..." : "输入标题或使用AI翻译..."}
                    value={currentContent.title}
                    onChange={(e) => updateContent("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">摘要</Label>
                  <Textarea
                    id="excerpt"
                    placeholder={isMainLanguage ? "输入博文摘要（用于列表展示和SEO）..." : "输入摘要或使用AI翻译..."}
                    value={currentContent.excerpt}
                    onChange={(e) => updateContent("excerpt", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>正文内容</Label>
                  {/* 简易工具栏 */}
                  <div className="flex items-center gap-1 p-2 border rounded-t-lg bg-muted/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heading3 className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Quote className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder={isMainLanguage ? "输入博文正文内容（支持Markdown）..." : "输入内容或使用AI翻译..."}
                    value={currentContent.content}
                    onChange={(e) => updateContent("content", e.target.value)}
                    rows={15}
                    className="rounded-t-none font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO 设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  SEO 设置 ({currentLang?.name})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta 标题</Label>
                  <Input
                    id="metaTitle"
                    placeholder="SEO标题（留空则使用博文标题）"
                    value={currentContent.metaTitle}
                    onChange={(e) => updateContent("metaTitle", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {currentContent.metaTitle.length}/60 字符
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta 描述</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="SEO描述（留空则使用摘要）"
                    value={currentContent.metaDescription}
                    onChange={(e) => updateContent("metaDescription", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {currentContent.metaDescription.length}/160 字符
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧设置栏 */}
          <div className="space-y-6">
            {/* 发布设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">发布设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">URL 别名</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">/blog/</span>
                    <Input
                      id="slug"
                      placeholder="url-slug"
                      value={settings.slug}
                      onChange={(e) => setSettings({ ...settings, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">分类</Label>
                  <Select
                    value={settings.category}
                    onValueChange={(value) => setSettings({ ...settings, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>立即发布</Label>
                    <p className="text-xs text-muted-foreground">
                      关闭后可设置定时发布
                    </p>
                  </div>
                  <Switch
                    checked={settings.publishNow}
                    onCheckedChange={(checked) => setSettings({ ...settings, publishNow: checked })}
                  />
                </div>

                {!settings.publishNow && (
                  <div className="space-y-2">
                    <Label>定时发布时间</Label>
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        value={settings.scheduledDate}
                        onChange={(e) => setSettings({ ...settings, scheduledDate: e.target.value })}
                      />
                      <Input
                        type="time"
                        value={settings.scheduledTime}
                        onChange={(e) => setSettings({ ...settings, scheduledTime: e.target.value })}
                        className="w-[120px]"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>置顶博文</Label>
                    <p className="text-xs text-muted-foreground">
                      在列表顶部显示
                    </p>
                  </div>
                  <Switch
                    checked={settings.featured}
                    onCheckedChange={(checked) => setSettings({ ...settings, featured: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>允许评论</Label>
                    <p className="text-xs text-muted-foreground">
                      用户可以发表评论
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowComments}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowComments: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 封面图 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">封面图片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                  <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    点击上传或拖拽图片
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    推荐尺寸: 1200x630px
                  </p>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI 生成封面图
                </Button>
              </CardContent>
            </Card>

            {/* 标签 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">标签</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="添加标签..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button variant="outline" size="icon" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {settings.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {settings.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-1">
                        {tag}
                        <button
                          className="ml-1 hover:text-destructive"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI 辅助 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI 辅助</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI 生成摘要
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI 优化 SEO
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

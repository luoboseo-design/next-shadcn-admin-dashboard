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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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

export default function NewBlogPostPage() {
  const router = useRouter();
  const [activeLanguage, setActiveLanguage] = useState("zh-CN");
  const [enabledLanguages, setEnabledLanguages] = useState(["zh-CN"]);
  const [isSaving, setIsSaving] = useState(false);

  // 多语言内容
  const [contents, setContents] = useState<Record<string, {
    title: string;
    content: string;
    excerpt: string;
    metaTitle: string;
    metaDescription: string;
  }>>({
    "zh-CN": {
      title: "",
      content: "",
      excerpt: "",
      metaTitle: "",
      metaDescription: "",
    },
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

  const updateContent = (field: string, value: string) => {
    setContents({
      ...contents,
      [activeLanguage]: {
        ...contents[activeLanguage],
        [field]: value,
      },
    });
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
    // 模拟保存
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    router.push("/admin/blog");
  };

  const currentContent = contents[activeLanguage] || contents["zh-CN"];
  const currentLang = languages.find((l) => l.code === activeLanguage);

  return (
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
          {/* 语言选择 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  语言版本
                </CardTitle>
                <Select onValueChange={addLanguage}>
                  <SelectTrigger className="w-[160px]">
                    <Plus className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="添加语言" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter((l) => !enabledLanguages.includes(l.code))
                      .map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {enabledLanguages.map((langCode) => {
                  const lang = languages.find((l) => l.code === langCode);
                  return (
                    <Badge
                      key={langCode}
                      variant={activeLanguage === langCode ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => setActiveLanguage(langCode)}
                    >
                      {lang?.flag} {lang?.name}
                      {langCode === "zh-CN" && (
                        <span className="ml-1 text-xs opacity-70">(主)</span>
                      )}
                      {langCode !== "zh-CN" && (
                        <button
                          className="ml-2 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeLanguage(langCode);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 内容编辑 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                {currentLang?.flag} 编辑 {currentLang?.name} 版本
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">标题</Label>
                <Input
                  id="title"
                  placeholder="输入博文标题..."
                  value={currentContent.title}
                  onChange={(e) => updateContent("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">摘要</Label>
                <Textarea
                  id="excerpt"
                  placeholder="输入博文摘要（用于列表展示和SEO）..."
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
                  placeholder="输入博文正文内容（支持Markdown）..."
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
              <CardTitle className="text-base">SEO 设置 ({currentLang?.name})</CardTitle>
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

          {/* AI 翻译 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI 辅助</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                自动翻译到其他语言
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                AI 生成摘要
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ImageIcon className="h-4 w-4 mr-2" />
                AI 生成封面图
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

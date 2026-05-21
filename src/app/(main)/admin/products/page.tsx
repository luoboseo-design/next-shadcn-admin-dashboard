"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  Globe,
  GripVertical,
  Link2,
  MoreHorizontal,
  Newspaper,
  Pencil,
  Plus,
  Search,
  Share2,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// 服务大类配置
const serviceCategories = [
  { id: "seo", name: "SEO 服务", icon: Link2, color: "bg-blue-500" },
  { id: "geo", name: "GEO 服务", icon: Globe, color: "bg-green-500" },
  { id: "social", name: "社交媒体", icon: Share2, color: "bg-purple-500" },
  { id: "pr", name: "发稿服务", icon: Newspaper, color: "bg-orange-500" },
];

// 定价模式
type PricingMode =
  | "package" // 套餐定价（SEO外链、客座文章）
  | "platform_service" // 平台×服务类型×质量 = 价格（社交媒体）
  | "unit_platform" // 单价×数量×平台数（GEO关键词）
  | "fixed_service" // 固定服务价格（GEO权威建设）
  | "media_select"; // 媒体单独选择定价（发稿服务）

const pricingModeLabels: Record<PricingMode, string> = {
  package: "套餐定价",
  platform_service: "平台×服务×质量",
  unit_platform: "单价×数量×平台",
  fixed_service: "固定服务价格",
  media_select: "媒体单选定价",
};

// ============== SEO 服务配置 ==============
const seoServices = [
  {
    id: "seo-backlink",
    category: "seo",
    name: "外链代发",
    slug: "backlinks",
    description: "通过高质量外链提升网站权重",
    pricingMode: "package" as PricingMode,
    status: "active",
    packages: [
      { id: "starter", name: "入门版", quantity: 10, unit: "条外链", price: 5 },
      { id: "growth", name: "成长版", quantity: 50, unit: "条外链", price: 20 },
      { id: "pro", name: "专业版", quantity: 100, unit: "条外链", price: 50 },
      { id: "enterprise", name: "企业版", quantity: 500, unit: "条外链", price: 120 },
    ],
    platformTypes: [
      { id: "blog", name: "博客", enabled: true, priceMultiplier: 1 },
      { id: "forum", name: "论坛", enabled: true, priceMultiplier: 0.8 },
      { id: "news", name: "新闻站", enabled: true, priceMultiplier: 1.5 },
      { id: "social", name: "社交媒体", enabled: true, priceMultiplier: 0.6 },
      { id: "directory", name: "目录站", enabled: true, priceMultiplier: 0.5 },
      { id: "wiki", name: "维基百科", enabled: true, priceMultiplier: 3 },
      { id: "profile", name: "个人资料链接", enabled: true, priceMultiplier: 0.3 },
      { id: "custom", name: "定制", enabled: true, priceMultiplier: 2 },
    ],
  },
  {
    id: "seo-guest-post",
    category: "seo",
    name: "客座文章",
    slug: "guest-posts",
    description: "在高权重媒体发布品牌文章",
    pricingMode: "package" as PricingMode,
    status: "active",
    packages: [
      { id: "3media", name: "3媒体套餐", quantity: 3, unit: "家媒体", price: 299 },
      { id: "5media", name: "5媒体套餐", quantity: 5, unit: "家媒体", price: 449 },
      { id: "10media", name: "10媒体套餐", quantity: 10, unit: "家媒体", price: 799 },
    ],
    platformTypes: [
      { id: "tech", name: "科技媒体", enabled: true, priceMultiplier: 1.2 },
      { id: "business", name: "商业媒体", enabled: true, priceMultiplier: 1.5 },
      { id: "lifestyle", name: "生活方式", enabled: true, priceMultiplier: 1 },
      { id: "industry", name: "行业垂直", enabled: true, priceMultiplier: 1.3 },
    ],
  },
];

// ============== GEO 服务配置 ==============
const geoServices = [
  {
    id: "geo-keyword",
    category: "geo",
    name: "关键词优化",
    slug: "keyword",
    description: "优化品牌在 AI 搜索引擎中的关键词排名",
    pricingMode: "unit_platform" as PricingMode,
    status: "active",
    unitPricing: {
      en: { pricePerUnit: 200, label: "英文平台" },
      zh: { pricePerUnit: 100, label: "中文平台" },
    },
    platforms: [
      { id: "chatgpt", name: "ChatGPT", category: "en", enabled: true },
      { id: "perplexity", name: "Perplexity", category: "en", enabled: true },
      { id: "gemini", name: "Gemini", category: "en", enabled: true },
      { id: "metaai", name: "Meta AI", category: "en", enabled: true },
      { id: "deepseek", name: "DeepSeek", category: "zh", enabled: true },
      { id: "doubao", name: "豆包", category: "zh", enabled: true },
      { id: "tongyi", name: "通义千问", category: "zh", enabled: true },
      { id: "wenxin", name: "文心一言", category: "zh", enabled: true },
    ],
  },
  {
    id: "geo-page",
    category: "geo",
    name: "页面优化",
    slug: "page",
    description: "优化指定页面，让 AI 更容易理解和推荐",
    pricingMode: "unit_platform" as PricingMode,
    status: "active",
    unitPricing: {
      default: { pricePerUnit: 150, label: "每页" },
    },
    platforms: [],
  },
  {
    id: "geo-authority",
    category: "geo",
    name: "权威建设",
    slug: "authority",
    description: "建设品牌权威性，提升 AI 信任度",
    pricingMode: "fixed_service" as PricingMode,
    status: "active",
    fixedServices: [
      { id: "entity", name: "实体一致性优化", price: 500, unit: "次", turnaround: "7-14天" },
      { id: "citation", name: "引用来源建设", price: 800, unit: "次", turnaround: "14-21天", popular: true },
      { id: "about", name: "关于页面优化", price: 300, unit: "次", turnaround: "3-5天" },
    ],
  },
];

// ============== 社交媒体服务配置 ==============
const socialServices = [
  {
    id: "social-all",
    category: "social",
    name: "社交媒体推广",
    slug: "social",
    description: "在多平台进行品牌推广和口碑营销",
    pricingMode: "platform_service" as PricingMode,
    status: "active",
    platforms: [
      { id: "reddit", name: "Reddit", icon: "R", color: "bg-orange-500" },
      { id: "instagram", name: "Instagram", icon: "IG", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" },
      { id: "x", name: "X (Twitter)", icon: "X", color: "bg-black" },
    ],
    serviceTypes: [
      { id: "post", name: "发帖" },
      { id: "comment", name: "评论" },
      { id: "like", name: "点赞" },
      { id: "follower", name: "粉丝增长" },
    ],
    qualityLevels: [
      { id: "standard", name: "标准" },
      { id: "premium", name: "优质" },
      { id: "elite", name: "精英" },
    ],
    // 价格矩阵：platform -> serviceType -> quality -> price
    priceMatrix: [
      // Reddit
      { platform: "reddit", serviceType: "post", quality: "standard", price: 50, unit: "条", minQty: 1, maxQty: 50, turnaround: "1-2天" },
      { platform: "reddit", serviceType: "post", quality: "premium", price: 120, unit: "条", minQty: 1, maxQty: 30, turnaround: "2-3天" },
      { platform: "reddit", serviceType: "comment", quality: "standard", price: 15, unit: "条", minQty: 5, maxQty: 100, turnaround: "1-2天" },
      { platform: "reddit", serviceType: "comment", quality: "premium", price: 35, unit: "条", minQty: 3, maxQty: 50, turnaround: "2-3天" },
      { platform: "reddit", serviceType: "like", quality: "standard", price: 5, unit: "个", minQty: 10, maxQty: 500, turnaround: "1-3天" },
      { platform: "reddit", serviceType: "follower", quality: "standard", price: 8, unit: "个", minQty: 50, maxQty: 1000, turnaround: "3-7天" },
      // Instagram
      { platform: "instagram", serviceType: "post", quality: "standard", price: 80, unit: "条", minQty: 1, maxQty: 30, turnaround: "1-2天" },
      { platform: "instagram", serviceType: "post", quality: "elite", price: 300, unit: "条", minQty: 1, maxQty: 10, turnaround: "3-5天" },
      { platform: "instagram", serviceType: "comment", quality: "standard", price: 10, unit: "条", minQty: 10, maxQty: 200, turnaround: "1-2天" },
      { platform: "instagram", serviceType: "comment", quality: "premium", price: 25, unit: "条", minQty: 5, maxQty: 100, turnaround: "2-3天" },
      { platform: "instagram", serviceType: "like", quality: "standard", price: 3, unit: "个", minQty: 50, maxQty: 5000, turnaround: "1-2天" },
      { platform: "instagram", serviceType: "like", quality: "premium", price: 6, unit: "个", minQty: 50, maxQty: 2000, turnaround: "2-3天" },
      { platform: "instagram", serviceType: "follower", quality: "standard", price: 5, unit: "个", minQty: 100, maxQty: 10000, turnaround: "3-7天" },
      { platform: "instagram", serviceType: "follower", quality: "elite", price: 12, unit: "个", minQty: 50, maxQty: 5000, turnaround: "5-10天" },
      // X (Twitter)
      { platform: "x", serviceType: "post", quality: "standard", price: 40, unit: "条", minQty: 1, maxQty: 50, turnaround: "1-2天" },
      { platform: "x", serviceType: "post", quality: "elite", price: 150, unit: "条", minQty: 1, maxQty: 20, turnaround: "2-4天" },
      { platform: "x", serviceType: "comment", quality: "standard", price: 12, unit: "条", minQty: 5, maxQty: 100, turnaround: "1-2天" },
      { platform: "x", serviceType: "comment", quality: "premium", price: 30, unit: "条", minQty: 3, maxQty: 50, turnaround: "2-3天" },
      { platform: "x", serviceType: "like", quality: "standard", price: 4, unit: "个", minQty: 50, maxQty: 5000, turnaround: "1-2天" },
      { platform: "x", serviceType: "follower", quality: "standard", price: 6, unit: "个", minQty: 100, maxQty: 10000, turnaround: "3-7天" },
      { platform: "x", serviceType: "follower", quality: "elite", price: 15, unit: "个", minQty: 50, maxQty: 5000, turnaround: "5-10天" },
    ],
  },
];

// ============== 发稿服务配置 ==============
const prServices = [
  {
    id: "pr-news",
    category: "pr",
    name: "新闻稿发布",
    slug: "press-release",
    description: "在主流新闻媒体发布企业新闻稿",
    pricingMode: "media_select" as PricingMode,
    status: "active",
    mediaCount: 50, // 已配置的媒体数量
    priceRange: { min: 50, max: 2000 },
    filters: [
      { id: "industry", name: "行业", options: ["科技", "财经", "综合", "生活", "汽车"] },
      { id: "language", name: "语言", options: ["中文", "英文", "日文", "韩文"] },
      { id: "region", name: "地区", options: ["全球", "中国", "美国", "欧洲", "东南亚"] },
      { id: "mediaType", name: "媒体类型", options: ["通讯社", "门户网站", "垂直媒体", "自媒体"] },
    ],
  },
];

// 合并所有服务
const allServices = [...seoServices, ...geoServices, ...socialServices, ...prServices];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedServices, setExpandedServices] = useState<string[]>(["seo-backlink", "social-all"]);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [editingPrice, setEditingPrice] = useState<{
    platform?: string;
    serviceType?: string;
    quality?: string;
    price?: number;
  } | null>(null);

  const filteredServices =
    selectedCategory === "all"
      ? allServices
      : allServices.filter((s) => s.category === selectedCategory);

  const getCategoryInfo = (categoryId: string) =>
    serviceCategories.find((c) => c.id === categoryId);

  const toggleExpand = (serviceId: string) => {
    setExpandedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">产品管理</h1>
          <p className="text-muted-foreground mt-1">
            管理服务产品、定价策略和配置选项
          </p>
        </div>
        <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加服务
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>添加服务</DialogTitle>
              <DialogDescription>创建新的服务产品</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>服务类别</Label>
                  <Select defaultValue="seo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>定价模式</Label>
                  <Select defaultValue="package">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(pricingModeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>服务名称</Label>
                <Input placeholder="如：外链代发" />
              </div>
              <div className="space-y-2">
                <Label>服务描述</Label>
                <Textarea placeholder="描述服务的核心价值..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowServiceDialog(false)}>
                取消
              </Button>
              <Button onClick={() => setShowServiceDialog(false)}>创建</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 分类筛选 */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          全部服务
        </Button>
        {serviceCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              <Icon className="h-4 w-4 mr-1" />
              {cat.name}
            </Button>
          );
        })}
      </div>

      {/* 服务列表 */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const categoryInfo = getCategoryInfo(service.category);
          const Icon = categoryInfo?.icon || Link2;
          const isExpanded = expandedServices.includes(service.id);

          return (
            <Card key={service.id}>
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpand(service.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div
                          className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center",
                            categoryInfo?.color
                          )}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {pricingModeLabels[service.pricingMode]}
                            </Badge>
                            {service.status === "active" ? (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                已启用
                              </Badge>
                            ) : (
                              <Badge variant="secondary">已停用</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {service.description}
                          </p>
                        </div>
                      </button>
                    </CollapsibleTrigger>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          编辑服务
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          复制服务
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {service.status === "active" ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-2" />
                              停用服务
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-2" />
                              启用服务
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除服务
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CollapsibleContent>
                  <CardContent>
                    {/* 套餐定价模式 */}
                    {service.pricingMode === "package" && "packages" in service && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">套餐定价</h4>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            添加套餐
                          </Button>
                        </div>
                        <div className="border rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-10" />
                                <TableHead>套餐名称</TableHead>
                                <TableHead>数量</TableHead>
                                <TableHead>价格</TableHead>
                                <TableHead>状态</TableHead>
                                <TableHead className="w-20">操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {service.packages.map((pkg) => (
                                <TableRow key={pkg.id}>
                                  <TableCell>
                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                  </TableCell>
                                  <TableCell className="font-medium">{pkg.name}</TableCell>
                                  <TableCell>
                                    {pkg.quantity} {pkg.unit}
                                  </TableCell>
                                  <TableCell className="font-mono">${pkg.price}</TableCell>
                                  <TableCell>
                                    <Switch defaultChecked />
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Pencil className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* 平台类型及价格系数 */}
                        {"platformTypes" in service && service.platformTypes && (
                          <div className="space-y-3 mt-6">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">平台类型（价格系数）</h4>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-1" />
                                添加类型
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {service.platformTypes.map((pt) => (
                                <div
                                  key={pt.id}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div>
                                    <span className="text-sm font-medium">{pt.name}</span>
                                    <span className="text-xs text-muted-foreground ml-2">
                                      ×{pt.priceMultiplier}
                                    </span>
                                  </div>
                                  <Switch defaultChecked={pt.enabled} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 平台×服务×质量 定价模式（社交媒体） */}
                    {service.pricingMode === "platform_service" && "priceMatrix" in service && (
                      <div className="space-y-4">
                        <Tabs defaultValue={service.platforms?.[0]?.id || "reddit"}>
                          <div className="flex items-center justify-between mb-4">
                            <TabsList>
                              {service.platforms?.map((p) => (
                                <TabsTrigger key={p.id} value={p.id} className="gap-2">
                                  <div
                                    className={cn(
                                      "w-5 h-5 rounded text-[10px] font-bold text-white flex items-center justify-center",
                                      p.color
                                    )}
                                  >
                                    {p.icon}
                                  </div>
                                  {p.name}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              添加价格
                            </Button>
                          </div>

                          {service.platforms?.map((platform) => (
                            <TabsContent key={platform.id} value={platform.id}>
                              <div className="border rounded-lg">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>服务类型</TableHead>
                                      <TableHead>质量等级</TableHead>
                                      <TableHead>单价</TableHead>
                                      <TableHead>数量范围</TableHead>
                                      <TableHead>交付时间</TableHead>
                                      <TableHead>状态</TableHead>
                                      <TableHead className="w-20">操作</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {service.priceMatrix
                                      ?.filter((p) => p.platform === platform.id)
                                      .map((price, idx) => (
                                        <TableRow key={idx}>
                                          <TableCell className="font-medium">
                                            {service.serviceTypes?.find((s) => s.id === price.serviceType)?.name}
                                          </TableCell>
                                          <TableCell>
                                            <Badge
                                              variant="outline"
                                              className={cn(
                                                price.quality === "elite" &&
                                                  "bg-amber-100 text-amber-700 border-amber-200",
                                                price.quality === "premium" &&
                                                  "bg-blue-100 text-blue-700 border-blue-200"
                                              )}
                                            >
                                              {service.qualityLevels?.find((q) => q.id === price.quality)?.name}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="font-mono">
                                            ${price.price}/{price.unit}
                                          </TableCell>
                                          <TableCell className="text-muted-foreground">
                                            {price.minQty}-{price.maxQty}
                                          </TableCell>
                                          <TableCell className="text-muted-foreground">
                                            {price.turnaround}
                                          </TableCell>
                                          <TableCell>
                                            <Switch defaultChecked />
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex items-center gap-1">
                                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Pencil className="h-3.5 w-3.5" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                              >
                                                <Trash2 className="h-3.5 w-3.5" />
                                              </Button>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    )}

                    {/* 单价×数量×平台 定价模式（GEO关键词） */}
                    {service.pricingMode === "unit_platform" && "unitPricing" in service && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="font-medium">单价配置</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(service.unitPricing || {}).map(([key, value]) => (
                              <div key={key} className="p-4 border rounded-lg">
                                <div className="text-sm text-muted-foreground">{value.label}</div>
                                <div className="text-2xl font-bold mt-1">
                                  ${value.pricePerUnit}
                                  <span className="text-sm font-normal text-muted-foreground">/个/平台</span>
                                </div>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Pencil className="h-3 w-3 mr-1" />
                                  修改
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {"platforms" in service && service.platforms && service.platforms.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">支持平台</h4>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-1" />
                                添加平台
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {service.platforms.map((p) => (
                                <div
                                  key={p.id}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div>
                                    <span className="text-sm font-medium">{p.name}</span>
                                    {"category" in p && (
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        {p.category === "en" ? "英文" : "中文"}
                                      </Badge>
                                    )}
                                  </div>
                                  <Switch defaultChecked={p.enabled} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 固定服务价格模式（GEO权威建设） */}
                    {service.pricingMode === "fixed_service" && "fixedServices" in service && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">服务项目</h4>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            添加服务
                          </Button>
                        </div>
                        <div className="border rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>服务名称</TableHead>
                                <TableHead>价格</TableHead>
                                <TableHead>交付时间</TableHead>
                                <TableHead>推荐</TableHead>
                                <TableHead>状态</TableHead>
                                <TableHead className="w-20">操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {service.fixedServices?.map((fs) => (
                                <TableRow key={fs.id}>
                                  <TableCell className="font-medium">{fs.name}</TableCell>
                                  <TableCell className="font-mono">
                                    ${fs.price}/{fs.unit}
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">
                                    {fs.turnaround}
                                  </TableCell>
                                  <TableCell>
                                    {fs.popular && (
                                      <Badge className="bg-amber-100 text-amber-700">热门</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Switch defaultChecked />
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Pencil className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}

                    {/* 媒体单选定价模式（发稿服务） */}
                    {service.pricingMode === "media_select" && "mediaCount" in service && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-4 border rounded-lg">
                            <div className="text-sm text-muted-foreground">已配置媒体</div>
                            <div className="text-2xl font-bold mt-1">{service.mediaCount}</div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="text-sm text-muted-foreground">价格范围</div>
                            <div className="text-2xl font-bold mt-1">
                              ${service.priceRange?.min}-${service.priceRange?.max}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">筛选维度</h4>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              添加维度
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {service.filters?.map((filter) => (
                              <div key={filter.id} className="p-3 border rounded-lg">
                                <div className="font-medium text-sm">{filter.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {filter.options.length} 个选项
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            媒体资源在
                            <Button variant="link" className="px-1 h-auto" asChild>
                              <a href="/admin/resources/pr/news">发稿资源库</a>
                            </Button>
                            中管理，每个媒体单独定价
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

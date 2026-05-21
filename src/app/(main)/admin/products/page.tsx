"use client";

import { useState } from "react";

import {
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
  Share2,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// 服务类型配置
const serviceCategories = [
  { id: "seo", name: "SEO 服务", icon: Link2, color: "bg-blue-500" },
  { id: "geo", name: "GEO 服务", icon: Globe, color: "bg-green-500" },
  { id: "social", name: "社交媒体", icon: Share2, color: "bg-purple-500" },
  { id: "pr", name: "发稿服务", icon: Newspaper, color: "bg-orange-500" },
];

// 模拟服务数据
const mockServices = [
  {
    id: "seo-backlink",
    category: "seo",
    name: "外链代发",
    slug: "backlink",
    description: "通过高质量外链提升网站权重，获得更多自然流量",
    status: "active",
    sortOrder: 1,
    packages: [
      { id: "p1", name: "入门版", quantity: 10, unit: "条外链", price: 5, status: "active" },
      { id: "p2", name: "成长版", quantity: 50, unit: "条外链", price: 20, status: "active" },
      { id: "p3", name: "专业版", quantity: 100, unit: "条外链", price: 50, status: "active" },
      { id: "p4", name: "企业版", quantity: 500, unit: "条外链", price: 120, status: "active" },
    ],
    platformTypes: [
      { id: "blog", name: "博客", enabled: true },
      { id: "forum", name: "论坛", enabled: true },
      { id: "news", name: "新闻站", enabled: true },
      { id: "social", name: "社交媒体", enabled: true },
      { id: "directory", name: "目录站", enabled: true },
      { id: "wiki", name: "维基百科", enabled: true },
      { id: "profile", name: "个人资料链接", enabled: true },
      { id: "custom", name: "定制", enabled: true },
    ],
    formFields: [
      { id: "targetUrl", label: "目标 URL", type: "url", required: true },
      { id: "keywords", label: "目标关键词", type: "tags", required: true },
      { id: "anchorText", label: "锚文本", type: "tags", required: false },
    ],
  },
  {
    id: "seo-guest-post",
    category: "seo",
    name: "客座文章",
    slug: "guest-post",
    description: "在高权重媒体发布品牌文章，提升品牌曝光和权威性",
    status: "active",
    sortOrder: 2,
    packages: [
      { id: "p1", name: "3媒体套餐", quantity: 3, unit: "篇文章", price: 299, status: "active" },
      { id: "p2", name: "5媒体套餐", quantity: 5, unit: "篇文章", price: 449, status: "active" },
      { id: "p3", name: "10媒体套餐", quantity: 10, unit: "篇文章", price: 799, status: "active" },
    ],
    platformTypes: [
      { id: "tech", name: "科技媒体", enabled: true },
      { id: "business", name: "商业媒体", enabled: true },
      { id: "lifestyle", name: "生活方式", enabled: true },
      { id: "industry", name: "行业垂直", enabled: true },
    ],
    formFields: [
      { id: "targetUrl", label: "目标 URL", type: "url", required: true },
      { id: "keywords", label: "目标关键词", type: "tags", required: true },
      { id: "articleTopic", label: "文章主题", type: "textarea", required: false },
    ],
  },
  {
    id: "geo-keyword",
    category: "geo",
    name: "关键词优化",
    slug: "keyword",
    description: "优化品牌在 AI 搜索引擎中的关键词排名",
    status: "active",
    sortOrder: 1,
    packages: [
      { id: "p1", name: "3关键词", quantity: 3, unit: "个关键词", price: 199, status: "active" },
      { id: "p2", name: "5关键词", quantity: 5, unit: "个关键词", price: 299, status: "active" },
      { id: "p3", name: "10关键词", quantity: 10, unit: "个关键词", price: 499, status: "active" },
    ],
    platformTypes: [
      { id: "chatgpt", name: "ChatGPT", enabled: true },
      { id: "perplexity", name: "Perplexity", enabled: true },
      { id: "claude", name: "Claude", enabled: true },
      { id: "gemini", name: "Gemini", enabled: true },
    ],
    formFields: [
      { id: "brandName", label: "品牌名称", type: "text", required: true },
      { id: "keywords", label: "目标关键词", type: "tags", required: true },
      { id: "competitors", label: "竞品品牌", type: "tags", required: false },
    ],
  },
  {
    id: "social-reddit",
    category: "social",
    name: "Reddit 推广",
    slug: "reddit",
    description: "在 Reddit 社区进行品牌推广和口碑营销",
    status: "active",
    sortOrder: 1,
    packages: [
      { id: "p1", name: "10帖子", quantity: 10, unit: "条帖子", price: 99, status: "active" },
      { id: "p2", name: "30帖子", quantity: 30, unit: "条帖子", price: 249, status: "active" },
      { id: "p3", name: "50帖子", quantity: 50, unit: "条帖子", price: 399, status: "active" },
    ],
    platformTypes: [
      { id: "post", name: "发帖", enabled: true },
      { id: "comment", name: "评论", enabled: true },
      { id: "upvote", name: "点赞", enabled: true },
    ],
    formFields: [
      { id: "targetUrl", label: "推广链接", type: "url", required: true },
      { id: "subreddits", label: "目标社区", type: "tags", required: false },
      { id: "description", label: "产品描述", type: "textarea", required: true },
    ],
  },
  {
    id: "pr-news",
    category: "pr",
    name: "新闻稿发布",
    slug: "press-release",
    description: "在主流新闻媒体发布企业新闻稿",
    status: "active",
    sortOrder: 1,
    packages: [
      { id: "p1", name: "基础版", quantity: 5, unit: "家媒体", price: 299, status: "active" },
      { id: "p2", name: "标准版", quantity: 15, unit: "家媒体", price: 599, status: "active" },
      { id: "p3", name: "高级版", quantity: 30, unit: "家媒体", price: 999, status: "active" },
    ],
    platformTypes: [
      { id: "portal", name: "门户网站", enabled: true },
      { id: "news", name: "新闻网站", enabled: true },
      { id: "finance", name: "财经媒体", enabled: true },
      { id: "tech", name: "科技媒体", enabled: true },
    ],
    formFields: [
      { id: "title", label: "新闻标题", type: "text", required: true },
      { id: "content", label: "新闻内容", type: "richtext", required: true },
      { id: "contactInfo", label: "联系方式", type: "text", required: false },
    ],
  },
];

export default function ProductsPage() {
  const [services, setServices] = useState(mockServices);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [editingService, setEditingService] = useState<(typeof mockServices)[0] | null>(null);
  const [editingPackage, setEditingPackage] = useState<{
    serviceId: string;
    package: (typeof mockServices)[0]["packages"][0] | null;
  }>({ serviceId: "", package: null });

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((s) => s.category === selectedCategory);

  const getCategoryInfo = (categoryId: string) => {
    return serviceCategories.find((c) => c.id === categoryId);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">产品管理</h1>
          <p className="text-muted-foreground mt-1">管理服务产品、套餐定价和表单配置</p>
        </div>
        <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="h-4 w-4 mr-2" />
              添加服务
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? "编辑服务" : "添加服务"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>服务类别</Label>
                  <Select defaultValue={editingService?.category || "seo"}>
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
                  <Label>URL 别名</Label>
                  <Input placeholder="backlink" defaultValue={editingService?.slug} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>服务名称</Label>
                <Input placeholder="外链代发" defaultValue={editingService?.name} />
              </div>
              <div className="space-y-2">
                <Label>服务描述</Label>
                <Textarea placeholder="描述服务的核心价值..." defaultValue={editingService?.description} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>启用服务</Label>
                  <p className="text-sm text-muted-foreground">关闭后用户将无法购买此服务</p>
                </div>
                <Switch defaultChecked={editingService?.status === "active"} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowServiceDialog(false)}>
                取消
              </Button>
              <Button onClick={() => setShowServiceDialog(false)}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 分类筛选 */}
      <div className="flex items-center gap-2">
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

          return (
            <Card key={service.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg ${categoryInfo?.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {categoryInfo?.name}
                        </Badge>
                        {service.status === "active" ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            已启用
                          </Badge>
                        ) : (
                          <Badge variant="secondary">已停用</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{service.description}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingService(service);
                          setShowServiceDialog(true);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        编辑服务
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        复制服务
                      </DropdownMenuItem>
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
              <CardContent>
                <Tabs defaultValue="packages" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="packages">套餐定价</TabsTrigger>
                    <TabsTrigger value="platforms">平台类型</TabsTrigger>
                    <TabsTrigger value="fields">表单字段</TabsTrigger>
                  </TabsList>

                  {/* 套餐定价 */}
                  <TabsContent value="packages">
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
                                <Switch defaultChecked={pkg.status === "active"} />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      setEditingPackage({ serviceId: service.id, package: pkg });
                                      setShowPackageDialog(true);
                                    }}
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="p-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPackage({ serviceId: service.id, package: null });
                            setShowPackageDialog(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          添加套餐
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 平台类型 */}
                  <TabsContent value="platforms">
                    <div className="border rounded-lg p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {service.platformTypes.map((platform) => (
                          <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm">{platform.name}</span>
                            <Switch defaultChecked={platform.enabled} />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          添加平台类型
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 表单字段 */}
                  <TabsContent value="fields">
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-10" />
                            <TableHead>字段标签</TableHead>
                            <TableHead>字段类型</TableHead>
                            <TableHead>必填</TableHead>
                            <TableHead className="w-20">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {service.formFields.map((field) => (
                            <TableRow key={field.id}>
                              <TableCell>
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                              </TableCell>
                              <TableCell className="font-medium">{field.label}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {field.type === "url" && "URL 链接"}
                                  {field.type === "text" && "单行文本"}
                                  {field.type === "tags" && "标签输入"}
                                  {field.type === "textarea" && "多行文本"}
                                  {field.type === "richtext" && "富文本"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Switch defaultChecked={field.required} />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="p-3 border-t">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          添加字段
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 套餐编辑弹窗 */}
      <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPackage.package ? "编辑套餐" : "添加套餐"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>套餐名称</Label>
              <Input placeholder="入门版" defaultValue={editingPackage.package?.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>数量</Label>
                <Input type="number" placeholder="10" defaultValue={editingPackage.package?.quantity} />
              </div>
              <div className="space-y-2">
                <Label>单位</Label>
                <Input placeholder="条外链" defaultValue={editingPackage.package?.unit} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>价格 (USD)</Label>
              <Input type="number" placeholder="5" defaultValue={editingPackage.package?.price} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>启用套餐</Label>
                <p className="text-sm text-muted-foreground">关闭后用户将无法选择此套餐</p>
              </div>
              <Switch defaultChecked={editingPackage.package?.status === "active"} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPackageDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowPackageDialog(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

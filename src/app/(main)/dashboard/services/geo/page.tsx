"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Globe,
  Search,
  FileText,
  Award,
  Check,
  ArrowRight,
  Loader2,
  Sparkles,
  Plus,
  X,
  ChevronRight,
  AlertCircle,
  Percent,
} from "lucide-react";
import {
  aiPlatforms,
  keywordPackages,
  pagePackages,
  authorityServices,
  serviceTypeLabels,
  serviceTypeDescriptions,
  calculateKeywordPrice,
  calculatePagePrice,
  type ServiceType,
  type AiPlatform,
} from "@/data/geo-service";
import { cn } from "@/lib/utils";

const serviceTypeIcons: Record<ServiceType, React.ReactNode> = {
  keyword: <Search className="h-5 w-5" />,
  page: <FileText className="h-5 w-5" />,
  authority: <Award className="h-5 w-5" />,
};

export default function GeoOptimizationPage() {
  const router = useRouter();
  
  // 服务类型选择
  const [serviceType, setServiceType] = useState<ServiceType>("keyword");
  
  // AI 平台选择（多选）
  const [selectedPlatforms, setSelectedPlatforms] = useState<AiPlatform[]>([]);
  
  // 关键词相关
  const [selectedKeywordPackage, setSelectedKeywordPackage] = useState<string>("growth");
  const [keywords, setKeywords] = useState<string[]>([""]);
  
  // 页面相关
  const [selectedPagePackage, setSelectedPagePackage] = useState<string>("standard");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [pageUrls, setPageUrls] = useState("");
  
  // 权威建设
  const [selectedAuthorityService, setSelectedAuthorityService] = useState<string>("");
  
  // 通用
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 切换平台选择
  const togglePlatform = (platform: AiPlatform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // 添加关键词输入框
  const addKeywordInput = () => {
    const pkg = keywordPackages.find(p => p.id === selectedKeywordPackage);
    if (pkg && keywords.length < pkg.keywords) {
      setKeywords([...keywords, ""]);
    }
  };

  // 移除关键词输入框
  const removeKeywordInput = (index: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  // 更新关键词
  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  // 计算价格
  const totalPrice = useMemo(() => {
    if (serviceType === "keyword") {
      return calculateKeywordPrice(selectedKeywordPackage, Math.max(1, selectedPlatforms.length));
    } else if (serviceType === "page") {
      return calculatePagePrice(selectedPagePackage);
    } else if (serviceType === "authority") {
      const service = authorityServices.find(s => s.id === selectedAuthorityService);
      return service?.price || 0;
    }
    return 0;
  }, [serviceType, selectedKeywordPackage, selectedPagePackage, selectedAuthorityService, selectedPlatforms]);

  // 获取当前选中的套餐信息
  const currentKeywordPackage = keywordPackages.find(p => p.id === selectedKeywordPackage);
  const currentPagePackage = pagePackages.find(p => p.id === selectedPagePackage);
  const currentAuthorityService = authorityServices.find(s => s.id === selectedAuthorityService);

  // 检查表单是否完整
  const isFormValid = useMemo(() => {
    if (serviceType === "keyword") {
      return selectedPlatforms.length > 0 && keywords.some(k => k.trim());
    } else if (serviceType === "page") {
      return websiteUrl.trim() !== "";
    } else if (serviceType === "authority") {
      return selectedAuthorityService !== "" && websiteUrl.trim() !== "";
    }
    return false;
  }, [serviceType, selectedPlatforms, keywords, websiteUrl, selectedAuthorityService]);

  // 提交任务
  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard/tasks");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            GEO 优化服务
          </h1>
          <p className="text-muted-foreground mt-1">
            让你的品牌在 AI 搜索结果中排名更靠前
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard" className="gap-2">
            <Sparkles className="h-4 w-4" />
            免费诊断
          </Link>
        </Button>
      </div>

      {/* 流程指示 */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</div>
              <span className="text-sm">免费诊断</span>
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
              <span className="text-sm font-medium">选择优化服务</span>
            </div>
            <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-bold">3</div>
              <span className="text-sm text-muted-foreground">我们执行优化</span>
            </div>
            <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-bold">4</div>
              <span className="text-sm text-muted-foreground">排名提升</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧：选择区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: 选择服务类型 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                选择服务类型
              </CardTitle>
              <CardDescription>选择你需要的优化方式</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(serviceTypeLabels) as ServiceType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setServiceType(type)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                      serviceType === type
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        serviceType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {serviceTypeIcons[type]}
                    </div>
                    <span className="font-medium text-sm text-center">{serviceTypeLabels[type]}</span>
                    {serviceType === type && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {serviceTypeDescriptions[serviceType]}
              </p>
            </CardContent>
          </Card>

          {/* Step 2: 关键词优化 - 选择AI平台 */}
          {serviceType === "keyword" && (
            <>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                    选择目标 AI 平台
                  </CardTitle>
                  <CardDescription>选择你想要优化排名的 AI 平台（可多选）</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {aiPlatforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={cn(
                          "relative flex flex-col items-start p-3 rounded-lg border-2 transition-all text-left",
                          selectedPlatforms.includes(platform.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Checkbox 
                            checked={selectedPlatforms.includes(platform.id)}
                            className="pointer-events-none"
                          />
                          <span className="font-medium text-sm">{platform.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {platform.description}
                        </p>
                      </button>
                    ))}
                  </div>
                  {selectedPlatforms.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      已选择 <span className="font-medium text-foreground">{selectedPlatforms.length}</span> 个平台，
                      每增加一个平台，关键词价格 x 平台数量
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Step 3: 输入关键词 */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                    输入要优化的关键词
                  </CardTitle>
                  <CardDescription>
                    最多可输入 {currentKeywordPackage?.keywords || 0} 个关键词
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                      <Input
                        placeholder={`例如：AI 写作工具、最好的 CRM 软件...`}
                        value={keyword}
                        onChange={(e) => updateKeyword(index, e.target.value)}
                        className="flex-1"
                      />
                      {keywords.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKeywordInput(index)}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {currentKeywordPackage && keywords.length < currentKeywordPackage.keywords && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addKeywordInput}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      添加关键词
                    </Button>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* 页面优化 */}
          {serviceType === "page" && (
            <>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                    填写网站信息
                  </CardTitle>
                  <CardDescription>告诉我们你的网站和需要优化的页面</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>网站地址 <span className="text-destructive">*</span></Label>
                    <Input
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>需要优化的页面 URL（可选）</Label>
                    <Textarea
                      placeholder={`每行一个 URL，最多 ${currentPagePackage?.pages || 0} 个页面，例如：\nhttps://example.com/about\nhttps://example.com/products`}
                      value={pageUrls}
                      onChange={(e) => setPageUrls(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      留空则由我们根据诊断报告确定优先级页面
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* 权威建设 */}
          {serviceType === "authority" && (
            <>
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                    选择服务项目
                  </CardTitle>
                  <CardDescription>选择你需要的权威建设服务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {authorityServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedAuthorityService(service.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg border-2 transition-all",
                        selectedAuthorityService === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                            selectedAuthorityService === service.id ? "border-primary" : "border-muted-foreground/30"
                          )}>
                            {selectedAuthorityService === service.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{service.name}</span>
                              {service.popular && (
                                <Badge variant="secondary" className="text-xs">热门</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-primary">¥{service.price}</div>
                          <div className="text-xs text-muted-foreground">/{service.unit}</div>
                        </div>
                      </div>
                      
                      {selectedAuthorityService === service.id && (
                        <div className="mt-4 pt-4 border-t pl-8">
                          <div className="text-xs font-medium text-muted-foreground mb-2">服务内容</div>
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground">
                            交付周期：{service.turnaround}
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>

              {selectedAuthorityService && (
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                      填写网站信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>网站地址 <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* 补充说明 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">补充说明（可选）</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="描述你的优化目标、竞争对手、特殊需求或其他备注..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* 右侧：套餐选择 + 订单汇总 */}
        <div className="space-y-6">
          {/* 关键词套餐选择 */}
          {serviceType === "keyword" && (
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">选择套餐</CardTitle>
                <CardDescription>套餐越大，单价越低</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {keywordPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      setSelectedKeywordPackage(pkg.id);
                      if (keywords.length > pkg.keywords) {
                        setKeywords(keywords.slice(0, pkg.keywords));
                      }
                    }}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all",
                      selectedKeywordPackage === pkg.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                          selectedKeywordPackage === pkg.id ? "border-primary" : "border-muted-foreground/30"
                        )}>
                          {selectedKeywordPackage === pkg.id && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-medium text-sm">{pkg.name}</span>
                            {pkg.popular && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">热门</Badge>
                            )}
                            {pkg.discount > 0 && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-0.5">
                                <Percent className="h-2.5 w-2.5" />
                                {pkg.discount}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{pkg.keywords} 个关键词</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-primary text-sm">¥{pkg.pricePerKeyword}</div>
                        <div className="text-[10px] text-muted-foreground">/词/平台</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* 页面套餐选择 */}
          {serviceType === "page" && (
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">选择套餐</CardTitle>
                <CardDescription>套餐越大，单价越低</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {pagePackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPagePackage(pkg.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all",
                      selectedPagePackage === pkg.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                          selectedPagePackage === pkg.id ? "border-primary" : "border-muted-foreground/30"
                        )}>
                          {selectedPagePackage === pkg.id && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-medium text-sm">{pkg.name}</span>
                            {pkg.popular && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">热门</Badge>
                            )}
                            {pkg.discount > 0 && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-0.5">
                                <Percent className="h-2.5 w-2.5" />
                                {pkg.discount}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{pkg.pages} 个页面</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-primary text-sm">¥{pkg.pricePerPage}</div>
                        <div className="text-[10px] text-muted-foreground">/页</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* 订单汇总 */}
          {isFormValid ? (
            <>
              <Card className="border-primary sticky top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">订单汇总</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">服务类型</span>
                      <span>{serviceTypeLabels[serviceType]}</span>
                    </div>
                    
                    {serviceType === "keyword" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">目标平台</span>
                          <span>{selectedPlatforms.length} 个</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">套餐</span>
                          <span>{currentKeywordPackage?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">关键词数量</span>
                          <span>{currentKeywordPackage?.keywords} 个</span>
                        </div>
                        {(currentKeywordPackage?.discount || 0) > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>套餐优惠</span>
                            <span>-{currentKeywordPackage?.discount}%</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {serviceType === "page" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">套餐</span>
                          <span>{currentPagePackage?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">页面数量</span>
                          <span>{currentPagePackage?.pages} 页</span>
                        </div>
                        {(currentPagePackage?.discount || 0) > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>套餐优惠</span>
                            <span>-{currentPagePackage?.discount}%</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {serviceType === "authority" && currentAuthorityService && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">服务项目</span>
                          <span className="text-right max-w-[150px]">{currentAuthorityService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">交付周期</span>
                          <span>{currentAuthorityService.turnaround}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">总计</span>
                      <span className="text-2xl font-bold text-primary">
                        ¥{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        提交中...
                      </>
                    ) : (
                      <>
                        立即下单
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    下单后 1 个工作日内开始执行
                  </p>
                </CardContent>
              </Card>

              {/* 服务保障 */}
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>效果不达标可退款</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>专业团队人工执行</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>排名效果可追踪</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  {serviceType === "keyword" && "请选择 AI 平台并输入关键词"}
                  {serviceType === "page" && "请输入网站地址"}
                  {serviceType === "authority" && "请选择服务并输入网站地址"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  Building2,
  Users,
  Target,
  BarChart3,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Search,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 诊断步骤
const steps = [
  { id: 1, title: "输入网站", icon: Globe, description: "输入你的网站地址" },
  { id: 2, title: "AI 分析", icon: Search, description: "智能分析网站信息" },
  { id: 3, title: "业务画像", icon: Building2, description: "确认业务信息" },
  { id: 4, title: "竞争分析", icon: Target, description: "竞品与市场分析" },
  { id: 5, title: "AI 可见性", icon: BarChart3, description: "各平台引用检测" },
  { id: 6, title: "优化建议", icon: Sparkles, description: "关键词和问答建议" },
];

// AI 平台
const aiPlatforms = [
  { id: "chatgpt", name: "ChatGPT", category: "en", icon: "🤖" },
  { id: "perplexity", name: "Perplexity", category: "en", icon: "🔍" },
  { id: "gemini", name: "Gemini", category: "en", icon: "✨" },
  { id: "claude", name: "Claude", category: "en", icon: "🎭" },
  { id: "deepseek", name: "DeepSeek", category: "zh", icon: "🌊" },
  { id: "doubao", name: "豆包", category: "zh", icon: "🎒" },
  { id: "tongyi", name: "通义千问", category: "zh", icon: "💬" },
  { id: "wenxin", name: "文心一言", category: "zh", icon: "📝" },
  { id: "kimi", name: "Kimi", category: "zh", icon: "🌙" },
  { id: "yuanbao", name: "元宝", category: "zh", icon: "💎" },
];

export default function DiagnosePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [analyzeStatus, setAnalyzeStatus] = useState("");
  const [initialized, setInitialized] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState({
    // 步骤1: 网站地址
    domain: "",
    
    // 步骤2-3: AI分析结果
    brandName: "",
    language: "",
    country: "",
    industry: "",
    businessModel: "",
    coreProducts: "",
    targetCustomers: "",
    
    // 步骤4: 竞争分析
    competitors: [] as { name: string; domain: string; strength: string }[],
    marketPosition: "",
    
    // 步骤5: AI引用率检测结果
    aiVisibilityScore: 0,
    platformResults: {} as Record<string, { found: boolean; mentions: number; sentiment: string }>,
    
    // 步骤6: 优化建议
    suggestedKeywords: [] as string[],
    suggestedLongTails: [] as string[],
    suggestedQueries: [] as string[],
    selectedKeywords: [] as string[],
    selectedLongTails: [] as string[],
    selectedQueries: [] as string[],
    recommendedPlatforms: [] as string[],
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (field: keyof typeof formData, item: string) => {
    const arr = formData[field] as string[];
    const updated = arr.includes(item)
      ? arr.filter(i => i !== item)
      : [...arr, item];
    updateFormData({ [field]: updated });
  };

  // 页面加载时检查URL参数，如果有url则直接开始分析
  useEffect(() => {
    if (initialized) return;
    
    const urlParam = searchParams.get('url');
    if (urlParam) {
      const decodedUrl = decodeURIComponent(urlParam);
      setFormData(prev => ({ ...prev, domain: decodedUrl }));
      setInitialized(true);
      // 直接跳到第2步并开始分析
      setCurrentStep(2);
      // 延迟一下再开始分析，确保状态更新
      setTimeout(() => {
        startAnalysis(decodedUrl);
      }, 100);
    } else {
      setInitialized(true);
    }
  }, [searchParams, initialized]);

  // 开始分析（抽出来方便复用）
  const startAnalysis = async (domain: string) => {
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    
    // 阶段1: 抓取网站
    setAnalyzeStatus("正在抓取网站内容...");
    await new Promise(r => setTimeout(r, 800));
    setAnalyzeProgress(15);
    
    // 阶段2: 分析语言和地区
    setAnalyzeStatus("识别语言和目标市场...");
    await new Promise(r => setTimeout(r, 600));
    setAnalyzeProgress(30);
    
    // 阶段3: 分析业务
    setAnalyzeStatus("分析业务类型和产品...");
    await new Promise(r => setTimeout(r, 800));
    setAnalyzeProgress(50);
    
    // 阶段4: 识别竞争对手
    setAnalyzeStatus("识别竞争对手...");
    await new Promise(r => setTimeout(r, 700));
    setAnalyzeProgress(70);
    
    // 阶段5: 检测AI平台引用
    setAnalyzeStatus("检测各AI平台引用情况...");
    await new Promise(r => setTimeout(r, 1000));
    setAnalyzeProgress(90);
    
    // 阶段6: 生成建议
    setAnalyzeStatus("生成优化建议...");
    await new Promise(r => setTimeout(r, 600));
    setAnalyzeProgress(100);
    
    // 模拟生成分析结果
    const domainName = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    const brandGuess = domainName.split('.')[0];
    const isChineseSite = Math.random() > 0.5;
    
    // 模拟 AI 平台检测结果
    const platformResults: Record<string, { found: boolean; mentions: number; sentiment: string }> = {};
    aiPlatforms.forEach(p => {
      const found = Math.random() > 0.6;
      platformResults[p.id] = {
        found,
        mentions: found ? Math.floor(Math.random() * 10) + 1 : 0,
        sentiment: found ? (Math.random() > 0.3 ? "positive" : "neutral") : "none"
      };
    });

    // 计算可见性得分
    const foundCount = Object.values(platformResults).filter(r => r.found).length;
    const visibilityScore = Math.round((foundCount / aiPlatforms.length) * 100);

    // 生成推荐关键词
    const keywordSuggestions = [
      `${brandGuess}`,
      `${brandGuess}怎么样`,
      `${brandGuess}好不好`,
      `${brandGuess}推荐`,
      `${brandGuess}替代品`,
    ];

    const longTailSuggestions = [
      `${brandGuess}哪个版本好`,
      `${brandGuess}新手入门`,
      `${brandGuess}高级技巧`,
      `${brandGuess}常见问题`,
      `${brandGuess}使用教程`,
    ];

    const querySuggestions = [
      `${brandGuess}和竞品相比有什么优势？`,
      `${brandGuess}适合什么样的用户？`,
      `如何快速上手${brandGuess}？`,
      `${brandGuess}的核心功能有哪些？`,
      `${brandGuess}的价格是多少？`,
    ];

    // 更新表单数据
    updateFormData({
      brandName: brandGuess.charAt(0).toUpperCase() + brandGuess.slice(1),
      language: isChineseSite ? "中文" : "英文",
      country: isChineseSite ? "中国" : "全球",
      industry: "互联网/科技",
      businessModel: "SaaS/软件服务",
      coreProducts: `${brandGuess}平台、${brandGuess}服务`,
      targetCustomers: isChineseSite ? "中国企业用户" : "全球企业用户",
      competitors: [
        { name: "竞品A", domain: "competitor-a.com", strength: "市场份额大" },
        { name: "竞品B", domain: "competitor-b.cn", strength: "价格优势" },
        { name: "竞品C", domain: "competitor-c.com", strength: "技术领先" },
      ],
      marketPosition: "行业中游，有一定知名度但AI可见性待提升",
      aiVisibilityScore: visibilityScore,
      platformResults,
      suggestedKeywords: keywordSuggestions,
      suggestedLongTails: longTailSuggestions,
      suggestedQueries: querySuggestions,
      selectedKeywords: keywordSuggestions.slice(0, 3),
      selectedLongTails: longTailSuggestions.slice(0, 3),
      selectedQueries: querySuggestions.slice(0, 3),
      recommendedPlatforms: isChineseSite 
        ? ["deepseek", "doubao", "tongyi", "wenxin"]
        : ["chatgpt", "perplexity", "gemini", "claude"],
    });

    setIsAnalyzing(false);
    setCurrentStep(3);
  };

  // 模拟 AI 分析网站（从步骤1进入时使用）
  const analyzeWebsite = async () => {
    await startAnalysis(formData.domain);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      analyzeWebsite();
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1 && currentStep !== 2) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const diagnosisResult = {
      keywords: formData.selectedKeywords,
      longTails: formData.selectedLongTails,
      queries: formData.selectedQueries,
      brandName: formData.brandName,
      domain: formData.domain,
      platforms: formData.recommendedPlatforms,
    };
    localStorage.setItem('geo_diagnosis_result', JSON.stringify(diagnosisResult));
    router.push('/dashboard/services/geo');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.domain.trim() !== '';
      case 2:
        return !isAnalyzing;
      case 6:
        return formData.selectedKeywords.length > 0;
      default:
        return true;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* 顶部进度 */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold">GEO 智能诊断</h1>
              <p className="text-sm text-muted-foreground">
                AI 自动分析你的网站，生成优化建议
              </p>
            </div>
            <Badge variant="outline">
              {currentStep} / {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      {/* 步骤指示器 */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isActive && "bg-primary text-primary-foreground",
                      isCompleted && "bg-primary/20 text-primary",
                      !isActive && !isCompleted && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 hidden sm:block whitespace-nowrap",
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-8 lg:w-16 h-0.5 mx-1 lg:mx-2",
                    isCompleted ? "bg-primary/40" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* 步骤内容 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = steps[currentStep - 1].icon;
                return <Icon className="h-5 w-5 text-primary" />;
              })()}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 步骤1: 输入网站 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="max-w-lg">
                  <div className="space-y-2">
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="输入你的网站地址，如 example.com"
                        value={formData.domain}
                        onChange={e => updateFormData({ domain: e.target.value })}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI 将自动分析你的网站，识别语言、市场、业务类型等信息
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="text-sm font-medium">诊断将包含：</div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      自动识别网站语言和目标市场
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      分析业务类型和核心产品
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      识别主要竞争对手
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      检测 10+ AI 平台引用情况
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      生成关键词优化建议
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      推荐长尾词和问答覆盖
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤2: AI 分析中 */}
            {currentStep === 2 && (
              <div className="py-12 text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-muted" />
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                    style={{ animationDuration: '1s' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analyzeProgress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium">{analyzeStatus}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    正在分析 {formData.domain}
                  </p>
                </div>
                <Progress value={analyzeProgress} className="max-w-md mx-auto" />
              </div>
            )}

            {/* 步骤3: 业务画像确认 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">AI 分析完成</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    以下是我们对你网站的分析结果，请确认或修改
                  </p>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">品牌名称</div>
                    <div className="font-medium">{formData.brandName}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">网站语言</div>
                    <div className="font-medium">{formData.language}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">目标市场</div>
                    <div className="font-medium">{formData.country}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">行业类型</div>
                    <div className="font-medium">{formData.industry}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">业务模式</div>
                    <div className="font-medium">{formData.businessModel}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">目标客户</div>
                    <div className="font-medium">{formData.targetCustomers}</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">核心产品/服务</div>
                  <div className="font-medium">{formData.coreProducts}</div>
                </div>
              </div>
            )}

            {/* 步骤4: 竞争分析 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-3">识别到的主要竞争对手</div>
                  <div className="space-y-2">
                    {formData.competitors.map((competitor, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{competitor.name}</div>
                            <div className="text-xs text-muted-foreground">{competitor.domain}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{competitor.strength}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">市场定位分析</div>
                  <div className="p-4 rounded-lg bg-muted/50 text-sm">
                    {formData.marketPosition}
                  </div>
                </div>
              </div>
            )}

            {/* 步骤5: AI 可见性 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <div className="text-sm text-muted-foreground">AI 可见性综合得分</div>
                    <div className="text-3xl font-bold mt-1">
                      {formData.aiVisibilityScore}
                      <span className="text-lg text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    formData.aiVisibilityScore >= 70 ? "bg-green-100 text-green-700" :
                    formData.aiVisibilityScore >= 40 ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {formData.aiVisibilityScore >= 70 ? "良好" :
                     formData.aiVisibilityScore >= 40 ? "一般" : "待优化"}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-3">各平台检测结果</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {aiPlatforms.map(platform => {
                      const result = formData.platformResults[platform.id];
                      if (!result) return null;
                      
                      return (
                        <div 
                          key={platform.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border",
                            result.found ? "bg-green-50 border-green-200" : "bg-muted/30"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>{platform.icon}</span>
                            <span className="font-medium text-sm">{platform.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {result.found ? (
                              <>
                                <span className="text-xs text-muted-foreground">
                                  {result.mentions} 次引用
                                </span>
                                {result.sentiment === "positive" && <TrendingUp className="h-4 w-4 text-green-600" />}
                                {result.sentiment === "neutral" && <Minus className="h-4 w-4 text-yellow-600" />}
                                {result.sentiment === "negative" && <TrendingDown className="h-4 w-4 text-red-600" />}
                              </>
                            ) : (
                              <Badge variant="outline" className="text-xs">未收录</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {formData.recommendedPlatforms.length > 0 && (
                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="text-sm font-medium text-orange-800 mb-1">
                      建议重点优化的平台
                    </div>
                    <p className="text-sm text-orange-700">
                      {formData.recommendedPlatforms.map(id => 
                        aiPlatforms.find(p => p.id === id)?.name
                      ).filter(Boolean).join('、')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 步骤6: 优化建议 */}
            {currentStep === 6 && (
              <div className="space-y-6">
                {/* 关键词建议 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">推荐关键词</div>
                    <span className="text-xs text-muted-foreground">
                      已选 {formData.selectedKeywords.length} 个
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.suggestedKeywords.map((keyword, index) => (
                      <label
                        key={index}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all text-sm",
                          formData.selectedKeywords.includes(keyword)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox
                          checked={formData.selectedKeywords.includes(keyword)}
                          onCheckedChange={() => toggleArrayItem('selectedKeywords', keyword)}
                          className="h-3.5 w-3.5"
                        />
                        {keyword}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 长尾词建议 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">长尾关键词</div>
                    <span className="text-xs text-muted-foreground">
                      已选 {formData.selectedLongTails.length} 个
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.suggestedLongTails.map((keyword, index) => (
                      <label
                        key={index}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all text-sm",
                          formData.selectedLongTails.includes(keyword)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox
                          checked={formData.selectedLongTails.includes(keyword)}
                          onCheckedChange={() => toggleArrayItem('selectedLongTails', keyword)}
                          className="h-3.5 w-3.5"
                        />
                        {keyword}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 问答建议 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">问答覆盖建议</div>
                    <span className="text-xs text-muted-foreground">
                      已选 {formData.selectedQueries.length} 个
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {formData.suggestedQueries.map((query, index) => (
                      <label
                        key={index}
                        className={cn(
                          "flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-all text-sm",
                          formData.selectedQueries.includes(query)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox
                          checked={formData.selectedQueries.includes(query)}
                          onCheckedChange={() => toggleArrayItem('selectedQueries', query)}
                          className="h-4 w-4"
                        />
                        {query}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部按钮 */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || currentStep === 2}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            上一步
          </Button>
          
          {currentStep < 6 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed() || isAnalyzing}
            >
              {currentStep === 1 ? "开始诊断" : "下一步"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              应用建议并创建任务
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

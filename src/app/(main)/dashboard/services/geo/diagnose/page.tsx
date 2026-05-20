"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 诊断步骤
const steps = [
  { id: 1, title: "基本信息", icon: Globe, description: "网站和品牌信息" },
  { id: 2, title: "业务类型", icon: Building2, description: "行业和业务模式" },
  { id: 3, title: "目标客户", icon: Users, description: "客户画像和市场" },
  { id: 4, title: "竞争对手", icon: Target, description: "竞品分析" },
  { id: 5, title: "AI 引用率", icon: BarChart3, description: "当前 AI 可见性" },
  { id: 6, title: "优化建议", icon: Sparkles, description: "关键词和问答建议" },
];

// 行业选项
const industries = [
  "科技/软件", "电子商务", "金融/保险", "教育/培训", "医疗/健康",
  "房地产", "制造业", "餐饮/食品", "旅游/酒店", "其他"
];

// 业务模式
const businessModels = ["B2B", "B2C", "B2B2C", "D2C", "SaaS", "平台型"];

// 目标市场
const targetMarkets = [
  { value: "cn", label: "中国大陆" },
  { value: "hk", label: "香港/澳门/台湾" },
  { value: "sea", label: "东南亚" },
  { value: "us", label: "美国" },
  { value: "eu", label: "欧洲" },
  { value: "global", label: "全球" },
];

// AI 平台
const aiPlatforms = [
  { id: "chatgpt", name: "ChatGPT", category: "en" },
  { id: "perplexity", name: "Perplexity", category: "en" },
  { id: "gemini", name: "Gemini", category: "en" },
  { id: "claude", name: "Claude", category: "en" },
  { id: "deepseek", name: "DeepSeek", category: "zh" },
  { id: "doubao", name: "豆包", category: "zh" },
  { id: "tongyi", name: "通义千问", category: "zh" },
  { id: "wenxin", name: "文心一言", category: "zh" },
];

export default function DiagnosePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState({
    // 步骤1: 基本信息
    domain: "",
    brandName: "",
    language: "zh",
    country: "cn",
    
    // 步骤2: 业务类型
    industry: "",
    businessModel: [] as string[],
    coreProducts: "",
    
    // 步骤3: 目标客户
    targetMarkets: [] as string[],
    customerType: "",
    customerPainPoints: "",
    
    // 步骤4: 竞争对手
    competitors: ["", "", ""],
    competitiveAdvantage: "",
    
    // 步骤5: AI引用率检测结果
    aiVisibilityScore: 0,
    platformResults: {} as Record<string, { found: boolean; rank: number | null }>,
    
    // 步骤6: 优化建议
    suggestedKeywords: [] as string[],
    suggestedLongTails: [] as string[],
    suggestedQueries: [] as string[],
    selectedKeywords: [] as string[],
    selectedLongTails: [] as string[],
    selectedQueries: [] as string[],
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

  // 模拟 AI 分析
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟生成结果
    const brandName = formData.brandName || formData.domain.split('.')[0];
    const industry = formData.industry || "科技";
    
    const suggestedKeywords = [
      `${brandName}`,
      `${industry}解决方案`,
      `${industry}服务商`,
      `${industry}公司推荐`,
      `最好的${industry}平台`,
    ];
    
    const suggestedLongTails = [
      `${brandName}怎么样`,
      `${brandName}好不好用`,
      `${industry}哪家好`,
      `${industry}排行榜`,
      `${industry}对比`,
      `${industry}价格`,
    ];
    
    const suggestedQueries = [
      `${brandName}和竞品相比有什么优势？`,
      `${industry}领域有哪些值得推荐的服务商？`,
      `如何选择${industry}解决方案？`,
      `${industry}的最新趋势是什么？`,
      `中小企业如何选择${industry}服务？`,
      `${industry}的价格一般是多少？`,
    ];
    
    // 模拟 AI 平台检测结果
    const platformResults: Record<string, { found: boolean; rank: number | null }> = {};
    aiPlatforms.forEach(p => {
      const found = Math.random() > 0.6;
      platformResults[p.id] = {
        found,
        rank: found ? Math.floor(Math.random() * 10) + 1 : null,
      };
    });
    
    const foundCount = Object.values(platformResults).filter(r => r.found).length;
    const score = Math.round((foundCount / aiPlatforms.length) * 100);
    
    updateFormData({
      aiVisibilityScore: score,
      platformResults,
      suggestedKeywords,
      suggestedLongTails,
      suggestedQueries,
      selectedKeywords: suggestedKeywords.slice(0, 3),
      selectedLongTails: suggestedLongTails.slice(0, 4),
      selectedQueries: suggestedQueries.slice(0, 3),
    });
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const nextStep = () => {
    if (currentStep === 4 && !analysisComplete) {
      runAnalysis().then(() => setCurrentStep(5));
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // 将诊断结果存储到 localStorage
    const diagnosisResult = {
      keywords: formData.selectedKeywords,
      longTails: formData.selectedLongTails,
      queries: formData.selectedQueries,
      brandName: formData.brandName,
      domain: formData.domain,
      platforms: Object.entries(formData.platformResults)
        .filter(([, r]) => !r.found)
        .map(([id]) => id),
    };
    localStorage.setItem('geo_diagnosis_result', JSON.stringify(diagnosisResult));
    router.push('/dashboard/services/geo');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.domain.trim() !== '';
      case 2:
        return formData.industry !== '';
      case 3:
        return formData.targetMarkets.length > 0;
      case 4:
        return true;
      case 5:
        return analysisComplete;
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
                完成诊断，获取个性化优化建议
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
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
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
                    "text-xs mt-2 hidden sm:block",
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 lg:w-20 h-0.5 mx-2",
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
            {/* 步骤1: 基本信息 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="domain">网站域名 *</Label>
                    <Input
                      id="domain"
                      placeholder="example.com"
                      value={formData.domain}
                      onChange={e => updateFormData({ domain: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandName">品牌名称</Label>
                    <Input
                      id="brandName"
                      placeholder="你的品牌名"
                      value={formData.brandName}
                      onChange={e => updateFormData({ brandName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>主要语言</Label>
                    <Select
                      value={formData.language}
                      onValueChange={v => updateFormData({ language: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="en">英文</SelectItem>
                        <SelectItem value="both">中英双语</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>主要市场</Label>
                    <Select
                      value={formData.country}
                      onValueChange={v => updateFormData({ country: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cn">中国大陆</SelectItem>
                        <SelectItem value="global">全球</SelectItem>
                        <SelectItem value="us">美国</SelectItem>
                        <SelectItem value="eu">欧洲</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤2: 业务类型 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>所属行业 *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {industries.map(industry => (
                      <button
                        key={industry}
                        onClick={() => updateFormData({ industry })}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-sm transition-all",
                          formData.industry === industry
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>业务模式（可多选）</Label>
                  <div className="flex flex-wrap gap-2">
                    {businessModels.map(model => (
                      <button
                        key={model}
                        onClick={() => toggleArrayItem('businessModel', model)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-sm transition-all",
                          formData.businessModel.includes(model)
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coreProducts">核心产品/服务</Label>
                  <Textarea
                    id="coreProducts"
                    placeholder="简要描述你的核心产品或服务..."
                    value={formData.coreProducts}
                    onChange={e => updateFormData({ coreProducts: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 步骤3: 目标客户 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>目标市场（可多选）*</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {targetMarkets.map(market => (
                      <button
                        key={market.value}
                        onClick={() => toggleArrayItem('targetMarkets', market.value)}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-sm transition-all",
                          formData.targetMarkets.includes(market.value)
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        {market.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>客户类型</Label>
                  <Select
                    value={formData.customerType}
                    onValueChange={v => updateFormData({ customerType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择客户类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">大型企业</SelectItem>
                      <SelectItem value="sme">中小企业</SelectItem>
                      <SelectItem value="startup">初创公司</SelectItem>
                      <SelectItem value="individual">个人用户</SelectItem>
                      <SelectItem value="mixed">混合型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="painPoints">客户痛点</Label>
                  <Textarea
                    id="painPoints"
                    placeholder="你的客户通常面临哪些问题？"
                    value={formData.customerPainPoints}
                    onChange={e => updateFormData({ customerPainPoints: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 步骤4: 竞争对手 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>主要竞争对手（最多3个）</Label>
                  <div className="space-y-3">
                    {formData.competitors.map((competitor, index) => (
                      <Input
                        key={index}
                        placeholder={`竞争对手 ${index + 1} 的域名或品牌名`}
                        value={competitor}
                        onChange={e => {
                          const newCompetitors = [...formData.competitors];
                          newCompetitors[index] = e.target.value;
                          updateFormData({ competitors: newCompetitors });
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advantage">你的竞争优势</Label>
                  <Textarea
                    id="advantage"
                    placeholder="相比竞争对手，你有哪些优势？"
                    value={formData.competitiveAdvantage}
                    onChange={e => updateFormData({ competitiveAdvantage: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 步骤5: AI 引用率 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-lg font-medium">正在分析 AI 可见性...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      检测你的品牌在各大 AI 平台的引用情况
                    </p>
                  </div>
                ) : (
                  <>
                    {/* AI 可见性得分 */}
                    <div className="text-center py-6 border rounded-lg bg-muted/30">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {formData.aiVisibilityScore}
                        <span className="text-2xl text-muted-foreground">/100</span>
                      </div>
                      <p className="text-muted-foreground">AI 可见性得分</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formData.aiVisibilityScore < 30 && "你的品牌在 AI 平台的可见性较低，建议优化"}
                        {formData.aiVisibilityScore >= 30 && formData.aiVisibilityScore < 60 && "你的品牌有一定可见性，仍有提升空间"}
                        {formData.aiVisibilityScore >= 60 && "你的品牌可见性较好，可进一步巩固优势"}
                      </p>
                    </div>

                    {/* 平台检测结果 */}
                    <div className="space-y-3">
                      <Label>各平台检测结果</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {aiPlatforms.map(platform => {
                          const result = formData.platformResults[platform.id];
                          return (
                            <div
                              key={platform.id}
                              className={cn(
                                "p-3 rounded-lg border text-center",
                                result?.found
                                  ? "border-green-500/50 bg-green-50 dark:bg-green-950/20"
                                  : "border-red-500/50 bg-red-50 dark:bg-red-950/20"
                              )}
                            >
                              <div className="text-sm font-medium">{platform.name}</div>
                              <div className={cn(
                                "text-xs mt-1",
                                result?.found ? "text-green-600" : "text-red-600"
                              )}>
                                {result?.found ? `排名 #${result.rank}` : "未收录"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 步骤6: 优化建议 */}
            {currentStep === 6 && (
              <div className="space-y-6">
                {/* 推荐关键词 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>推荐关键词</Label>
                    <span className="text-xs text-muted-foreground">
                      已选 {formData.selectedKeywords.length} 个
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.suggestedKeywords.map(keyword => (
                      <button
                        key={keyword}
                        onClick={() => toggleArrayItem('selectedKeywords', keyword)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-sm transition-all",
                          formData.selectedKeywords.includes(keyword)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 长尾关键词 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>长尾关键词</Label>
                    <span className="text-xs text-muted-foreground">
                      已选 {formData.selectedLongTails.length} 个
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.suggestedLongTails.map(keyword => (
                      <button
                        key={keyword}
                        onClick={() => toggleArrayItem('selectedLongTails', keyword)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-sm transition-all",
                          formData.selectedLongTails.includes(keyword)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 问答建议 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>问答覆盖建议</Label>
                    <span className="text-xs text-muted-foreground">
                      已选 {formData.selectedQueries.length} 个
                    </span>
                  </div>
                  <div className="space-y-2">
                    {formData.suggestedQueries.map(query => (
                      <label
                        key={query}
                        className={cn(
                          "flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-all text-sm",
                          formData.selectedQueries.includes(query)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        <Checkbox
                          checked={formData.selectedQueries.includes(query)}
                          onCheckedChange={() => toggleArrayItem('selectedQueries', query)}
                          className="h-4 w-4"
                        />
                        <span>{query}</span>
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
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            上一步
          </Button>

          {currentStep < 6 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed() || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  下一步
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              完成诊断，开始优化
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

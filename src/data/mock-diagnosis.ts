import type { DiagnosisReport, DiagnosisIssue, ServiceRecommendation, AICitation, SEOAuditResult, GEOAuditResult, DiagnosisMode, AuditItem, AIEngineStatus } from "@/types/marketing";

// 生成审计项目
function generateAuditItem(minScore: number, maxScore: number): AuditItem {
  const score = Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
  const status = score >= 8 ? "pass" : score >= 5 ? "warning" : "fail";
  
  const findingsPool = {
    pass: ["符合最佳实践", "优化良好"],
    warning: ["需要轻微改进", "部分指标未达标"],
    fail: ["严重问题", "需要立即修复"],
  };
  
  const recommendationsPool = {
    pass: ["继续保持当前策略"],
    warning: ["建议优化以提升表现"],
    fail: ["建议立即采取修复措施"],
  };
  
  return {
    score,
    status,
    findings: [findingsPool[status][Math.floor(Math.random() * findingsPool[status].length)]],
    recommendations: [recommendationsPool[status][0]],
  };
}

// 生成AI引擎状态
function generateAIEngineStatus(businessType: string): AIEngineStatus {
  const isIndexed = Math.random() > 0.4;
  const citationCount = isIndexed ? Math.floor(Math.random() * 50) : 0;
  const visibility = !isIndexed ? "none" : citationCount > 30 ? "high" : citationCount > 10 ? "medium" : "low";
  
  return {
    isIndexed,
    citationCount,
    visibility,
    sampleQueries: [`${businessType}推荐`, `最佳${businessType}`, `${businessType}排行`],
  };
}

// 生成SEO审计结果
function generateSEOAudit(): SEOAuditResult {
  return {
    titleTag: generateAuditItem(4, 10),
    metaDescription: generateAuditItem(3, 9),
    headerStructure: generateAuditItem(5, 10),
    contentQuality: generateAuditItem(4, 9),
    keywordUsage: generateAuditItem(3, 8),
    internalLinks: generateAuditItem(2, 8),
    images: generateAuditItem(3, 9),
    technicalOnPage: generateAuditItem(5, 10),
    coreWebVitals: {
      lcp: Math.random() * 3 + 1, // 1-4 seconds
      inp: Math.random() * 300 + 50, // 50-350ms
      cls: Math.random() * 0.2, // 0-0.2
    },
  };
}

// 生成GEO审计结果
function generateGEOAudit(businessType: string, domain: string): GEOAuditResult {
  const domainName = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  const brandGuess = domainName.split('.')[0];
  const brandName = brandGuess.charAt(0).toUpperCase() + brandGuess.slice(1);
  const isChineseSite = Math.random() > 0.5;

  return {
    citationReadiness: generateAuditItem(2, 8),
    quotableContent: generateAuditItem(3, 9),
    factualDensity: generateAuditItem(4, 9),
    sourceAttribution: generateAuditItem(2, 7),
    structuredContent: generateAuditItem(3, 8),
    entityOptimization: generateAuditItem(2, 7),
    aiEngineVisibility: {
      chatgpt: generateAIEngineStatus(businessType),
      perplexity: generateAIEngineStatus(businessType),
      claude: generateAIEngineStatus(businessType),
      gemini: generateAIEngineStatus(businessType),
      deepseek: isChineseSite ? generateAIEngineStatus(businessType) : undefined,
      doubao: isChineseSite ? generateAIEngineStatus(businessType) : undefined,
    },
    businessProfile: {
      brandName,
      language: isChineseSite ? "中文" : "英文",
      country: isChineseSite ? "中国" : "全球",
      industry: businessType,
      businessModel: ["SaaS 服务", "电子商务", "内容平台", "企业服务"][Math.floor(Math.random() * 4)],
      coreProducts: `${brandName}平台、${brandName}服务`,
      targetCustomers: isChineseSite ? "中国企业用户" : "全球企业用户",
    },
    competitors: [
      { name: "竞品A", domain: "competitor-a.com", strength: "市场份额大", aiVisibility: "high" },
      { name: "竞品B", domain: "competitor-b.cn", strength: "价格优势", aiVisibility: "medium" },
      { name: "竞品C", domain: "competitor-c.com", strength: "技术领先", aiVisibility: "low" },
    ],
    keywordSuggestions: {
      keywords: [
        brandName,
        `${brandName}怎么样`,
        `${brandName}好不好`,
        `${brandName}推荐`,
        `${brandName}替代品`,
      ],
      longTails: [
        `${brandName}哪个版本好`,
        `${brandName}新手入门`,
        `${brandName}高级技巧`,
        `${brandName}常见问题`,
        `${brandName}使用教程`,
      ],
      queries: [
        `${brandName}和竞品相比有什么优势？`,
        `${brandName}适合什么样的用户？`,
        `如何快速上手${brandName}？`,
        `${brandName}的核心功能有哪些？`,
        `${brandName}的价格是多少？`,
      ],
    },
  };
}

// 生成模拟诊断报告
export function generateMockDiagnosis(url: string, mode: DiagnosisMode = "seo"): DiagnosisReport {
  const domain = new URL(url).hostname;
  
  // 随机生成评分
  const seoScore = Math.floor(Math.random() * 40) + 45; // 45-85
  const geoScore = Math.floor(Math.random() * 50) + 30; // 30-80
  const technicalScore = Math.floor(Math.random() * 30) + 60; // 60-90
  const contentScore = Math.floor(Math.random() * 35) + 50; // 50-85
  const overallScore = Math.floor((seoScore + geoScore + technicalScore + contentScore) / 4);

  // 业务类型识别
  const businessTypes = [
    "电子商务",
    "SaaS 软件服务",
    "企业官网",
    "内容媒体",
    "教育培训",
    "金融科技",
    "医疗健康",
    "旅游服务",
  ];
  const businessType = businessTypes[Math.floor(Math.random() * businessTypes.length)];

  // 目标受众
  const allAudiences = [
    "25-45岁专业人士",
    "中小企业决策者",
    "技术开发者",
    "电商卖家",
    "内容创作者",
    "营销从业者",
    "创业者",
    "学生群体",
  ];
  const targetAudience = allAudiences
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // SEO 专属问题
  const seoIssues: DiagnosisIssue[] = [
    {
      id: "seo-1",
      title: "Title Tag 长度不符合规范",
      description: "标题标签超过60个字符，可能在搜索结果中被截断",
      severity: "warning",
      category: "seo",
    },
    {
      id: "seo-2",
      title: "Meta Description 缺失",
      description: "部分页面缺少元描述，影响搜索结果点击率",
      severity: "critical",
      category: "seo",
    },
    {
      id: "seo-3",
      title: "H1 标签使用不规范",
      description: "检测到多个 H1 标签或 H1 中缺少目标关键词",
      severity: "warning",
      category: "seo",
    },
    {
      id: "seo-4",
      title: "内链结构不完善",
      description: "页面之间的内部链接较少，不利于权重传递和用户浏览",
      severity: "warning",
      category: "seo",
    },
    {
      id: "seo-5",
      title: "图片 ALT 标签缺失",
      description: "多数图片缺少描述性 ALT 文本，影响图片搜索和无障碍访问",
      severity: "info",
      category: "content",
    },
    {
      id: "seo-6",
      title: "外链数量不足",
      description: "高质量反向链接数量较少，域名权重有提升空间",
      severity: "critical",
      category: "seo",
    },
    {
      id: "seo-7",
      title: "Core Web Vitals 不达标",
      description: "LCP 超过 2.5 秒，影响用户体验和搜索排名",
      severity: "critical",
      category: "technical",
    },
    {
      id: "seo-8",
      title: "缺少结构化数据标记",
      description: "网站未实现 Schema.org 结构化数据，影响搜索引擎理解页面内容",
      severity: "warning",
      category: "seo",
    },
  ];

  // GEO 专属问题
  const geoIssues: DiagnosisIssue[] = [
    {
      id: "geo-1",
      title: "内容可引用性低",
      description: "缺少清晰的定义性语句和可直接引用的声明",
      severity: "critical",
      category: "geo",
    },
    {
      id: "geo-2",
      title: "事实密度不足",
      description: "内容缺少具体数据、统计和可验证的事实",
      severity: "warning",
      category: "content",
    },
    {
      id: "geo-3",
      title: "来源归因缺失",
      description: "未引用权威来源或专家观点，降低内容可信度",
      severity: "critical",
      category: "geo",
    },
    {
      id: "geo-4",
      title: "Q&A 结构化内容不足",
      description: "缺少问答格式的内容，不利于 AI 提取回答",
      severity: "warning",
      category: "geo",
    },
    {
      id: "geo-5",
      title: "实体消歧不清",
      description: "品牌/产品名称缺少明确的描述性语境",
      severity: "warning",
      category: "geo",
    },
    {
      id: "geo-6",
      title: "AI 搜索引擎可见性低",
      description: "网站内容未针对 AI 搜索引擎优化，在 ChatGPT、Perplexity 等平台引用率低",
      severity: "critical",
      category: "geo",
    },
    {
      id: "geo-7",
      title: "缺少专家信号",
      description: "内容未展示作者专业背景或行业权威性",
      severity: "info",
      category: "content",
    },
    {
      id: "geo-8",
      title: "内容新鲜度不足",
      description: "AI 引擎更偏好最新内容，建议定期更新",
      severity: "info",
      category: "content",
    },
  ];

  const issues = mode === "seo" 
    ? seoIssues.sort(() => Math.random() - 0.5).slice(0, 5)
    : geoIssues.sort(() => Math.random() - 0.5).slice(0, 5);

  // 服务推荐
  const recommendations: ServiceRecommendation[] = [
    {
      id: "rec-1",
      serviceType: "backlinks",
      title: "SEO 外链建设服务",
      description: "通过高质量外链提升网站权重，预计可提升 DA 15-25 分",
      priority: "high",
      estimatedImpact: "+40% 自然流量",
    },
    {
      id: "rec-2",
      serviceType: "geo",
      title: "AI 搜索优化 (GEO)",
      description: "优化内容以提升在 AI 搜索引擎中的可见度和引用率",
      priority: "high",
      estimatedImpact: "+200% AI 引用量",
    },
    {
      id: "rec-3",
      serviceType: "social-media",
      title: "新媒体分发服务",
      description: "一键将内容分发到多个社交平台，扩大品牌影响力",
      priority: "medium",
      estimatedImpact: "+150% 社交曝光",
    },
    {
      id: "rec-4",
      serviceType: "intelligence",
      title: "获客情报中心",
      description: "精准获取目标客户信息，实现高效的邮件营销触达",
      priority: "medium",
      estimatedImpact: "+80% 获客效率",
    },
  ];

  // AI 引用情况
  const aiCitations: AICitation[] = [
    {
      source: "ChatGPT",
      query: `${businessType}推荐`,
      isReferenced: Math.random() > 0.6,
      rank: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined,
    },
    {
      source: "Perplexity",
      query: `最佳${businessType}服务`,
      isReferenced: Math.random() > 0.7,
      rank: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined,
    },
    {
      source: "Claude",
      query: `${businessType}解决方案`,
      isReferenced: Math.random() > 0.8,
      rank: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined,
    },
    {
      source: "Gemini",
      query: `${domain} 评价`,
      isReferenced: Math.random() > 0.7,
      rank: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined,
    },
  ];

  return {
    id: `diag-${Date.now()}`,
    url,
    mode,
    seoScore,
    geoScore,
    technicalScore,
    contentScore,
    overallScore,
    businessType,
    targetAudience,
    issues,
    recommendations,
    aiCitations,
    seoAudit: mode === "seo" ? generateSEOAudit() : undefined,
    geoAudit: mode === "geo" ? generateGEOAudit(businessType, url) : undefined,
    createdAt: new Date(),
  };
}

// SEO诊断步骤
export const seoDiagnosisSteps = [
  { id: 1, label: "连接网站", duration: 800 },
  { id: 2, label: "分析页面结构", duration: 1000 },
  { id: 3, label: "审计 Title Tag", duration: 800 },
  { id: 4, label: "审计 Meta Description", duration: 800 },
  { id: 5, label: "检测 Header 结构", duration: 1000 },
  { id: 6, label: "分析内容质量", duration: 1200 },
  { id: 7, label: "检测关键词使用", duration: 1000 },
  { id: 8, label: "审计内链结构", duration: 800 },
  { id: 9, label: "检测图片优化", duration: 800 },
  { id: 10, label: "测试 Core Web Vitals", duration: 1500 },
  { id: 11, label: "生成 SEO 诊断报告", duration: 1000 },
];

// GEO诊断步骤（与 /dashboard/services/geo/diagnose 页面流程一致）
export const geoDiagnosisSteps = [
  { id: 1, label: "连接网站", duration: 800 },
  { id: 2, label: "抓取网页内容", duration: 1000 },
  { id: 3, label: "识别语言和市场", duration: 800 },
  { id: 4, label: "分析品牌名称", duration: 800 },
  { id: 5, label: "识别业务类型", duration: 1000 },
  { id: 6, label: "分析目标客户", duration: 1000 },
  { id: 7, label: "扫描 AI 搜索可见度", duration: 1500 },
  { id: 8, label: "审计 GEO 内容优化", duration: 1200 },
  { id: 9, label: "识别竞争对手", duration: 1000 },
  { id: 10, label: "生成关键词建议", duration: 1000 },
  { id: 11, label: "生成 GEO 诊断报告", duration: 1000 },
];

// 诊断步骤（用于动画）- 保留旧版兼容
export const diagnosisSteps = seoDiagnosisSteps;

export const severityLabels: Record<string, string> = {
  critical: "严重",
  warning: "警告",
  info: "建议",
};

export const severityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export const categoryLabels: Record<string, string> = {
  seo: "SEO",
  geo: "AI引用",
  technical: "技术",
  content: "内容",
};

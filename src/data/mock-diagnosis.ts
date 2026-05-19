import type { DiagnosisReport, DiagnosisIssue, ServiceRecommendation, AICitation } from "@/types/marketing";

// 生成模拟诊断报告
export function generateMockDiagnosis(url: string): DiagnosisReport {
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

  // 问题诊断
  const allIssues: DiagnosisIssue[] = [
    {
      id: "issue-1",
      title: "缺少结构化数据标记",
      description: "网站未实现 Schema.org 结构化数据，影响搜索引擎理解页面内容",
      severity: "critical",
      category: "seo",
    },
    {
      id: "issue-2",
      title: "移动端体验需优化",
      description: "部分页面在移动设备上加载速度较慢，Core Web Vitals 指标不达标",
      severity: "warning",
      category: "technical",
    },
    {
      id: "issue-3",
      title: "内链结构不完善",
      description: "页面之间的内部链接较少，不利于权重传递和用户浏览",
      severity: "warning",
      category: "seo",
    },
    {
      id: "issue-4",
      title: "AI 搜索引擎可见性低",
      description: "网站内容未针对 AI 搜索引擎优化，在 ChatGPT、Perplexity 等平台引用率低",
      severity: "critical",
      category: "geo",
    },
    {
      id: "issue-5",
      title: "内容更新频率低",
      description: "网站内容更新不频繁，可能影响搜索引擎爬取频率",
      severity: "info",
      category: "content",
    },
    {
      id: "issue-6",
      title: "外链数量不足",
      description: "高质量反向链接数量较少，域名权重有提升空间",
      severity: "critical",
      category: "seo",
    },
    {
      id: "issue-7",
      title: "元描述优化不足",
      description: "部分页面缺少或元描述过长，影响搜索结果点击率",
      severity: "warning",
      category: "seo",
    },
    {
      id: "issue-8",
      title: "图片 ALT 标签缺失",
      description: "多数图片缺少描述性 ALT 文本，影响图片搜索和无障碍访问",
      severity: "info",
      category: "content",
    },
  ];

  const issues = allIssues
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

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
    createdAt: new Date(),
  };
}

// 诊断步骤（用于动画）
export const diagnosisSteps = [
  { id: 1, label: "连接网站", duration: 800 },
  { id: 2, label: "分析页面结构", duration: 1200 },
  { id: 3, label: "检测 SEO 指标", duration: 1500 },
  { id: 4, label: "扫描 AI 引用情况", duration: 1800 },
  { id: 5, label: "识别业务类型", duration: 1000 },
  { id: 6, label: "分析目标受众", duration: 1200 },
  { id: 7, label: "生成诊断报告", duration: 1000 },
];

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

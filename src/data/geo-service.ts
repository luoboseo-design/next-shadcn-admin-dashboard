// GEO 优化服务 - 数据定义

export type OptimizationCategory = "content" | "technical" | "authority";
export type AiPlatform = "chatgpt" | "gemini" | "perplexity" | "claude" | "copilot";

export interface OptimizationService {
  id: string;
  category: OptimizationCategory;
  name: string;
  description: string;
  features: string[];
  deliverables: string[];
  price: number;
  unit: string;
  turnaround: string;
  popular?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  limits: {
    aiPlatforms: number;
    promptsTracked: number;
    contentOptimizations: number;
    competitorTracking: number;
    reportFrequency: string;
  };
  popular?: boolean;
}

export const categoryLabels: Record<OptimizationCategory, string> = {
  content: "内容优化",
  technical: "技术优化",
  authority: "权威建设",
};

export const categoryDescriptions: Record<OptimizationCategory, string> = {
  content: "优化内容结构和可读性，让 AI 更容易理解和引用",
  technical: "Schema 标记、结构化数据等技术层面的优化",
  authority: "提升品牌权威性，增加被 AI 引用的可信度",
};

export const categoryIcons: Record<OptimizationCategory, string> = {
  content: "FileEdit",
  technical: "Code",
  authority: "Award",
};

export const aiPlatformLabels: Record<AiPlatform, string> = {
  chatgpt: "ChatGPT",
  gemini: "Google Gemini",
  perplexity: "Perplexity",
  claude: "Claude",
  copilot: "Microsoft Copilot",
};

// 优化服务列表
export const optimizationServices: OptimizationService[] = [
  // 内容优化
  {
    id: "content-rewrite",
    category: "content",
    name: "AI 友好内容重写",
    description: "将现有内容重构为 AI 引擎更容易理解和引用的格式",
    features: [
      "问答格式优化",
      "清晰的标题层级",
      "关键实体突出",
      "可扫描的列表结构",
      "避免营销废话",
    ],
    deliverables: [
      "优化后的内容文档",
      "修改建议清单",
      "前后对比分析",
    ],
    price: 399,
    unit: "页",
    turnaround: "3 个工作日",
    popular: true,
  },
  {
    id: "content-creation",
    category: "content",
    name: "GEO 优化内容创作",
    description: "从零创作针对 AI 引用优化的高质量内容",
    features: [
      "关键词和意图研究",
      "竞品内容分析",
      "AI 引用优化写作",
      "实体一致性保证",
      "引用来源标注",
    ],
    deliverables: [
      "原创优化内容",
      "关键词覆盖报告",
      "发布建议指南",
    ],
    price: 699,
    unit: "篇",
    turnaround: "5 个工作日",
  },
  {
    id: "faq-optimization",
    category: "content",
    name: "FAQ 内容优化",
    description: "创建或优化 FAQ 页面，直接匹配 AI 搜索意图",
    features: [
      "热门问题挖掘",
      "直接回答格式",
      "FAQ Schema 标记",
      "相关问题链接",
    ],
    deliverables: [
      "优化后的 FAQ 内容",
      "Schema 代码",
      "问题优先级排序",
    ],
    price: 299,
    unit: "组",
    turnaround: "2 个工作日",
  },

  // 技术优化
  {
    id: "schema-implementation",
    category: "technical",
    name: "Schema 标记实施",
    description: "添加结构化数据标记，帮助 AI 理解页面内容",
    features: [
      "Organization Schema",
      "Article/Product Schema",
      "FAQ Schema",
      "BreadcrumbList Schema",
      "验证和测试",
    ],
    deliverables: [
      "完整 Schema 代码",
      "实施指南文档",
      "验证测试报告",
    ],
    price: 499,
    unit: "站",
    turnaround: "3 个工作日",
    popular: true,
  },
  {
    id: "llms-txt",
    category: "technical",
    name: "llms.txt 配置",
    description: "创建和配置 llms.txt 文件，指导 AI 爬虫抓取",
    features: [
      "llms.txt 文件生成",
      "内容优先级设置",
      "AI 爬虫访问优化",
      "robots.txt 协调",
    ],
    deliverables: [
      "llms.txt 文件",
      "配置说明文档",
      "部署指南",
    ],
    price: 199,
    unit: "站",
    turnaround: "1 个工作日",
  },
  {
    id: "site-audit-fix",
    category: "technical",
    name: "技术问题修复",
    description: "修复影响 AI 可见性的技术问题",
    features: [
      "爬虫可访问性检查",
      "页面加载速度优化",
      "移动端适配检查",
      "内链结构优化",
    ],
    deliverables: [
      "问题修复报告",
      "优化后的技术配置",
      "性能对比数据",
    ],
    price: 799,
    unit: "站",
    turnaround: "5 个工作日",
  },

  // 权威建设
  {
    id: "entity-consistency",
    category: "authority",
    name: "实体一致性优化",
    description: "确保品牌名称和关键实体在全网保持一致",
    features: [
      "品牌名称一致性检查",
      "产品名称规范化",
      "跨平台实体统一",
      "Wikipedia/知识图谱对齐",
    ],
    deliverables: [
      "实体一致性报告",
      "修改建议清单",
      "执行检查表",
    ],
    price: 599,
    unit: "次",
    turnaround: "3 个工作日",
  },
  {
    id: "citation-building",
    category: "authority",
    name: "引用来源建设",
    description: "在 AI 信任的第三方平台建立品牌存在",
    features: [
      "权威平台分析",
      "内容投放策略",
      "评测和提及获取",
      "行业目录优化",
    ],
    deliverables: [
      "平台策略文档",
      "内容投放计划",
      "执行进度追踪",
    ],
    price: 1999,
    unit: "月",
    turnaround: "持续执行",
    popular: true,
  },
  {
    id: "about-page",
    category: "authority",
    name: "关于页面优化",
    description: "优化品牌关于页面，增强 AI 对品牌的信任度",
    features: [
      "品牌故事重构",
      "团队信息展示",
      "资质和奖项突出",
      "联系方式完善",
    ],
    deliverables: [
      "优化后的关于页面",
      "品牌叙事文档",
      "Schema 标记代码",
    ],
    price: 399,
    unit: "页",
    turnaround: "3 个工作日",
  },
];

// 订阅套餐
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "入门版",
    description: "适合刚开始关注 AI 可见性的品牌",
    price: 499,
    period: "月",
    features: [
      "2 个 AI 平台监控",
      "追踪 50 个提示词",
      "每月 2 篇内容优化",
      "双周报告",
      "邮件支持",
    ],
    limits: {
      aiPlatforms: 2,
      promptsTracked: 50,
      contentOptimizations: 2,
      competitorTracking: 0,
      reportFrequency: "双周",
    },
  },
  {
    id: "growth",
    name: "成长版",
    description: "适合积极提升 AI 曝光的成长期企业",
    price: 1299,
    period: "月",
    features: [
      "4 个 AI 平台监控",
      "追踪 200 个提示词",
      "每月 5 篇内容优化",
      "3 个竞争对手追踪",
      "每周报告 + 策略建议",
      "优先支持",
    ],
    limits: {
      aiPlatforms: 4,
      promptsTracked: 200,
      contentOptimizations: 5,
      competitorTracking: 3,
      reportFrequency: "每周",
    },
    popular: true,
  },
  {
    id: "professional",
    name: "专业版",
    description: "适合需要全面 AI 可见性管理的中型企业",
    price: 2999,
    period: "月",
    features: [
      "全部 AI 平台监控",
      "追踪 500 个提示词",
      "每月 15 篇内容优化",
      "10 个竞争对手追踪",
      "每日报告 + 实时告警",
      "月度策略会议",
      "API 数据接入",
    ],
    limits: {
      aiPlatforms: 6,
      promptsTracked: 500,
      contentOptimizations: 15,
      competitorTracking: 10,
      reportFrequency: "每日",
    },
  },
  {
    id: "enterprise",
    name: "企业版",
    description: "适合大型企业的定制化 GEO 解决方案",
    price: 0, // 定制报价
    period: "月",
    features: [
      "无限 AI 平台监控",
      "无限提示词追踪",
      "无限内容优化",
      "无限竞争对手追踪",
      "实时监控仪表盘",
      "专属客户成功经理",
      "定制开发支持",
      "SLA 保障",
    ],
    limits: {
      aiPlatforms: -1,
      promptsTracked: -1,
      contentOptimizations: -1,
      competitorTracking: -1,
      reportFrequency: "实时",
    },
  },
];

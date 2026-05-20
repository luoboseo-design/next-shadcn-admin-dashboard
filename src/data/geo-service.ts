// GEO 服务 - 数据定义

export type GeoServiceType = "audit" | "optimization" | "monitoring";
export type AiPlatform = "chatgpt" | "gemini" | "perplexity" | "claude" | "copilot";

export interface GeoService {
  id: string;
  type: GeoServiceType;
  name: string;
  description: string;
  features: string[];
  price: number;
  unit: string;
  popular?: boolean;
}

export interface GeoPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  limits: {
    auditsPerMonth: number;
    promptsTracked: number;
    contentOptimizations: number;
    competitorTracking: number;
  };
  popular?: boolean;
}

export const serviceTypeLabels: Record<GeoServiceType, string> = {
  audit: "AI 可见性诊断",
  optimization: "内容优化",
  monitoring: "持续监控",
};

export const serviceTypeIcons: Record<GeoServiceType, string> = {
  audit: "Search",
  optimization: "FileEdit",
  monitoring: "Activity",
};

export const serviceTypeDescriptions: Record<GeoServiceType, string> = {
  audit: "检测品牌在主流 AI 引擎中的可见度和引用情况",
  optimization: "优化内容结构，提升 AI 引用概率",
  monitoring: "持续追踪品牌在 AI 回答中的表现",
};

export const aiPlatformLabels: Record<AiPlatform, string> = {
  chatgpt: "ChatGPT",
  gemini: "Google Gemini",
  perplexity: "Perplexity",
  claude: "Claude",
  copilot: "Microsoft Copilot",
};

export const aiPlatformLogos: Record<AiPlatform, string> = {
  chatgpt: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  gemini: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  perplexity: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg",
  claude: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
  copilot: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Microsoft_365_Copilot_Icon.svg",
};

// 单次服务
export const geoServices: GeoService[] = [
  // AI 可见性诊断
  {
    id: "audit-basic",
    type: "audit",
    name: "基础诊断",
    description: "单次 AI 可见性扫描，覆盖主流 AI 平台",
    features: [
      "扫描 5 个 AI 平台",
      "100 个相关提示词测试",
      "品牌提及率分析",
      "基础报告",
    ],
    price: 299,
    unit: "次",
  },
  {
    id: "audit-advanced",
    type: "audit",
    name: "深度诊断",
    description: "全面分析品牌 AI 可见性，含竞品对比",
    features: [
      "扫描 5 个 AI 平台",
      "500 个相关提示词测试",
      "竞争对手对比分析",
      "详细报告 + 优化建议",
      "提示词机会挖掘",
    ],
    price: 799,
    unit: "次",
    popular: true,
  },
  {
    id: "audit-enterprise",
    type: "audit",
    name: "企业级诊断",
    description: "定制化 AI 可见性审计，适合大型品牌",
    features: [
      "扫描所有主流 AI 平台",
      "无限提示词测试",
      "多竞争对手深度分析",
      "定制报告 + 策略咨询",
      "专属客户经理",
    ],
    price: 2999,
    unit: "次",
  },

  // 内容优化
  {
    id: "optimize-single",
    type: "optimization",
    name: "单页优化",
    description: "优化单个页面的 AI 可见性",
    features: [
      "页面 AI 友好度分析",
      "结构化数据优化",
      "内容重构建议",
      "Schema 标记添加",
    ],
    price: 199,
    unit: "页",
  },
  {
    id: "optimize-content",
    type: "optimization",
    name: "内容生成",
    description: "AI 优化的原创内容创作",
    features: [
      "AI 引用优化写作",
      "关键实体覆盖",
      "问答格式优化",
      "引用来源标注",
    ],
    price: 499,
    unit: "篇",
    popular: true,
  },
  {
    id: "optimize-site",
    type: "optimization",
    name: "整站优化",
    description: "全站 AI 可见性优化方案",
    features: [
      "全站 AI 友好度审计",
      "10 个核心页面优化",
      "技术 SEO + GEO 整合",
      "30 天优化执行",
    ],
    price: 4999,
    unit: "站",
  },

  // 持续监控
  {
    id: "monitor-basic",
    type: "monitoring",
    name: "基础监控",
    description: "每周追踪品牌 AI 可见性变化",
    features: [
      "每周扫描 1 次",
      "追踪 50 个提示词",
      "邮件报告",
      "基础趋势图表",
    ],
    price: 199,
    unit: "月",
  },
  {
    id: "monitor-pro",
    type: "monitoring",
    name: "专业监控",
    description: "每日追踪，含竞品监控",
    features: [
      "每日扫描",
      "追踪 200 个提示词",
      "3 个竞争对手追踪",
      "实时告警",
      "详细仪表盘",
    ],
    price: 599,
    unit: "月",
    popular: true,
  },
  {
    id: "monitor-enterprise",
    type: "monitoring",
    name: "企业监控",
    description: "企业级 AI 可见性监控方案",
    features: [
      "实时扫描",
      "无限提示词追踪",
      "无限竞争对手",
      "API 数据接入",
      "定制仪表盘",
      "专属支持",
    ],
    price: 1999,
    unit: "月",
  },
];

// 订阅套餐
export const geoPackages: GeoPackage[] = [
  {
    id: "starter",
    name: "入门版",
    description: "适合个人品牌和小型网站",
    price: 299,
    period: "月",
    features: [
      "每月 1 次 AI 可见性诊断",
      "追踪 50 个提示词",
      "2 篇内容优化",
      "基础报告",
    ],
    limits: {
      auditsPerMonth: 1,
      promptsTracked: 50,
      contentOptimizations: 2,
      competitorTracking: 0,
    },
  },
  {
    id: "growth",
    name: "成长版",
    description: "适合成长期企业和电商网站",
    price: 799,
    period: "月",
    features: [
      "每月 2 次 AI 可见性诊断",
      "追踪 200 个提示词",
      "5 篇内容优化",
      "3 个竞争对手追踪",
      "每周报告",
    ],
    limits: {
      auditsPerMonth: 2,
      promptsTracked: 200,
      contentOptimizations: 5,
      competitorTracking: 3,
    },
    popular: true,
  },
  {
    id: "professional",
    name: "专业版",
    description: "适合中型企业和品牌商",
    price: 1999,
    period: "月",
    features: [
      "每月 5 次 AI 可见性诊断",
      "追踪 500 个提示词",
      "15 篇内容优化",
      "10 个竞争对手追踪",
      "每日报告",
      "API 接入",
    ],
    limits: {
      auditsPerMonth: 5,
      promptsTracked: 500,
      contentOptimizations: 15,
      competitorTracking: 10,
    },
  },
  {
    id: "enterprise",
    name: "企业版",
    description: "适合大型企业和集团品牌",
    price: 4999,
    period: "月",
    features: [
      "无限 AI 可见性诊断",
      "无限提示词追踪",
      "无限内容优化",
      "无限竞争对手追踪",
      "实时监控告警",
      "专属客户经理",
      "定制开发支持",
    ],
    limits: {
      auditsPerMonth: -1, // 无限
      promptsTracked: -1,
      contentOptimizations: -1,
      competitorTracking: -1,
    },
  },
];

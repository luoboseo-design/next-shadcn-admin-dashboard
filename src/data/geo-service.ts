// GEO 优化服务 - 数据定义

export type ServiceType = "keyword" | "page" | "authority";

export type AiPlatform =
  | "chatgpt"
  | "perplexity"
  | "gemini"
  | "metaai"
  | "deepseek"
  | "doubao"
  | "tongyi"
  | "wenxin"
  | "yuanbao"
  | "nami";

export type PlatformCategory = "en" | "zh";

export interface AiPlatformInfo {
  id: AiPlatform;
  name: string;
  description: string;
  category: PlatformCategory;
  icon?: string;
}

export interface AuthorityService {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  unit: string;
  turnaround: string;
  popular?: boolean;
}

// 服务类型配置
export const serviceTypeLabels: Record<ServiceType, string> = {
  keyword: "关键词优化",
  page: "页面优化",
  authority: "权威建设",
};

export const serviceTypeDescriptions: Record<ServiceType, string> = {
  keyword: "针对特定关键词提升在 AI 平台的排名和引用率",
  page: "优化指定页面，让 AI 更容易理解和推荐你的内容",
  authority: "建设品牌权威性，提升 AI 对你品牌的信任度",
};

// AI 平台分类标签
export const platformCategoryLabels: Record<PlatformCategory, string> = {
  en: "英文平台",
  zh: "中文平台",
};

// AI 平台列表
export const aiPlatforms: AiPlatformInfo[] = [
  // 英文平台
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI 旗舰产品，全球用户量最大",
    category: "en",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI 搜索引擎，实时联网搜索",
    category: "en",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google AI，与搜索深度整合",
    category: "en",
  },
  {
    id: "metaai",
    name: "Meta AI",
    description: "Meta 出品，整合社交平台",
    category: "en",
  },
  // 中文平台
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "深度求索，性能强劲",
    category: "zh",
  },
  {
    id: "doubao",
    name: "豆包",
    description: "字节跳动 AI，用户量大",
    category: "zh",
  },
  {
    id: "tongyi",
    name: "通义千问",
    description: "阿里云 AI，企业级应用",
    category: "zh",
  },
  {
    id: "wenxin",
    name: "文心一言",
    description: "百度 AI，中文理解强",
    category: "zh",
  },
  {
    id: "yuanbao",
    name: "元宝",
    description: "腾讯 AI，整合微信生态",
    category: "zh",
  },
  {
    id: "nami",
    name: "纳米AI",
    description: "360 AI，安全领域专长",
    category: "zh",
  },
];

// 关键词优化 - 按平台类型定价（美金）
export const keywordPricing = {
  en: {
    pricePerKeyword: 200, // 英文平台 $200/词/平台
    turnaround: "7-14天",
  },
  zh: {
    pricePerKeyword: 100, // 中文平台 $100/词/平台
    turnaround: "5-7天",
  },
  features: ["排名追踪报告", "优化建议", "效果保障"],
};

// 计算关键词价格（按实际数量和平台类型）
export function calculateKeywordPrice(
  keywordCount: number, 
  enPlatformCount: number, 
  zhPlatformCount: number
): number {
  const enPrice = keywordCount * keywordPricing.en.pricePerKeyword * enPlatformCount;
  const zhPrice = keywordCount * keywordPricing.zh.pricePerKeyword * zhPlatformCount;
  return enPrice + zhPrice;
}

// 页面优化 - 按数量定价（美金）
export const pagePricing = {
  pricePerPage: 150, // 单价 $150/页
  turnaround: "3-5天",
  features: ["结构优化", "Schema标记", "AI友好重写"],
};

// 计算页面价格（按实际数量）
export function calculatePagePrice(pageCount: number): number {
  return pageCount * pagePricing.pricePerPage;
}

// 权威建设服务（美金）
export const authorityServices: AuthorityService[] = [
  {
    id: "entity",
    name: "实体一致性优化",
    description: "统一品牌在各平台的信息，提升 AI 识别准确度",
    features: ["NAP 一致性检查", "品牌信息统一", "知识图谱优化", "维基百科/百科词条"],
    price: 500,
    unit: "次",
    turnaround: "7-14天",
  },
  {
    id: "citation",
    name: "引用来源建设",
    description: "在权威媒体和平台建设品牌引用，增加 AI 信任度",
    features: ["权威媒体发布", "行业平台曝光", "引用链接建设", "内容分发"],
    price: 800,
    unit: "次",
    turnaround: "14-21天",
    popular: true,
  },
  {
    id: "about",
    name: "关于页面优化",
    description: "优化官网关于页面，让 AI 更好地理解品牌",
    features: ["结构化数据标记", "品牌故事优化", "团队信息展示", "联系方式优化"],
    price: 300,
    unit: "次",
    turnaround: "3-5天",
  },
];

// GEO 优化服务 - 数据定义

export type ServiceType = "keyword" | "page" | "authority";

export type AiPlatform = 
  | "chatgpt" 
  | "gemini" 
  | "perplexity" 
  | "claude" 
  | "copilot"
  | "deepseek"
  | "doubao"
  | "kimi";

export interface AiPlatformInfo {
  id: AiPlatform;
  name: string;
  description: string;
  icon?: string;
}

export interface KeywordPackage {
  id: string;
  name: string;
  keywords: number;
  pricePerKeyword: number;
  discount: number; // 折扣百分比
  description: string;
  popular?: boolean;
}

export interface PagePackage {
  id: string;
  name: string;
  pages: number;
  pricePerPage: number;
  discount: number;
  description: string;
  features: string[];
  popular?: boolean;
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

// AI 平台列表
export const aiPlatforms: AiPlatformInfo[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI 旗舰产品，全球用户量最大",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI 搜索引擎，实时联网搜索",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google AI，与搜索深度整合",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic 出品，擅长长文分析",
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    description: "微软 AI 助手，整合 Bing 搜索",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "国产大模型，性价比高",
  },
  {
    id: "doubao",
    name: "豆包",
    description: "字节跳动 AI，国内用户量大",
  },
  {
    id: "kimi",
    name: "Kimi",
    description: "月之暗面出品，擅长长文处理",
  },
];

// 关键词优化套餐
export const keywordPackages: KeywordPackage[] = [
  {
    id: "single",
    name: "单词优化",
    keywords: 1,
    pricePerKeyword: 299,
    discount: 0,
    description: "适合测试效果",
  },
  {
    id: "starter",
    name: "入门套餐",
    keywords: 5,
    pricePerKeyword: 249,
    discount: 17,
    description: "适合小型企业",
  },
  {
    id: "growth",
    name: "成长套餐",
    keywords: 10,
    pricePerKeyword: 199,
    discount: 33,
    description: "最受欢迎的选择",
    popular: true,
  },
  {
    id: "professional",
    name: "专业套餐",
    keywords: 30,
    pricePerKeyword: 149,
    discount: 50,
    description: "适合中型企业",
  },
  {
    id: "enterprise",
    name: "企业套餐",
    keywords: 100,
    pricePerKeyword: 99,
    discount: 67,
    description: "大规模优化首选",
  },
];

// 页面优化套餐
export const pagePackages: PagePackage[] = [
  {
    id: "single",
    name: "单页优化",
    pages: 1,
    pricePerPage: 599,
    discount: 0,
    description: "适合核心落地页",
    features: [
      "内容结构优化",
      "Schema 标记",
      "AI 友好格式重写",
    ],
  },
  {
    id: "basic",
    name: "基础套餐",
    pages: 5,
    pricePerPage: 499,
    discount: 17,
    description: "适合小型网站",
    features: [
      "内容结构优化",
      "Schema 标记",
      "AI 友好格式重写",
      "内链优化建议",
    ],
  },
  {
    id: "standard",
    name: "标准套餐",
    pages: 10,
    pricePerPage: 399,
    discount: 33,
    description: "最受欢迎的选择",
    features: [
      "内容结构优化",
      "Schema 标记",
      "AI 友好格式重写",
      "内链优化建议",
      "FAQ 内容创建",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "专业套餐",
    pages: 30,
    pricePerPage: 299,
    discount: 50,
    description: "适合中大型网站",
    features: [
      "内容结构优化",
      "Schema 标记",
      "AI 友好格式重写",
      "内链优化建议",
      "FAQ 内容创建",
      "llms.txt 配置",
    ],
  },
];

// 权威建设服务
export const authorityServices: AuthorityService[] = [
  {
    id: "entity-consistency",
    name: "实体一致性优化",
    description: "确保品牌名称和关键实体在全网保持一致，提升 AI 识别度",
    features: [
      "品牌名称一致性检查",
      "产品名称规范化",
      "跨平台实体统一",
      "知识图谱对齐建议",
    ],
    price: 599,
    unit: "次",
    turnaround: "3 个工作日",
  },
  {
    id: "citation-building",
    name: "引用来源建设",
    description: "在 AI 信任的第三方平台建立品牌存在，增加被引用概率",
    features: [
      "权威平台分析",
      "内容投放策略",
      "行业目录优化",
      "评测和提及获取",
    ],
    price: 2999,
    unit: "月",
    turnaround: "持续执行",
    popular: true,
  },
  {
    id: "about-page",
    name: "关于页面优化",
    description: "优化品牌关于页面，增强 AI 对品牌的信任度",
    features: [
      "品牌故事重构",
      "团队信息展示",
      "资质和奖项突出",
      "Organization Schema",
    ],
    price: 499,
    unit: "页",
    turnaround: "3 个工作日",
  },
];

// 计算关键词套餐价格
export function calculateKeywordPrice(packageId: string, platformCount: number): number {
  const pkg = keywordPackages.find(p => p.id === packageId);
  if (!pkg) return 0;
  return pkg.keywords * pkg.pricePerKeyword * platformCount;
}

// 计算页面套餐价格
export function calculatePagePrice(packageId: string): number {
  const pkg = pagePackages.find(p => p.id === packageId);
  if (!pkg) return 0;
  return pkg.pages * pkg.pricePerPage;
}

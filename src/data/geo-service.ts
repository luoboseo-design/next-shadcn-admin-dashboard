// GEO 优化服务 - 数据定义

export type ServiceType = "keyword" | "page" | "authority";

export type AiPlatform = "chatgpt" | "perplexity" | "gemini" | "claude" | "deepseek" | "doubao" | "kimi" | "metaai";

export interface AiPlatformInfo {
  id: AiPlatform;
  name: string;
  description: string;
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
    id: "deepseek",
    name: "DeepSeek",
    description: "国产大模型，性能强劲",
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
  {
    id: "metaai",
    name: "Meta AI",
    description: "Meta 出品，整合 Facebook/Instagram",
  },
];

// 关键词优化 - 按数量阶梯定价
export const keywordPricing = {
  pricePerKeyword: 299, // 单价 ¥299/词/平台
  turnaround: "5-7天",
  features: ["排名追踪报告", "优化建议", "效果保障"],
};

// 计算关键词价格（按实际数量）
export function calculateKeywordPrice(keywordCount: number, platformCount: number): number {
  return keywordCount * keywordPricing.pricePerKeyword * platformCount;
}

// 页面优化 - 按数量定价
export const pagePricing = {
  pricePerPage: 599, // 单价 ¥599/页
  turnaround: "3-5天",
  features: ["结构优化", "Schema标记", "AI友好重写"],
};

// 计算页面价格（按实际数量）
export function calculatePagePrice(pageCount: number): number {
  return pageCount * pagePricing.pricePerPage;
}

import type { PlatformType } from "@/types/marketing";

// DR等级类型
export type DRTier = "dr30" | "dr50" | "dr70" | "dr80";

export const drTierLabels: Record<DRTier, string> = {
  dr30: "DR 30+",
  dr50: "DR 50+",
  dr70: "DR 70+",
  dr80: "DR 80+",
};

// DR等级详情
export interface DRTierInfo {
  tier: DRTier;
  label: string;
  description: string;
  pricePerArticle: number;
  deliveryDays: string;
  features: string[];
  examples: string[];
}

export const drTierDetails: Record<DRTier, DRTierInfo> = {
  dr30: {
    tier: "dr30",
    label: "DR 30+",
    description: "入门级高质量外链，适合新站或预算有限的项目",
    pricePerArticle: 80,
    deliveryDays: "3-5天",
    features: [
      "DR 30-49 网站",
      "永久 Dofollow 链接",
      "原创文章 800+ 字",
      "相关行业网站",
    ],
    examples: ["行业博客", "垂直媒体", "专业论坛"],
  },
  dr50: {
    tier: "dr50",
    label: "DR 50+",
    description: "中等权重外链，适合常规SEO优化需求",
    pricePerArticle: 150,
    deliveryDays: "5-7天",
    features: [
      "DR 50-69 网站",
      "永久 Dofollow 链接",
      "原创文章 1000+ 字",
      "高流量网站",
      "内容审核保证",
    ],
    examples: ["Dev.to", "Hackernoon", "36氪", "虎嗅"],
  },
  dr70: {
    tier: "dr70",
    label: "DR 70+",
    description: "高权重外链，显著提升网站权威度",
    pricePerArticle: 350,
    deliveryDays: "7-14天",
    features: [
      "DR 70-79 网站",
      "永久 Dofollow 链接",
      "原创文章 1500+ 字",
      "权威媒体平台",
      "专业编辑润色",
      "效果追踪报告",
    ],
    examples: ["Entrepreneur", "Business Insider", "界面新闻"],
  },
  dr80: {
    tier: "dr80",
    label: "DR 80+",
    description: "顶级权重外链，快速建立行业权威",
    pricePerArticle: 800,
    deliveryDays: "14-21天",
    features: [
      "DR 80+ 顶级网站",
      "永久 Dofollow 链接",
      "原创文章 2000+ 字",
      "顶级媒体曝光",
      "专业内容策划",
      "优先发布排期",
      "定制化服务",
    ],
    examples: ["Forbes", "TechCrunch", "Wired", "Bloomberg"],
  },
};

// 内容创作模式
export type ContentMode = "ai" | "provided";

export const contentModeLabels: Record<ContentMode, string> = {
  ai: "AI 智能生成",
  provided: "自行提供文章",
};

export const contentModeDetails: Record<ContentMode, { description: string; features: string[] }> = {
  ai: {
    description: "提供主题和关键词，AI 自动生成高质量 SEO 友好文章",
    features: [
      "专业 AI 写作引擎",
      "SEO 优化结构",
      "原创度检测",
      "无限次修改",
    ],
  },
  provided: {
    description: "您提供已写好的文章，我们负责审核并发布到目标平台",
    features: [
      "保留原创风格",
      "专业编辑润色",
      "格式适配调整",
      "外链植入优化",
    ],
  },
};

// 服务套餐
export interface GuestPostPackage {
  id: string;
  name: string;
  description: string;
  articleCount: number;
  features: string[];
  discount?: number;
  recommended?: boolean;
}

export const guestPostPackages: GuestPostPackage[] = [
  {
    id: "starter",
    name: "入门版",
    description: "适合初次尝试客座文章",
    articleCount: 1,
    features: [
      "1 篇客座文章",
      "基础平台选择",
      "7 天交付",
      "1 个反向链接",
    ],
  },
  {
    id: "growth",
    name: "成长版",
    description: "适合持续内容营销",
    articleCount: 5,
    features: [
      "5 篇客座文章",
      "多平台分发",
      "14 天交付",
      "每篇 2 个反向链接",
      "关键词优化",
    ],
    discount: 10,
    recommended: true,
  },
  {
    id: "professional",
    name: "专业版",
    description: "适合品牌全面推广",
    articleCount: 10,
    features: [
      "10 篇客座文章",
      "高权重平台优先",
      "21 天交付",
      "每篇 3 个反向链接",
      "SEO 策略咨询",
      "效果追踪报告",
    ],
    discount: 15,
  },
  {
    id: "enterprise",
    name: "企业版",
    description: "大规模内容营销",
    articleCount: 30,
    features: [
      "30 篇客座文章",
      "精英平台专属",
      "45 天交付",
      "每篇 3 个反向链接",
      "专属内容策略师",
      "月度效果分析",
      "无限次修改",
    ],
    discount: 25,
  },
];

// 表单数据类型
export interface GuestPostFormData {
  // 基础信息
  websiteUrl: string;
  companyName: string;
  industry: string;
  
  // 内容设置
  contentMode: ContentMode;
  topics: string;
  keywords: string;
  articleContent?: string; // 用户提供文章时使用
  
  // DR选择
  drTier: DRTier;
  
  // 套餐选择
  packageId: string;
  
  // 定制需求
  customRequirements?: string;
}

// 兼容旧类型（保留以防其他地方使用）
export type GuestPostPlatformType = "tech" | "business" | "content" | "custom";
export type PlatformTier = "standard" | "premium" | "elite";

export const guestPostPlatformLabels: Record<GuestPostPlatformType, string> = {
  tech: "科技媒体",
  business: "商业媒体",
  content: "内容平台",
  custom: "定制",
};

export const platformTierLabels: Record<PlatformTier, string> = {
  standard: "标准版",
  premium: "高级版",
  elite: "精英版",
};

// 旧结构保留以防止编译错误
export interface GuestPostPlatformInfo {
  type: GuestPostPlatformType;
  label: string;
  description: string;
  features: string[];
  platforms: string[];
  tiers: {
    tier: PlatformTier;
    daRange: string;
    pricePerArticle: number;
    examples: string[];
  }[];
}

export const guestPostPlatformDetails: Record<GuestPostPlatformType, GuestPostPlatformInfo> = {
  tech: {
    type: "tech",
    label: "科技媒体",
    description: "在顶级科技媒体发布专业文章",
    features: [],
    platforms: [],
    tiers: [],
  },
  business: {
    type: "business",
    label: "商业媒体",
    description: "在商业财经媒体发布深度文章",
    features: [],
    platforms: [],
    tiers: [],
  },
  content: {
    type: "content",
    label: "内容平台",
    description: "在主流内容平台建立专栏影响力",
    features: [],
    platforms: [],
    tiers: [],
  },
  custom: {
    type: "custom",
    label: "定制",
    description: "根据您的特定需求定制方案",
    features: [],
    platforms: [],
    tiers: [],
  },
};

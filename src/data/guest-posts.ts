import type { PlatformType } from "@/types/marketing";

// 客座文章平台类型
export type GuestPostPlatformType = "tech" | "business" | "content" | "custom";

export const guestPostPlatformLabels: Record<GuestPostPlatformType, string> = {
  tech: "科技媒体",
  business: "商业媒体",
  content: "内容平台",
  custom: "定制",
};

// 平台等级
export type PlatformTier = "standard" | "premium" | "elite";

export const platformTierLabels: Record<PlatformTier, string> = {
  standard: "标准版",
  premium: "高级版",
  elite: "精英版",
};

// 平台详情
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
    description: "在顶级科技媒体发布专业文章，获取行业权威背书和高质量外链",
    features: [
      "科技行业权威平台",
      "精准技术受众",
      "高转载率",
      "利于品牌建设",
    ],
    platforms: ["TechCrunch", "Wired", "The Verge", "36氪", "虎嗅", "InfoQ"],
    tiers: [
      {
        tier: "standard",
        daRange: "DA 50-69",
        pricePerArticle: 150,
        examples: ["Dev.to", "Hackernoon", "DZone"],
      },
      {
        tier: "premium",
        daRange: "DA 70-84",
        pricePerArticle: 350,
        examples: ["VentureBeat", "TNW", "36氪"],
      },
      {
        tier: "elite",
        daRange: "DA 85+",
        pricePerArticle: 800,
        examples: ["TechCrunch", "Wired", "The Verge"],
      },
    ],
  },
  business: {
    type: "business",
    label: "商业媒体",
    description: "在商业财经媒体发布深度文章，提升企业公信力和品牌价值",
    features: [
      "商业决策者受众",
      "企业信誉背书",
      "高端品牌曝光",
      "投资人关注渠道",
    ],
    platforms: ["Forbes", "Entrepreneur", "Inc.", "创业邦", "界面新闻", "第一财经"],
    tiers: [
      {
        tier: "standard",
        daRange: "DA 50-69",
        pricePerArticle: 200,
        examples: ["Business2Community", "AllBusiness", "创业邦"],
      },
      {
        tier: "premium",
        daRange: "DA 70-84",
        pricePerArticle: 500,
        examples: ["Entrepreneur", "Inc.", "界面新闻"],
      },
      {
        tier: "elite",
        daRange: "DA 85+",
        pricePerArticle: 1200,
        examples: ["Forbes", "Bloomberg", "第一财经"],
      },
    ],
  },
  content: {
    type: "content",
    label: "内容平台",
    description: "在主流内容平台建立专栏影响力，持续输出高质量内容获取流量",
    features: [
      "大众内容平台",
      "SEO 友好",
      "易于长期运营",
      "性价比高",
    ],
    platforms: ["Medium", "知乎", "简书", "CSDN", "掘金", "Substack"],
    tiers: [
      {
        tier: "standard",
        daRange: "DA 60-74",
        pricePerArticle: 80,
        examples: ["简书", "CSDN", "博客园"],
      },
      {
        tier: "premium",
        daRange: "DA 75-89",
        pricePerArticle: 150,
        examples: ["知乎专栏", "掘金", "少数派"],
      },
      {
        tier: "elite",
        daRange: "DA 90+",
        pricePerArticle: 300,
        examples: ["Medium", "Substack", "知乎"],
      },
    ],
  },
  custom: {
    type: "custom",
    label: "定制",
    description: "根据您的特定需求，定制专属客座文章发布方案",
    features: [
      "一对一需求沟通",
      "行业专属平台",
      "灵活文章数量",
      "定制化报价",
    ],
    platforms: [],
    tiers: [],
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
  
  // 平台选择
  platformType: GuestPostPlatformType;
  platformTier: PlatformTier;
  
  // 套餐选择
  packageId: string;
  
  // 定制需求
  customRequirements?: string;
}

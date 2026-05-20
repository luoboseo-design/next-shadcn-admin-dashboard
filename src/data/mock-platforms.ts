import type { Platform, PlatformType } from "@/types/marketing";

// 生成模拟平台数据
function generatePlatforms(): Platform[] {
  const platformNames = [
    // 博客平台
    { name: "TechCrunch Blog", type: "blog" as PlatformType, category: "科技", da: 93 },
    { name: "Medium", type: "blog" as PlatformType, category: "综合", da: 96 },
    { name: "WordPress.com", type: "blog" as PlatformType, category: "综合", da: 94 },
    { name: "Blogger", type: "blog" as PlatformType, category: "综合", da: 89 },
    { name: "Ghost Blog", type: "blog" as PlatformType, category: "科技", da: 78 },
    { name: "Dev.to", type: "blog" as PlatformType, category: "技术", da: 85 },
    { name: "Hashnode", type: "blog" as PlatformType, category: "技术", da: 76 },
    // 论坛平台
    { name: "Reddit", type: "forum" as PlatformType, category: "综合", da: 97 },
    { name: "Quora", type: "forum" as PlatformType, category: "问答", da: 93 },
    { name: "Stack Overflow", type: "forum" as PlatformType, category: "技术", da: 92 },
    { name: "Product Hunt", type: "forum" as PlatformType, category: "产品", da: 89 },
    { name: "Hacker News", type: "forum" as PlatformType, category: "科技", da: 91 },
    { name: "Indie Hackers", type: "forum" as PlatformType, category: "创业", da: 72 },
    // 新闻站点
    { name: "PR Newswire", type: "news" as PlatformType, category: "新闻", da: 91 },
    { name: "Business Wire", type: "news" as PlatformType, category: "商业", da: 90 },
    { name: "EIN Presswire", type: "news" as PlatformType, category: "新闻", da: 85 },
    { name: "GlobeNewswire", type: "news" as PlatformType, category: "新闻", da: 88 },
    // 社交平台
    { name: "LinkedIn Articles", type: "social" as PlatformType, category: "商业", da: 99 },
    { name: "Pinterest", type: "social" as PlatformType, category: "图片", da: 94 },
    { name: "Tumblr", type: "social" as PlatformType, category: "博客", da: 86 },
    // 目录站点
    { name: "Yelp", type: "directory" as PlatformType, category: "本地", da: 94 },
    { name: "Yellow Pages", type: "directory" as PlatformType, category: "企业", da: 85 },
    { name: "Clutch", type: "directory" as PlatformType, category: "B2B", da: 81 },
    { name: "G2", type: "directory" as PlatformType, category: "软件", da: 89 },
    { name: "Capterra", type: "directory" as PlatformType, category: "软件", da: 86 },
    // Wiki
    { name: "Wikipedia", type: "wiki" as PlatformType, category: "百科", da: 100 },
    { name: "WikiHow", type: "wiki" as PlatformType, category: "教程", da: 93 },
    { name: "Fandom", type: "wiki" as PlatformType, category: "娱乐", da: 91 },
  ];

  const traffic = ["10K+", "50K+", "100K+", "500K+", "1M+", "5M+", "10M+"];
  const publishTimes = ["1-2小时", "2-4小时", "4-8小时", "1天", "2-3天"];

  const platforms: Platform[] = [];
  let id = 1;

  // 生成 1000 个平台
  for (let i = 0; i < 36; i++) {
    for (const base of platformNames) {
      const suffix = i > 0 ? ` ${i + 1}` : "";
      const daVariation = Math.floor(Math.random() * 20) - 10;

      platforms.push({
        id: `platform-${id++}`,
        name: `${base.name}${suffix}`,
        url: `https://${base.name.toLowerCase().replace(/\s+/g, "-")}.com`,
        type: base.type,
        domainAuthority: Math.max(20, Math.min(100, base.da + daVariation)),
        monthlyTraffic: traffic[Math.floor(Math.random() * traffic.length)],
        language: "en",
        acceptsDofollow: Math.random() > 0.3,
        averagePublishTime: publishTimes[Math.floor(Math.random() * publishTimes.length)],
        category: base.category,
      });

      if (platforms.length >= 1000) break;
    }
    if (platforms.length >= 1000) break;
  }

  return platforms;
}

export const mockPlatforms: Platform[] = generatePlatforms();

export function getPlatformsByType(type: PlatformType): Platform[] {
  return mockPlatforms.filter((p) => p.type === type);
}

export function getPlatformById(id: string): Platform | undefined {
  return mockPlatforms.find((p) => p.id === id);
}

export function getHighQualityPlatforms(minDA = 70): Platform[] {
  return mockPlatforms.filter((p) => p.domainAuthority >= minDA);
}

export const platformTypeLabels: Record<PlatformType, string> = {
  blog: "博客",
  forum: "论坛",
  news: "新闻站",
  social: "社交媒体",
  directory: "目录站",
  wiki: "维基百科",
  profile: "个人资料链接",
  custom: "定制",
};

// 每种平台类型的详细信息和定价
export interface PlatformTypeInfo {
  type: PlatformType;
  label: string;
  description: string;
  features: string[];
  pricePerLink: number;
  avgDA: number;
  avgPublishTime: string;
  totalPlatforms: number;
}

export const platformTypeDetails: Record<PlatformType, PlatformTypeInfo> = {
  blog: {
    type: "blog",
    label: "博客",
    description: "高质量博客平台发布原创文章，获取自然流量和权重传递",
    features: ["DA 50+ 优质博客平台", "原创文章内容", "永久保留链接", "适合内容营销"],
    pricePerLink: 12,
    avgDA: 65,
    avgPublishTime: "2-4小时",
    totalPlatforms: 350,
  },
  forum: {
    type: "forum",
    label: "论坛",
    description: "在高权重论坛发布专业讨论帖，建立行业影响力",
    features: ["Reddit/Quora 等高权重论坛", "专业问答形式", "真实用户互动", "适合品牌曝光"],
    pricePerLink: 8,
    avgDA: 75,
    avgPublishTime: "1-2小时",
    totalPlatforms: 200,
  },
  news: {
    type: "news",
    label: "新闻站",
    description: "通过新闻稿发布获取权威媒体背书，提升品牌可信度",
    features: ["PR Newswire 等权威平台", "新闻稿形式发布", "媒体广泛转载", "适合企业公关"],
    pricePerLink: 25,
    avgDA: 85,
    avgPublishTime: "4-8小时",
    totalPlatforms: 120,
  },
  social: {
    type: "social",
    label: "社交媒体",
    description: "在 LinkedIn、Pinterest 等社交平台建立内容矩阵",
    features: ["LinkedIn Articles 等平台", "社交信号传递", "病毒传播潜力", "适合个人品牌"],
    pricePerLink: 10,
    avgDA: 80,
    avgPublishTime: "1-2小时",
    totalPlatforms: 150,
  },
  directory: {
    type: "directory",
    label: "目录站",
    description: "企业目录和软件评测平台收录，提升本地 SEO 表现",
    features: ["Yelp/G2 等目录平台", "结构化企业信息", "本地SEO加成", "适合B2B企业"],
    pricePerLink: 15,
    avgDA: 70,
    avgPublishTime: "1-3天",
    totalPlatforms: 130,
  },
  wiki: {
    type: "wiki",
    label: "维基百科",
    description: "Wikipedia 等百科类平台引用，获取最高权重链接",
    features: ["Wikipedia 等顶级平台", "最高权重 DA 100", "严格内容审核", "适合知名品牌"],
    pricePerLink: 50,
    avgDA: 95,
    avgPublishTime: "3-7天",
    totalPlatforms: 50,
  },
  profile: {
    type: "profile",
    label: "个人资料链接",
    description: "在高权重平台创建企业/个人资料页面，获取稳定的品牌外链",
    features: ["LinkedIn/Crunchbase 等权威平台", "品牌官方形象展示", "永久性资料页面", "多平台矩阵布局"],
    pricePerLink: 6,
    avgDA: 70,
    avgPublishTime: "1-2天",
    totalPlatforms: 200,
  },
  custom: {
    type: "custom",
    label: "定制",
    description: "根据您的特殊需求，定制专属外链建设方案",
    features: ["一对一需求沟通", "专属外链策略", "灵活的平台选择", "定制化报价方案"],
    pricePerLink: 0,
    avgDA: 0,
    avgPublishTime: "需沟通确定",
    totalPlatforms: 0,
  },
};

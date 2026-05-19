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

export function getHighQualityPlatforms(minDA: number = 70): Platform[] {
  return mockPlatforms.filter((p) => p.domainAuthority >= minDA);
}

export const platformTypeLabels: Record<PlatformType, string> = {
  blog: "博客",
  forum: "论坛",
  news: "新闻站",
  social: "社交媒体",
  directory: "目录站",
  wiki: "维基百科",
};

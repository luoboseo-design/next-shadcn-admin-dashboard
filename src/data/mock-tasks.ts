import type { BacklinkTask, PublishResult, ServicePackage, UserStats } from "@/types/marketing";

// 服务套餐
export const servicePackages: ServicePackage[] = [
  {
    id: "starter",
    name: "入门版",
    description: "适合个人博客和小型网站",
    quantity: 10,
    pricePerLink: 0.5,
    totalPrice: 5,
    features: ["10 条高质量外链", "DA 40+ 平台", "手动审核", "7天内完成", "基础报告"],
  },
  {
    id: "growth",
    name: "成长版",
    description: "适合成长期企业网站",
    quantity: 50,
    pricePerLink: 0.4,
    totalPrice: 20,
    features: ["50 条高质量外链", "DA 50+ 平台", "AI 智能匹配", "5天内完成", "详细分析报告", "关键词优化建议"],
    recommended: true,
  },
  {
    id: "professional",
    name: "专业版",
    description: "适合中大型企业",
    quantity: 100,
    pricePerLink: 0.5,
    totalPrice: 50,
    features: [
      "100 条高质量外链",
      "DA 60+ 平台",
      "AI 内容生成",
      "3天内完成",
      "完整SEO分析",
      "1对1顾问服务",
      "30天排名保障",
    ],
    discount: 15,
  },
  {
    id: "enterprise",
    name: "企业版",
    description: "大规模SEO推广",
    quantity: 500,
    pricePerLink: 0.24,
    totalPrice: 120,
    features: [
      "500 条高质量外链",
      "DA 70+ 优质平台",
      "全自动AI处理",
      "优先处理",
      "专属客户经理",
      "月度SEO报告",
      "无限次修改",
      "90天排名保障",
    ],
    discount: 20,
  },
];

// 模拟发布结果
function generatePublishResults(count: number, taskId: string): PublishResult[] {
  const platforms = [
    { name: "Medium", url: "medium.com" },
    { name: "Dev.to", url: "dev.to" },
    { name: "Hashnode", url: "hashnode.dev" },
    { name: "Reddit", url: "reddit.com" },
    { name: "LinkedIn", url: "linkedin.com" },
    { name: "Quora", url: "quora.com" },
    { name: "WordPress", url: "wordpress.com" },
    { name: "Blogger", url: "blogger.com" },
    { name: "Tumblr", url: "tumblr.com" },
    { name: "Ghost", url: "ghost.org" },
  ];

  const results: PublishResult[] = [];
  for (let i = 0; i < count; i++) {
    const platform = platforms[i % platforms.length];
    const status = Math.random() > 0.1 ? "success" : Math.random() > 0.5 ? "pending" : "failed";

    results.push({
      id: `result-${taskId}-${i + 1}`,
      platformId: `platform-${i + 1}`,
      platformName: `${platform.name} ${Math.floor(i / 10) + 1}`,
      platformUrl: `https://${platform.url}`,
      publishUrl: status === "success" ? `https://${platform.url}/p/${taskId.slice(-6)}-article-${i + 1}` : "",
      status,
      title: `专业SEO优化指南 - 第${i + 1}篇`,
      anchorText: "SEO优化",
      accountInfo:
        status === "success"
          ? {
              username: `user_${taskId.slice(-4)}_${i + 1}`,
              password: `Pass@${Math.random().toString(36).slice(-8)}`,
              email: `account${i + 1}@temp-mail.com`,
            }
          : undefined,
      publishedAt: status === "success" ? new Date(Date.now() - Math.random() * 86400000 * 3) : undefined,
      errorMessage: status === "failed" ? "平台审核未通过" : undefined,
    });
  }
  return results;
}

// 模拟任务数据
export const mockTasks: BacklinkTask[] = [
  {
    id: "task-001",
    targetUrl: "https://example.com",
    keywords: ["SEO优化", "网站推广", "外链建设"],
    anchorTexts: ["SEO服务", "专业推广"],
    quantity: 50,
    platformTypes: ["blog", "forum", "news"],
    status: "completed",
    progress: 100,
    currentStep: "任务完成",
    publishResults: generatePublishResults(50, "task-001"),
    totalPlatforms: 50,
    completedPlatforms: 48,
    successRate: 96,
    pricing: {
      packageName: "成长版",
      quantity: 50,
      pricePerLink: 12,
      totalPrice: 600,
      currency: "USD",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-18"),
    completedAt: new Date("2024-01-18"),
    acceptedAt: new Date("2024-01-19"),
  },
  {
    id: "task-002",
    targetUrl: "https://myshop.com",
    keywords: ["电商平台", "在线购物", "品牌推广"],
    anchorTexts: ["优质商品", "正品保障"],
    quantity: 100,
    platformTypes: ["blog", "social", "directory"],
    status: "awaiting",
    progress: 100,
    currentStep: "等待验收",
    publishResults: generatePublishResults(100, "task-002"),
    totalPlatforms: 100,
    completedPlatforms: 95,
    successRate: 95,
    pricing: {
      packageName: "专业版",
      quantity: 100,
      pricePerLink: 10,
      totalPrice: 1000,
      currency: "USD",
    },
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-23"),
    completedAt: new Date("2024-01-23"),
  },
  {
    id: "task-003",
    targetUrl: "https://techblog.io",
    keywords: ["技术博客", "编程教程", "开发者"],
    anchorTexts: ["学习编程", "技术分享"],
    quantity: 30,
    platformTypes: ["blog", "forum"],
    status: "publishing",
    progress: 65,
    currentStep: "正在发布到 Dev.to",
    publishResults: generatePublishResults(20, "task-003"),
    totalPlatforms: 30,
    completedPlatforms: 20,
    successRate: 100,
    pricing: {
      packageName: "入门版",
      quantity: 30,
      pricePerLink: 15,
      totalPrice: 450,
      currency: "USD",
    },
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date(),
  },
  {
    id: "task-004",
    targetUrl: "https://startup.co",
    keywords: ["创业公司", "融资", "商业模式"],
    anchorTexts: ["创新创业", "投资机会"],
    quantity: 20,
    platformTypes: ["news", "forum"],
    status: "analyzing",
    progress: 15,
    currentStep: "AI 正在分析关键词...",
    publishResults: [],
    totalPlatforms: 20,
    completedPlatforms: 0,
    successRate: 0,
    pricing: {
      packageName: "入门版",
      quantity: 20,
      pricePerLink: 15,
      totalPrice: 300,
      currency: "USD",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "task-005",
    targetUrl: "https://saasproduct.com",
    keywords: ["SaaS", "云服务", "企业软件"],
    anchorTexts: ["SaaS解决方案", "云端服务"],
    quantity: 10,
    platformTypes: ["blog"],
    status: "pending",
    progress: 0,
    currentStep: "等待处理",
    publishResults: [],
    totalPlatforms: 10,
    completedPlatforms: 0,
    successRate: 0,
    pricing: {
      packageName: "入门版",
      quantity: 10,
      pricePerLink: 15,
      totalPrice: 150,
      currency: "USD",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 用户统计
export const mockUserStats: UserStats = {
  totalTasks: 5,
  completedTasks: 2,
  totalLinks: 210,
  successfulLinks: 198,
  pendingTasks: 3,
  totalSpent: 2500,
};

// 辅助函数
export function getTaskById(id: string): BacklinkTask | undefined {
  return mockTasks.find((t) => t.id === id);
}

export function getTasksByStatus(status: BacklinkTask["status"]): BacklinkTask[] {
  return mockTasks.filter((t) => t.status === status);
}

export const taskStatusLabels: Record<BacklinkTask["status"], string> = {
  pending: "待处理",
  analyzing: "AI分析中",
  publishing: "发布中",
  awaiting: "待验收",
  completed: "已完成",
  failed: "失败",
};

export const taskStatusColors: Record<BacklinkTask["status"], string> = {
  pending: "bg-muted text-muted-foreground",
  analyzing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  publishing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  awaiting: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

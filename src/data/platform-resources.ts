// 平台资源库数据 - admin 资源管理与前端 Platform 类型对齐的共享来源
// 字段命名与 src/types/marketing.ts 的 Platform 保持一致(domainAuthority / acceptsDofollow)
// DA 值与 src/data/mock-platforms.ts 的基准数据一致

import type { PlatformType } from "@/types/marketing";

export type ResourceStatus = "active" | "warning" | "inactive";

export interface PlatformResource {
  id: string;
  name: string;
  url: string;
  type: PlatformType;
  /** 与前端 Platform.domainAuthority 同名同义 */
  domainAuthority: number;
  domainRating: number;
  category: string;
  language: string;
  /** 与前端 Platform.acceptsDofollow 同名同义 */
  acceptsDofollow: boolean;
  // ===== admin 运营专属字段 =====
  canRegister: boolean;
  registrationUrl: string;
  status: ResourceStatus;
  accountsCount: number;
  availableAccounts: number;
  successRate: number;
  lastUsed: string; // YYYY-MM-DD HH:mm
}

/** SEO 博客站点资源(DA 与 mock-platforms 基准值一致) */
export const blogResources: PlatformResource[] = [
  {
    id: "blog-001",
    name: "Medium",
    url: "https://medium.com",
    type: "blog",
    domainAuthority: 96,
    domainRating: 94,
    category: "综合",
    language: "英文",
    acceptsDofollow: true,
    canRegister: true,
    registrationUrl: "https://medium.com/m/signin",
    status: "active",
    accountsCount: 45,
    availableAccounts: 38,
    successRate: 98,
    lastUsed: "2024-01-25 14:30",
  },
  {
    id: "blog-002",
    name: "WordPress.com",
    url: "https://wordpress.com",
    type: "blog",
    domainAuthority: 94,
    domainRating: 91,
    category: "综合",
    language: "多语言",
    acceptsDofollow: true,
    canRegister: true,
    registrationUrl: "https://wordpress.com/start",
    status: "active",
    accountsCount: 62,
    availableAccounts: 55,
    successRate: 95,
    lastUsed: "2024-01-25 14:25",
  },
  {
    id: "blog-003",
    name: "Blogger",
    url: "https://blogger.com",
    type: "blog",
    domainAuthority: 89,
    domainRating: 87,
    category: "综合",
    language: "多语言",
    acceptsDofollow: false,
    canRegister: true,
    registrationUrl: "https://blogger.com/create-blog",
    status: "warning",
    accountsCount: 30,
    availableAccounts: 8,
    successRate: 75,
    lastUsed: "2024-01-25 13:50",
  },
  {
    id: "blog-004",
    name: "Dev.to",
    url: "https://dev.to",
    type: "blog",
    domainAuthority: 85,
    domainRating: 83,
    category: "技术",
    language: "英文",
    acceptsDofollow: true,
    canRegister: true,
    registrationUrl: "https://dev.to/enter",
    status: "active",
    accountsCount: 38,
    availableAccounts: 32,
    successRate: 96,
    lastUsed: "2024-01-25 13:45",
  },
  {
    id: "blog-005",
    name: "Hashnode",
    url: "https://hashnode.com",
    type: "blog",
    domainAuthority: 76,
    domainRating: 74,
    category: "技术",
    language: "英文",
    acceptsDofollow: true,
    canRegister: true,
    registrationUrl: "https://hashnode.com/onboard",
    status: "active",
    accountsCount: 28,
    availableAccounts: 25,
    successRate: 97,
    lastUsed: "2024-01-25 12:30",
  },
  {
    id: "blog-006",
    name: "Ghost Blog",
    url: "https://ghost.org",
    type: "blog",
    domainAuthority: 78,
    domainRating: 76,
    category: "科技",
    language: "英文",
    acceptsDofollow: true,
    canRegister: true,
    registrationUrl: "https://ghost.org/signup",
    status: "active",
    accountsCount: 20,
    availableAccounts: 16,
    successRate: 92,
    lastUsed: "2024-01-25 14:10",
  },
  {
    id: "blog-007",
    name: "TechCrunch Blog",
    url: "https://techcrunch.com",
    type: "blog",
    domainAuthority: 93,
    domainRating: 91,
    category: "科技",
    language: "英文",
    acceptsDofollow: false,
    canRegister: false,
    registrationUrl: "",
    status: "inactive",
    accountsCount: 5,
    availableAccounts: 0,
    successRate: 0,
    lastUsed: "2024-01-20 10:00",
  },
  {
    id: "blog-008",
    name: "Tumblr",
    url: "https://tumblr.com",
    type: "blog",
    domainAuthority: 86,
    domainRating: 84,
    category: "博客",
    language: "多语言",
    acceptsDofollow: true,
    canRegister: true,
    registrationUrl: "https://tumblr.com/register",
    status: "active",
    accountsCount: 33,
    availableAccounts: 27,
    successRate: 93,
    lastUsed: "2024-01-25 11:40",
  },
];

export const resourceStatusConfig: Record<ResourceStatus, { label: string; color: string }> = {
  active: { label: "正常", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  warning: { label: "警告", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  inactive: { label: "停用", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

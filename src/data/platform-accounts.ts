// 账号中心 - 第 3 层：账号池（成品）
// 跨平台聚合所有可用账号，供工作流按 dailyLimit 调度取用
// 各平台子页的账号池均从此处聚合，替代原先分散的内联数据

import type { PlatformType } from "@/types/marketing";

export type AccountHealth = "healthy" | "cooldown" | "limited" | "banned";

export const accountHealthConfig: Record<
  AccountHealth,
  { label: string; tone: "success" | "warning" | "muted" | "danger" }
> = {
  healthy: { label: "正常", tone: "success" },
  cooldown: { label: "冷却中", tone: "warning" },
  limited: { label: "受限", tone: "muted" },
  banned: { label: "已封禁", tone: "danger" },
};

export interface PlatformAccount {
  id: string;
  platform: PlatformType;
  platformName: string;
  username: string;
  /** 关联的邮箱池条目 id（来自身份资源） */
  emailId: string;
  email: string;
  /** 绑定的代理条目 id */
  proxyId: string;
  health: AccountHealth;
  /** 账龄天数，反映养号成熟度 */
  ageDays: number;
  /** 每日发布上限 */
  dailyLimit: number;
  /** 今日已使用 */
  usedToday: number;
  /** 累计发布数 */
  totalPublished: number;
  lastUsed: string | null;
}

export const platformAccounts: PlatformAccount[] = [
  {
    id: "acc-001",
    platform: "blog",
    platformName: "Medium",
    username: "growth_writer_01",
    emailId: "em-001",
    email: "growth.marketing01@gmail.com",
    proxyId: "px-001",
    health: "healthy",
    ageDays: 42,
    dailyLimit: 5,
    usedToday: 2,
    totalPublished: 128,
    lastUsed: "2024-01-25 14:20",
  },
  {
    id: "acc-002",
    platform: "blog",
    platformName: "Dev.to",
    username: "seo_dev_02",
    emailId: "em-002",
    email: "seo.builder02@gmail.com",
    proxyId: "px-002",
    health: "healthy",
    ageDays: 38,
    dailyLimit: 4,
    usedToday: 4,
    totalPublished: 96,
    lastUsed: "2024-01-25 11:05",
  },
  {
    id: "acc-003",
    platform: "blog",
    platformName: "Hashnode",
    username: "content_hub_03",
    emailId: "em-007",
    email: "campaign06@luoboseo.dev",
    proxyId: "px-006",
    health: "healthy",
    ageDays: 15,
    dailyLimit: 3,
    usedToday: 0,
    totalPublished: 24,
    lastUsed: "2024-01-25 08:15",
  },
  {
    id: "acc-004",
    platform: "social",
    platformName: "Twitter / X",
    username: "@brandreach01",
    emailId: "em-001",
    email: "growth.marketing01@gmail.com",
    proxyId: "px-001",
    health: "cooldown",
    ageDays: 60,
    dailyLimit: 10,
    usedToday: 10,
    totalPublished: 340,
    lastUsed: "2024-01-25 13:50",
  },
  {
    id: "acc-005",
    platform: "social",
    platformName: "Reddit",
    username: "u/marketing_pro_02",
    emailId: "em-002",
    email: "seo.builder02@gmail.com",
    proxyId: "px-002",
    health: "limited",
    ageDays: 90,
    dailyLimit: 3,
    usedToday: 1,
    totalPublished: 210,
    lastUsed: "2024-01-24 22:10",
  },
  {
    id: "acc-006",
    platform: "social",
    platformName: "LinkedIn",
    username: "digital-pr-team",
    emailId: "em-004",
    email: "outreach03@protonmail.com",
    proxyId: "px-004",
    health: "healthy",
    ageDays: 120,
    dailyLimit: 8,
    usedToday: 3,
    totalPublished: 156,
    lastUsed: "2024-01-25 09:30",
  },
  {
    id: "acc-007",
    platform: "forum",
    platformName: "Quora",
    username: "expert_answers_01",
    emailId: "em-001",
    email: "growth.marketing01@gmail.com",
    proxyId: "px-001",
    health: "healthy",
    ageDays: 75,
    dailyLimit: 5,
    usedToday: 2,
    totalPublished: 88,
    lastUsed: "2024-01-25 10:00",
  },
  {
    id: "acc-008",
    platform: "social",
    platformName: "LinkedIn",
    username: "growth-hacker-05",
    emailId: "em-006",
    email: "linkbuilder05@gmail.com",
    proxyId: "px-003",
    health: "banned",
    ageDays: 30,
    dailyLimit: 0,
    usedToday: 0,
    totalPublished: 12,
    lastUsed: "2024-01-22 16:40",
  },
];

export const platformAccountLabels: Record<PlatformType, string> = {
  blog: "博客",
  forum: "论坛",
  social: "社交媒体",
  news: "新闻媒体",
  directory: "目录站点",
  wiki: "百科站点",
  profile: "资料站点",
  custom: "自定义",
};

export const accountStats = {
  total: platformAccounts.length,
  healthy: platformAccounts.filter((a) => a.health === "healthy").length,
  cooldown: platformAccounts.filter((a) => a.health === "cooldown").length,
  banned: platformAccounts.filter((a) => a.health === "banned").length,
  /** 今日可用余量（未达每日上限的正常账号） */
  availableToday: platformAccounts.filter((a) => a.health === "healthy" && a.usedToday < a.dailyLimit).length,
};

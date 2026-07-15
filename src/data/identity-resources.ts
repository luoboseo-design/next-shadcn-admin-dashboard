// 账号中心 - 第 1 层：身份资源池（原材料）
// 邮箱池 / 代理 IP 池 / 接码平台，供注册流水线消费
// 这是「导入 Gmail 账号密码」「配置代理」的数据来源

// ==================== 邮箱池 ====================

export type EmailProvider = "gmail" | "outlook" | "proton" | "catchall" | "custom";
export type EmailStatus = "available" | "in_use" | "assigned" | "banned" | "cooldown";

export interface EmailAccount {
  id: string;
  email: string;
  /** 演示用途，真实系统应加密存储，不在前端明文展示 */
  passwordMasked: string;
  provider: EmailProvider;
  status: EmailStatus;
  /** 已用于注册的平台账号数 */
  boundAccounts: number;
  /** 是否已完成邮箱可用性验证 */
  verified: boolean;
  recoveryEmail?: string;
  createdAt: string;
  lastUsed: string | null;
}

export const emailProviderLabels: Record<EmailProvider, string> = {
  gmail: "Gmail",
  outlook: "Outlook",
  proton: "ProtonMail",
  catchall: "Catch-all 域名",
  custom: "自定义",
};

export const emailStatusConfig: Record<
  EmailStatus,
  { label: string; tone: "success" | "warning" | "danger" | "muted" | "info" }
> = {
  available: { label: "可用", tone: "success" },
  in_use: { label: "使用中", tone: "info" },
  assigned: { label: "已分配", tone: "muted" },
  banned: { label: "已封禁", tone: "danger" },
  cooldown: { label: "冷却中", tone: "warning" },
};

export const emailPool: EmailAccount[] = [
  {
    id: "em-001",
    email: "growth.marketing01@gmail.com",
    passwordMasked: "••••••••",
    provider: "gmail",
    status: "in_use",
    boundAccounts: 4,
    verified: true,
    recoveryEmail: "backup01@outlook.com",
    createdAt: "2024-01-10",
    lastUsed: "2024-01-25 14:20",
  },
  {
    id: "em-002",
    email: "seo.builder02@gmail.com",
    passwordMasked: "••••••••",
    provider: "gmail",
    status: "in_use",
    boundAccounts: 3,
    verified: true,
    createdAt: "2024-01-10",
    lastUsed: "2024-01-25 11:05",
  },
  {
    id: "em-003",
    email: "content.team@luoboseo.dev",
    passwordMasked: "••••••••",
    provider: "catchall",
    status: "available",
    boundAccounts: 0,
    verified: true,
    createdAt: "2024-01-12",
    lastUsed: null,
  },
  {
    id: "em-004",
    email: "outreach03@protonmail.com",
    passwordMasked: "••••••••",
    provider: "proton",
    status: "cooldown",
    boundAccounts: 2,
    verified: true,
    createdAt: "2024-01-08",
    lastUsed: "2024-01-24 09:30",
  },
  {
    id: "em-005",
    email: "digital.pr04@outlook.com",
    passwordMasked: "••••••••",
    provider: "outlook",
    status: "available",
    boundAccounts: 0,
    verified: false,
    createdAt: "2024-01-20",
    lastUsed: null,
  },
  {
    id: "em-006",
    email: "linkbuilder05@gmail.com",
    passwordMasked: "••••••••",
    provider: "gmail",
    status: "banned",
    boundAccounts: 1,
    verified: true,
    createdAt: "2024-01-05",
    lastUsed: "2024-01-22 16:40",
  },
  {
    id: "em-007",
    email: "campaign06@luoboseo.dev",
    passwordMasked: "••••••••",
    provider: "catchall",
    status: "assigned",
    boundAccounts: 1,
    verified: true,
    createdAt: "2024-01-15",
    lastUsed: "2024-01-25 08:15",
  },
  {
    id: "em-008",
    email: "publisher07@luoboseo.dev",
    passwordMasked: "••••••••",
    provider: "catchall",
    status: "available",
    boundAccounts: 0,
    verified: true,
    createdAt: "2024-01-18",
    lastUsed: null,
  },
];

// ==================== 代理 IP 池 ====================

export type ProxyType = "residential" | "datacenter" | "mobile";
export type ProxyStatus = "healthy" | "slow" | "dead";

export interface ProxyEntry {
  id: string;
  label: string;
  type: ProxyType;
  country: string;
  countryCode: string;
  /** 脱敏 IP */
  ipMasked: string;
  status: ProxyStatus;
  /** 绑定的账号数 */
  boundAccounts: number;
  latencyMs: number;
  lastChecked: string;
}

export const proxyTypeLabels: Record<ProxyType, string> = {
  residential: "住宅代理",
  datacenter: "数据中心",
  mobile: "移动代理",
};

export const proxyStatusConfig: Record<ProxyStatus, { label: string; tone: "success" | "warning" | "danger" }> = {
  healthy: { label: "健康", tone: "success" },
  slow: { label: "延迟高", tone: "warning" },
  dead: { label: "失效", tone: "danger" },
};

export const proxyPool: ProxyEntry[] = [
  {
    id: "px-001",
    label: "US-Residential-01",
    type: "residential",
    country: "美国",
    countryCode: "US",
    ipMasked: "104.28.xxx.x12",
    status: "healthy",
    boundAccounts: 3,
    latencyMs: 82,
    lastChecked: "2024-01-25 14:00",
  },
  {
    id: "px-002",
    label: "US-Residential-02",
    type: "residential",
    country: "美国",
    countryCode: "US",
    ipMasked: "172.58.xxx.90",
    status: "healthy",
    boundAccounts: 2,
    latencyMs: 95,
    lastChecked: "2024-01-25 14:00",
  },
  {
    id: "px-003",
    label: "UK-Residential-01",
    type: "residential",
    country: "英国",
    countryCode: "GB",
    ipMasked: "81.99.xxx.31",
    status: "slow",
    boundAccounts: 2,
    latencyMs: 240,
    lastChecked: "2024-01-25 13:30",
  },
  {
    id: "px-004",
    label: "DE-Mobile-01",
    type: "mobile",
    country: "德国",
    countryCode: "DE",
    ipMasked: "91.20.xxx.77",
    status: "healthy",
    boundAccounts: 1,
    latencyMs: 110,
    lastChecked: "2024-01-25 14:00",
  },
  {
    id: "px-005",
    label: "SG-Datacenter-01",
    type: "datacenter",
    country: "新加坡",
    countryCode: "SG",
    ipMasked: "159.89.xxx.44",
    status: "dead",
    boundAccounts: 0,
    latencyMs: 0,
    lastChecked: "2024-01-25 10:00",
  },
  {
    id: "px-006",
    label: "US-Residential-03",
    type: "residential",
    country: "美国",
    countryCode: "US",
    ipMasked: "68.183.xxx.21",
    status: "healthy",
    boundAccounts: 0,
    latencyMs: 76,
    lastChecked: "2024-01-25 14:00",
  },
];

// ==================== 接码平台 ====================

export type SmsStatus = "connected" | "low_balance" | "disconnected";

export interface SmsProvider {
  id: string;
  name: string;
  status: SmsStatus;
  /** 演示余额，单位美元 */
  balance: number;
  /** 支持的国家/地区码 */
  countries: string[];
  usedThisMonth: number;
  successRate: number;
}

export const smsStatusConfig: Record<SmsStatus, { label: string; tone: "success" | "warning" | "danger" }> = {
  connected: { label: "已连接", tone: "success" },
  low_balance: { label: "余额不足", tone: "warning" },
  disconnected: { label: "未连接", tone: "danger" },
};

export const smsProviders: SmsProvider[] = [
  {
    id: "sms-001",
    name: "SMS-Activate",
    status: "connected",
    balance: 42.5,
    countries: ["US", "GB", "DE", "FR"],
    usedThisMonth: 128,
    successRate: 94,
  },
  {
    id: "sms-002",
    name: "5SIM",
    status: "low_balance",
    balance: 3.2,
    countries: ["US", "RU", "IN"],
    usedThisMonth: 56,
    successRate: 89,
  },
  {
    id: "sms-003",
    name: "Twilio",
    status: "disconnected",
    balance: 0,
    countries: ["US", "CA"],
    usedThisMonth: 0,
    successRate: 0,
  },
];

// ==================== 汇总统计 ====================

export const identityStats = {
  emailTotal: emailPool.length,
  emailAvailable: emailPool.filter((e) => e.status === "available").length,
  proxyTotal: proxyPool.length,
  proxyHealthy: proxyPool.filter((p) => p.status === "healthy").length,
  smsConnected: smsProviders.filter((s) => s.status === "connected").length,
  smsBalance: smsProviders.reduce((sum, s) => sum + s.balance, 0),
};

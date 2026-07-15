// 账号中心 - 第 2 层：注册流水线（加工厂）
// 对应工作流「账号获取」步骤，把身份资源加工成可用平台账号
// 状态机：待注册 → 注册中 → 待验证 → 养号中 → 可用 / 失败

import type { PlatformType } from "@/types/marketing";

export type RegistrationStage =
  | "queued" // 待注册
  | "registering" // 注册中
  | "verifying" // 待验证（邮箱/手机）
  | "warming" // 养号中（预热）
  | "completed" // 已成功入池
  | "failed"; // 失败

export const registrationStageConfig: Record<
  RegistrationStage,
  { label: string; tone: "muted" | "info" | "warning" | "success" | "danger"; order: number }
> = {
  queued: { label: "待注册", tone: "muted", order: 0 },
  registering: { label: "注册中", tone: "info", order: 1 },
  verifying: { label: "待验证", tone: "warning", order: 2 },
  warming: { label: "养号中", tone: "info", order: 3 },
  completed: { label: "已完成", tone: "success", order: 4 },
  failed: { label: "失败", tone: "danger", order: 5 },
};

export type VerifyMethod = "email" | "sms" | "none";

export interface RegistrationJob {
  id: string;
  platform: PlatformType;
  platformName: string;
  /** 使用的邮箱池条目 id */
  emailId: string;
  email: string;
  /** 使用的代理条目 id */
  proxyId: string;
  proxyLabel: string;
  verifyMethod: VerifyMethod;
  stage: RegistrationStage;
  /** 当前阶段进度 0-100 */
  progress: number;
  /** 失败原因（stage=failed 时有值） */
  failureReason?: string;
  /** 可重试 */
  retryable: boolean;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

export const registrationQueue: RegistrationJob[] = [
  {
    id: "reg-001",
    platform: "blog",
    platformName: "Medium",
    emailId: "em-003",
    email: "content.team@luoboseo.dev",
    proxyId: "px-001",
    proxyLabel: "US-Residential-01",
    verifyMethod: "email",
    stage: "warming",
    progress: 60,
    retryable: false,
    attempts: 1,
    createdAt: "2024-01-25 09:00",
    updatedAt: "2024-01-25 14:20",
  },
  {
    id: "reg-002",
    platform: "social",
    platformName: "Twitter / X",
    emailId: "em-008",
    email: "publisher07@luoboseo.dev",
    proxyId: "px-002",
    proxyLabel: "US-Residential-02",
    verifyMethod: "sms",
    stage: "verifying",
    progress: 45,
    retryable: false,
    attempts: 1,
    createdAt: "2024-01-25 10:30",
    updatedAt: "2024-01-25 14:05",
  },
  {
    id: "reg-003",
    platform: "blog",
    platformName: "Dev.to",
    emailId: "em-003",
    email: "content.team@luoboseo.dev",
    proxyId: "px-004",
    proxyLabel: "DE-Mobile-01",
    verifyMethod: "email",
    stage: "registering",
    progress: 20,
    retryable: false,
    attempts: 1,
    createdAt: "2024-01-25 13:40",
    updatedAt: "2024-01-25 13:50",
  },
  {
    id: "reg-004",
    platform: "social",
    platformName: "Reddit",
    emailId: "em-005",
    email: "digital.pr04@outlook.com",
    proxyId: "px-003",
    proxyLabel: "UK-Residential-01",
    verifyMethod: "email",
    stage: "queued",
    progress: 0,
    retryable: false,
    attempts: 0,
    createdAt: "2024-01-25 14:00",
    updatedAt: "2024-01-25 14:00",
  },
  {
    id: "reg-005",
    platform: "social",
    platformName: "LinkedIn",
    emailId: "em-006",
    email: "linkbuilder05@gmail.com",
    proxyId: "px-005",
    proxyLabel: "SG-Datacenter-01",
    verifyMethod: "sms",
    stage: "failed",
    progress: 0,
    failureReason: "代理 IP 失效，且手机验证码接收超时",
    retryable: true,
    attempts: 2,
    createdAt: "2024-01-25 08:00",
    updatedAt: "2024-01-25 08:45",
  },
  {
    id: "reg-006",
    platform: "forum",
    platformName: "Quora",
    emailId: "em-005",
    email: "digital.pr04@outlook.com",
    proxyId: "px-006",
    proxyLabel: "US-Residential-03",
    verifyMethod: "email",
    stage: "failed",
    progress: 0,
    failureReason: "邮箱未通过平台风控校验",
    retryable: true,
    attempts: 1,
    createdAt: "2024-01-25 11:20",
    updatedAt: "2024-01-25 11:35",
  },
  {
    id: "reg-007",
    platform: "blog",
    platformName: "Hashnode",
    emailId: "em-008",
    email: "publisher07@luoboseo.dev",
    proxyId: "px-006",
    proxyLabel: "US-Residential-03",
    verifyMethod: "email",
    stage: "completed",
    progress: 100,
    retryable: false,
    attempts: 1,
    createdAt: "2024-01-24 15:00",
    updatedAt: "2024-01-25 09:10",
  },
];

export const registrationStats = {
  total: registrationQueue.length,
  active: registrationQueue.filter((j) => ["registering", "verifying", "warming"].includes(j.stage)).length,
  queued: registrationQueue.filter((j) => j.stage === "queued").length,
  failed: registrationQueue.filter((j) => j.stage === "failed").length,
  completedToday: registrationQueue.filter((j) => j.stage === "completed").length,
};

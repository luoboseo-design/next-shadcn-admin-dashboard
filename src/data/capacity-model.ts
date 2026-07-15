// 产能与调度中枢 - 计算模型
// 把"资源（账号）"翻译成"产能（能接多少单/几天交付/还剩多少余量）"
//
// 度量模型：
//  - 基础原子 = 每账号每日发布上限 dailyLimit（发布吞吐是真正瓶颈）
//  - 分组维度 = PlatformType（按平台类型聚合成"日产能"）
//  - 资格过滤 = DA 等级（套餐门槛，非产能本身）
//  - 仅 health === "healthy" 的账号计入可用产能

import type { PlatformType } from "@/types/marketing";

import { mockTasks, type ServiceCategory } from "./mock-tasks";
import { type PlatformAccount, platformAccountLabels, platformAccounts } from "./platform-accounts";

/** 计划周期（天）：用于把日产能换算成"月度可承接量" */
export const PLANNING_HORIZON_DAYS = 30;

/** 消耗账号池的平台类型（custom/wiki/profile 走人工，无账号池） */
export const ACCOUNT_BASED_TYPES: PlatformType[] = ["blog", "forum", "news", "social", "directory"];

/** SEO 外链套餐相关的平台类型（用于套餐承接力测算） */
export const BACKLINK_TYPES: PlatformType[] = ["blog", "forum", "news"];

/** 服务类别 → 消耗的资源（平台类型）映射规则 */
export const serviceResourceMap: Record<
  ServiceCategory,
  { label: string; consumesPlatformTypes: PlatformType[]; unitLabel: string; note?: string }
> = {
  seo: { label: "SEO 服务", consumesPlatformTypes: ["blog", "forum", "news"], unitLabel: "外链" },
  geo: {
    label: "GEO 服务",
    consumesPlatformTypes: ["custom"],
    unitLabel: "优化项",
    note: "GEO 以内容与引用优化为主，走人工处理，不占用账号池",
  },
  social: { label: "社交媒体", consumesPlatformTypes: ["social"], unitLabel: "互动" },
  news: { label: "发稿服务", consumesPlatformTypes: ["news"], unitLabel: "发稿" },
};

/** 平台 DA 映射（用于套餐 DA 门槛过滤，按账号 platformName 归属） */
export const platformDaMap: Record<string, number> = {
  Medium: 96,
  "WordPress.com": 94,
  Blogger: 89,
  "Dev.to": 85,
  Hashnode: 76,
  Ghost: 78,
  Tumblr: 86,
  Quora: 91,
  "Stack Exchange": 92,
  "Hacker News": 90,
  "Twitter / X": 94,
  Reddit: 91,
  LinkedIn: 98,
  Instagram: 93,
  PRWeb: 88,
  "EIN Presswire": 85,
  "Business Wire": 92,
  "Product Hunt": 91,
};

export function daOf(account: PlatformAccount): number {
  return platformDaMap[account.platformName] ?? 0;
}

/** 套餐 DA 门槛 */
export const packageMinDa: Record<string, number> = {
  starter: 40,
  growth: 50,
  professional: 60,
  enterprise: 70,
};

const isHealthy = (a: PlatformAccount) => a.health === "healthy";

/** 任务是否活跃（占用产能）：待处理 / 运行中 */
function isActive(status: string): boolean {
  return status === "pending" || status === "running";
}

/** 计算某任务尚未完成的剩余发布量 */
function remainingUnits(task: (typeof mockTasks)[number]): number {
  if (task.status === "completed") return 0;
  return Math.max(task.quantity - task.completedPlatforms, 0);
}

/**
 * 按平台类型汇总的积压量（backlog）
 * 活跃任务的剩余量按其 platformTypes 均摊到各账号型类型
 */
export function computeBacklogByType(): Record<PlatformType, number> {
  const backlog = Object.fromEntries(ACCOUNT_BASED_TYPES.map((t) => [t, 0])) as Record<PlatformType, number>;
  for (const task of mockTasks) {
    if (!isActive(task.status)) continue;
    const relevant = task.platformTypes.filter((t) => ACCOUNT_BASED_TYPES.includes(t));
    if (relevant.length === 0) continue;
    const share = remainingUnits(task) / relevant.length;
    for (const t of relevant) backlog[t] += share;
  }
  return backlog;
}

export interface PlatformTypeCapacity {
  type: PlatformType;
  label: string;
  totalAccounts: number;
  healthyAccounts: number;
  dailyCapacity: number;
  usedToday: number;
  availableToday: number;
  backlog: number;
  /** 占用率 = backlog / 月度产能 */
  occupancyPct: number;
  /** 可支撑的成长版任务数（50 条/单，按月度产能） */
  supportableGrowthTasks: number;
  avgDa: number;
}

/** 计算每个账号型平台类型的产能画像 */
export function computePlatformTypeCapacity(): PlatformTypeCapacity[] {
  const backlogByType = computeBacklogByType();
  return ACCOUNT_BASED_TYPES.map((type) => {
    const inType = platformAccounts.filter((a) => a.platform === type);
    const healthy = inType.filter(isHealthy);
    const dailyCapacity = healthy.reduce((s, a) => s + a.dailyLimit, 0);
    const usedToday = healthy.reduce((s, a) => s + a.usedToday, 0);
    const monthlyCapacity = dailyCapacity * PLANNING_HORIZON_DAYS;
    const backlog = Math.round(backlogByType[type] ?? 0);
    const daValues = inType.map(daOf).filter((d) => d > 0);
    const avgDa = daValues.length ? Math.round(daValues.reduce((s, d) => s + d, 0) / daValues.length) : 0;
    return {
      type,
      label: platformAccountLabels[type],
      totalAccounts: inType.length,
      healthyAccounts: healthy.length,
      dailyCapacity,
      usedToday,
      availableToday: Math.max(dailyCapacity - usedToday, 0),
      backlog,
      occupancyPct: monthlyCapacity > 0 ? Math.min(Math.round((backlog / monthlyCapacity) * 100), 100) : 0,
      supportableGrowthTasks: Math.floor(monthlyCapacity / 50),
      avgDa,
    };
  });
}

export interface CapacitySummary {
  totalDailyCapacity: number;
  usedToday: number;
  availableToday: number;
  totalBacklog: number;
  /** 按当前产能清空积压预计天数 */
  daysToClearBacklog: number;
  activeTasks: number;
  healthyAccounts: number;
  bottleneckTypes: string[];
}

export function computeCapacitySummary(): CapacitySummary {
  const perType = computePlatformTypeCapacity();
  const totalDailyCapacity = perType.reduce((s, t) => s + t.dailyCapacity, 0);
  const usedToday = perType.reduce((s, t) => s + t.usedToday, 0);
  const totalBacklog = perType.reduce((s, t) => s + t.backlog, 0);
  const activeTasks = mockTasks.filter((t) => isActive(t.status)).length;
  const healthyAccounts = platformAccounts.filter(isHealthy).length;
  const bottleneckTypes = perType.filter((t) => t.occupancyPct >= 60 || t.dailyCapacity === 0).map((t) => t.label);
  return {
    totalDailyCapacity,
    usedToday,
    availableToday: Math.max(totalDailyCapacity - usedToday, 0),
    totalBacklog,
    daysToClearBacklog: totalDailyCapacity > 0 ? Math.ceil(totalBacklog / totalDailyCapacity) : 0,
    activeTasks,
    healthyAccounts,
    bottleneckTypes,
  };
}

export interface PackageCapacity {
  id: string;
  name: string;
  quantity: number;
  minDa: number;
  qualifyingAccounts: number;
  qualifyingDailyCapacity: number;
  estDaysPerTask: number;
  maxConcurrentThisMonth: number;
}

/** 各套餐承接力：受 DA 门槛过滤，范围限定外链相关类型 */
export function computePackageCapacity(): PackageCapacity[] {
  return Object.entries(packageMinDa).map(([id, minDa]) => {
    // 套餐信息从 servicePackages 对齐（此处只需 quantity/name）
    const pkgMeta: Record<string, { name: string; quantity: number }> = {
      starter: { name: "入门版", quantity: 10 },
      growth: { name: "成长版", quantity: 50 },
      professional: { name: "专业版", quantity: 100 },
      enterprise: { name: "企业版", quantity: 500 },
    };
    const meta = pkgMeta[id];
    const qualifying = platformAccounts.filter(
      (a) => isHealthy(a) && BACKLINK_TYPES.includes(a.platform) && daOf(a) >= minDa,
    );
    const dailyCapacity = qualifying.reduce((s, a) => s + a.dailyLimit, 0);
    const monthlyCapacity = dailyCapacity * PLANNING_HORIZON_DAYS;
    return {
      id,
      name: meta.name,
      quantity: meta.quantity,
      minDa,
      qualifyingAccounts: qualifying.length,
      qualifyingDailyCapacity: dailyCapacity,
      estDaysPerTask: dailyCapacity > 0 ? Math.ceil(meta.quantity / dailyCapacity) : 0,
      maxConcurrentThisMonth: meta.quantity > 0 ? Math.floor(monthlyCapacity / meta.quantity) : 0,
    };
  });
}

export interface ActiveTaskDemand {
  id: string;
  name: string;
  serviceCategory: ServiceCategory;
  quantity: number;
  remaining: number;
  platformTypes: PlatformType[];
  platformLabels: string[];
  isManual: boolean;
}

/** 活跃任务的资源需求清单（用于占用溯源） */
export function computeActiveTaskDemand(): ActiveTaskDemand[] {
  return mockTasks
    .filter((t) => isActive(t.status))
    .map((t) => {
      const relevant = t.platformTypes.filter((p) => ACCOUNT_BASED_TYPES.includes(p));
      return {
        id: t.id,
        name: t.name ?? t.id,
        serviceCategory: t.serviceCategory,
        quantity: t.quantity,
        remaining: remainingUnits(t),
        platformTypes: t.platformTypes,
        platformLabels: t.platformTypes.map((p) => platformAccountLabels[p]),
        isManual: relevant.length === 0,
      };
    });
}

// ==================== 任务创建预检 ====================

export type PrecheckLevel = "ok" | "tight" | "insufficient" | "manual";

export const precheckLevelConfig: Record<
  PrecheckLevel,
  { label: string; tone: "success" | "warning" | "danger" | "info" }
> = {
  ok: { label: "资源充足", tone: "success" },
  tight: { label: "资源紧张", tone: "warning" },
  insufficient: { label: "资源不足", tone: "danger" },
  manual: { label: "人工处理", tone: "info" },
};

export interface PrecheckResult {
  level: PrecheckLevel;
  dailyCapacity: number;
  availableToday: number;
  backlog: number;
  estDays: number;
  message: string;
  suggestion?: string;
  /** 建议补充的账号数（insufficient 时） */
  suggestedAccounts?: number;
  byType: { type: PlatformType; label: string; dailyCapacity: number; healthyAccounts: number }[];
}

/**
 * 任务可行性预检：给定平台类型与数量，返回红绿灯与预估
 */
export function precheckTask(platformTypes: PlatformType[], quantity: number): PrecheckResult {
  const perType = computePlatformTypeCapacity();
  const relevant = platformTypes.filter((t) => ACCOUNT_BASED_TYPES.includes(t));
  const byType = perType
    .filter((t) => relevant.includes(t.type))
    .map((t) => ({
      type: t.type,
      label: t.label,
      dailyCapacity: t.dailyCapacity,
      healthyAccounts: t.healthyAccounts,
    }));

  // 仅选了 custom/wiki/profile 等无账号池类型
  if (platformTypes.length > 0 && relevant.length === 0) {
    return {
      level: "manual",
      dailyCapacity: 0,
      availableToday: 0,
      backlog: 0,
      estDays: 0,
      message: "该任务类型走人工/AI 内容处理，不占用账号池，可直接排期。",
      byType,
    };
  }

  const selected = perType.filter((t) => relevant.includes(t.type));
  const dailyCapacity = selected.reduce((s, t) => s + t.dailyCapacity, 0);
  const availableToday = selected.reduce((s, t) => s + t.availableToday, 0);
  const backlog = selected.reduce((s, t) => s + t.backlog, 0);

  if (dailyCapacity === 0) {
    const suggestedAccounts = Math.max(Math.ceil(quantity / 15 / 4), 1);
    return {
      level: "insufficient",
      dailyCapacity: 0,
      availableToday: 0,
      backlog,
      estDays: 0,
      message: "所选平台类型当前没有可用账号，任务无法执行。",
      suggestion: `建议前往注册队列补充约 ${suggestedAccounts} 个账号后再下单。`,
      suggestedAccounts,
      byType,
    };
  }

  // 考虑现有积压后的预计完成天数
  const estDays = Math.ceil((backlog + quantity) / dailyCapacity);

  if (estDays <= 5) {
    return {
      level: "ok",
      dailyCapacity,
      availableToday,
      backlog,
      estDays,
      message: `资源充足，预计 ${estDays} 天内完成（今日可用 ${availableToday} 条产能）。`,
      byType,
    };
  }
  if (estDays <= 15) {
    return {
      level: "tight",
      dailyCapacity,
      availableToday,
      backlog,
      estDays,
      message: `资源可承接但较紧张，叠加现有积压预计 ${estDays} 天完成。`,
      suggestion: "可拆分数量分批下单，或补充账号缩短交付周期。",
      byType,
    };
  }

  const requiredDaily = Math.ceil((backlog + quantity) / 15);
  const deficit = Math.max(requiredDaily - dailyCapacity, 0);
  const suggestedAccounts = Math.max(Math.ceil(deficit / 4), 1);
  return {
    level: "insufficient",
    dailyCapacity,
    availableToday,
    backlog,
    estDays,
    message: `当前产能不足，预计需 ${estDays} 天，远超正常交付周期。`,
    suggestion: `建议补充约 ${suggestedAccounts} 个相关账号，将交付压缩至 15 天内。`,
    suggestedAccounts,
    byType,
  };
}

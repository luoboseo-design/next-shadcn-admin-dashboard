// admin 订单数据 - 由前端共享的 mockTasks 派生，保证与用户任务中心字段/ID/金额一一对应

import type { TaskStatus } from "@/types/marketing";

import { mockTasks, type ServiceCategory, serviceCategoryConfig } from "./mock-tasks";
import { DEMO_USER_ID, getUserById } from "./platform-users";

export interface AdminOrder {
  /** 订单号 = 用户任务中心的任务 ID(如 BL-001)，两侧一一对应 */
  id: string;
  userId: string;
  userName: string;
  serviceCategory: ServiceCategory;
  serviceType: string;
  serviceName: string;
  packageName: string;
  quantity: number;
  /** 金额(USD)，来自任务 pricing.totalPrice */
  amount: number;
  currency: string;
  status: TaskStatus;
  progress: number;
  createdAt: string; // YYYY-MM-DD
  completedAt?: string;
}

/** 任务归属映射：演示账户拥有主要任务(与前端任务中心一致)，其余任务分配给其他用户 */
const taskOwnerMap: Record<string, string> = {
  "BL-001": DEMO_USER_ID,
  "BL-002": DEMO_USER_ID,
  "GA-001": DEMO_USER_ID,
  "GA-002": DEMO_USER_ID,
  "GEO-001": DEMO_USER_ID,
  "GEO-002": DEMO_USER_ID,
  "SOC-001": DEMO_USER_ID,
  "SOC-002": DEMO_USER_ID,
  "SOC-003": DEMO_USER_ID,
  "NEWS-001": DEMO_USER_ID,
  "NEWS-002": DEMO_USER_ID,
  "BL-003": "U002",
  "BL-004": "U003",
  "GA-003": "U004",
  "GA-004": "U005",
  "SOC-004": "U002",
  "SOC-005": "U003",
  "SOC-006": "U005",
  "SOC-007": "U002",
  "SOC-008": "U004",
  "NEWS-003": "U003",
  "NEWS-004": "U005",
};

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getServiceName(category: ServiceCategory, serviceType: string): string {
  const sub = serviceCategoryConfig[category]?.subTypes.find((s) => s.key === serviceType);
  return sub?.label ?? serviceCategoryConfig[category]?.label ?? serviceType;
}

/** 全部订单：直接由 mockTasks 派生 */
export const adminOrders: AdminOrder[] = mockTasks.map((task) => {
  const userId = taskOwnerMap[task.id] ?? DEMO_USER_ID;
  const user = getUserById(userId);
  return {
    id: task.id,
    userId,
    userName: user?.name ?? "未知用户",
    serviceCategory: task.serviceCategory,
    serviceType: task.serviceType,
    serviceName: getServiceName(task.serviceCategory, task.serviceType),
    packageName: task.pricing.packageName,
    quantity: task.pricing.quantity,
    amount: task.pricing.totalPrice,
    currency: task.pricing.currency,
    status: task.status,
    progress: task.progress,
    createdAt: formatDate(task.createdAt),
    completedAt: task.completedAt ? formatDate(task.completedAt) : undefined,
  };
});

/** 按用户统计订单数据(供 admin 用户管理页使用) */
export function getUserOrderStats(userId: string) {
  const orders = adminOrders.filter((o) => o.userId === userId);
  return {
    ordersCount: orders.length,
    runningOrders: orders.filter((o) => o.status === "running").length,
    totalSpent: orders.reduce((sum, o) => sum + o.amount, 0),
  };
}

/** 按服务类别统计收入(供 admin 财务中心使用) */
export function getRevenueByService() {
  const totalAmount = adminOrders.reduce((sum, o) => sum + o.amount, 0);
  return (Object.keys(serviceCategoryConfig) as ServiceCategory[]).map((category) => {
    const orders = adminOrders.filter((o) => o.serviceCategory === category);
    const revenue = orders.reduce((sum, o) => sum + o.amount, 0);
    return {
      category,
      name: serviceCategoryConfig[category].label,
      revenue,
      orders: orders.length,
      percentage: totalAmount > 0 ? Math.round((revenue / totalAmount) * 100) : 0,
    };
  });
}

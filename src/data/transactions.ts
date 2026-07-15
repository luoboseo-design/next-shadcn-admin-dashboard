// 交易流水数据 - admin 财务中心与用户账单中心共享的唯一来源
// 消费流水由 adminOrders 派生(订单号/金额/服务与任务一一对应)，充值流水为独立记录

import { adminOrders } from "./admin-orders";
import type { ServiceCategory } from "./mock-tasks";
import { DEMO_USER_ID, getUserById } from "./platform-users";

export type TransactionType = "expense" | "recharge" | "refund";
export type TransactionStatus = "completed" | "pending" | "refunded";

export interface Transaction {
  id: string; // TXN-xxx / RCH-xxx
  userId: string;
  userName: string;
  type: TransactionType;
  /** 金额(USD)，消费为负数，充值/退款为正数 */
  amount: number;
  description: string;
  serviceCategory?: ServiceCategory;
  serviceName?: string;
  /** 关联订单号 = 任务 ID(如 BL-001) */
  orderId?: string;
  /** 充值方式 */
  method?: string;
  status: TransactionStatus;
  date: string; // YYYY-MM-DD
}

/** 消费流水：每笔订单对应一条消费记录 */
const expenseTransactions: Transaction[] = adminOrders.map((order, index) => ({
  id: `TXN-${String(index + 1).padStart(3, "0")}`,
  userId: order.userId,
  userName: order.userName,
  type: "expense" as const,
  amount: -order.amount,
  description: `${order.packageName} x ${order.quantity}`,
  serviceCategory: order.serviceCategory,
  serviceName: order.serviceName,
  orderId: order.id,
  status: "completed" as const,
  date: order.createdAt,
}));

/** 充值流水 */
const rechargeTransactions: Transaction[] = [
  {
    id: "RCH-001",
    userId: DEMO_USER_ID,
    userName: getUserById(DEMO_USER_ID)?.name ?? "演示用户",
    type: "recharge",
    amount: 5000,
    description: "在线充值",
    method: "信用卡",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "RCH-002",
    userId: DEMO_USER_ID,
    userName: getUserById(DEMO_USER_ID)?.name ?? "演示用户",
    type: "recharge",
    amount: 3000,
    description: "在线充值",
    method: "PayPal",
    status: "completed",
    date: "2024-01-01",
  },
  {
    id: "RCH-003",
    userId: "U003",
    userName: getUserById("U003")?.name ?? "王伟",
    type: "recharge",
    amount: 2000,
    description: "在线充值",
    method: "信用卡",
    status: "completed",
    date: "2024-01-20",
  },
  {
    id: "RCH-004",
    userId: "U005",
    userName: getUserById("U005")?.name ?? "钱进",
    type: "recharge",
    amount: 1000,
    description: "在线充值",
    method: "银行转账",
    status: "pending",
    date: "2024-01-25",
  },
];

/** 全部流水(按日期倒序) */
export const transactions: Transaction[] = [...expenseTransactions, ...rechargeTransactions].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** 某个用户的流水(用户账单中心使用) */
export function getTransactionsByUser(userId: string): Transaction[] {
  return transactions.filter((t) => t.userId === userId);
}

/** 平台财务汇总(admin 财务中心使用) */
export function getFinancialStats() {
  const totalRevenue = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalRecharge = rechargeTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalRefund = transactions
    .filter((t) => t.type === "refund")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  return { totalRevenue, totalRecharge, totalRefund };
}

export const transactionTypeLabels: Record<TransactionType, string> = {
  expense: "消费",
  recharge: "充值",
  refund: "退款",
};

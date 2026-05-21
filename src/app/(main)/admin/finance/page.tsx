"use client";

import { useState } from "react";

import { ArrowDownRight, ArrowUpRight, DollarSign, Download, TrendingUp, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// 模拟财务数据
const financialStats = {
  totalRevenue: 156800,
  revenueGrowth: 18.5,
  totalRecharge: 198500,
  rechargeGrowth: 12.3,
  totalWithdraw: 45000,
  withdrawGrowth: -5.2,
  platformBalance: 153500,
};

const revenueByService = [
  { name: "SEO 服务", revenue: 62720, percentage: 40, orders: 456 },
  { name: "GEO 服务", revenue: 50176, percentage: 32, orders: 234 },
  { name: "社交媒体", revenue: 26656, percentage: 17, orders: 312 },
  { name: "发稿服务", revenue: 17248, percentage: 11, orders: 232 },
];

const recentTransactions = [
  {
    id: "TXN-001",
    type: "recharge",
    user: "周九",
    amount: 5000,
    method: "支付宝",
    status: "completed",
    createdAt: "2024-01-25 16:30",
  },
  {
    id: "TXN-002",
    type: "order",
    user: "张三",
    amount: -180,
    service: "外链代发",
    status: "completed",
    createdAt: "2024-01-25 14:30",
  },
  {
    id: "TXN-003",
    type: "recharge",
    user: "王五",
    amount: 2000,
    method: "微信支付",
    status: "completed",
    createdAt: "2024-01-25 13:15",
  },
  {
    id: "TXN-004",
    type: "order",
    user: "李四",
    amount: -600,
    service: "关键词优化",
    status: "completed",
    createdAt: "2024-01-25 11:45",
  },
  {
    id: "TXN-005",
    type: "refund",
    user: "赵六",
    amount: 500,
    reason: "订单取消",
    status: "completed",
    createdAt: "2024-01-25 10:20",
  },
  {
    id: "TXN-006",
    type: "order",
    user: "钱七",
    amount: -1500,
    service: "客座文章",
    status: "completed",
    createdAt: "2024-01-25 09:00",
  },
  {
    id: "TXN-007",
    type: "recharge",
    user: "吴十",
    amount: 1000,
    method: "银行卡",
    status: "pending",
    createdAt: "2024-01-25 08:30",
  },
];

const monthlyRevenue = [
  { month: "8月", revenue: 85000 },
  { month: "9月", revenue: 92000 },
  { month: "10月", revenue: 105000 },
  { month: "11月", revenue: 118000 },
  { month: "12月", revenue: 135000 },
  { month: "1月", revenue: 156800 },
];

const typeLabels: Record<string, string> = {
  recharge: "充值",
  order: "消费",
  refund: "退款",
  withdraw: "提现",
};

const typeColors: Record<string, string> = {
  recharge: "text-green-600",
  order: "text-red-600",
  refund: "text-amber-600",
  withdraw: "text-purple-600",
};

export default function AdminFinancePage() {
  const [period, setPeriod] = useState("30d");

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">财务中心</h1>
          <p className="text-muted-foreground mt-1">平台收入和财务数据统计</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">最近7天</SelectItem>
              <SelectItem value="30d">最近30天</SelectItem>
              <SelectItem value="90d">最近90天</SelectItem>
              <SelectItem value="1y">最近1年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* KPI 卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总收入</p>
                <p className="text-2xl font-bold mt-1">${financialStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+{financialStats.revenueGrowth}%</span>
              <span className="text-muted-foreground">vs 上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总充值</p>
                <p className="text-2xl font-bold mt-1">${financialStats.totalRecharge.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+{financialStats.rechargeGrowth}%</span>
              <span className="text-muted-foreground">vs 上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总退款</p>
                <p className="text-2xl font-bold mt-1">${financialStats.totalWithdraw.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ArrowDownRight className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <ArrowDownRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">{financialStats.withdrawGrowth}%</span>
              <span className="text-muted-foreground">vs 上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平台余额</p>
                <p className="text-2xl font-bold mt-1">${financialStats.platformBalance.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <span className="text-muted-foreground">用户总余额</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 收入趋势和服务分布 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 收入趋势 */}
        <Card>
          <CardHeader>
            <CardTitle>收入趋势</CardTitle>
            <CardDescription>近6个月收入变化</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.map((item) => (
                <div key={item.month} className="flex items-center gap-4">
                  <span className="w-8 text-sm text-muted-foreground">{item.month}</span>
                  <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all flex items-center justify-end pr-2"
                      style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-medium">
                        ${(item.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 服务收入分布 */}
        <Card>
          <CardHeader>
            <CardTitle>服务收入分布</CardTitle>
            <CardDescription>各服务类别收入占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByService.map((service) => (
                <div key={service.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{service.name}</span>
                    <div className="text-right">
                      <span className="font-medium">${service.revenue.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-2">({service.orders}单)</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近交易 */}
      <Card>
        <CardHeader>
          <CardTitle>最近交易</CardTitle>
          <CardDescription>平台最近的资金流水</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">交易号</th>
                  <th className="pb-3 font-medium">用户</th>
                  <th className="pb-3 font-medium">类型</th>
                  <th className="pb-3 font-medium">描述</th>
                  <th className="pb-3 font-medium text-right">金额</th>
                  <th className="pb-3 font-medium">状态</th>
                  <th className="pb-3 font-medium">时间</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b last:border-0">
                    <td className="py-3">
                      <span className="font-mono text-sm">{txn.id}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {txn.user.charAt(0)}
                        </div>
                        <span className="font-medium">{txn.user}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={cn("font-medium", typeColors[txn.type])}>{typeLabels[txn.type]}</span>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {txn.type === "recharge" && txn.method}
                      {txn.type === "order" && txn.service}
                      {txn.type === "refund" && txn.reason}
                    </td>
                    <td className="py-3 text-right">
                      <span className={cn("font-medium", txn.amount > 0 ? "text-green-600" : "text-red-600")}>
                        {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          txn.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                        )}
                      >
                        {txn.status === "completed" ? "已完成" : "处理中"}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{txn.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

// 服务类型
type ServiceCategory = "seo" | "geo" | "social" | "news";

const serviceCategoryLabels: Record<ServiceCategory, string> = {
  seo: "SEO 服务",
  geo: "GEO 服务",
  social: "社交媒体",
  news: "发稿服务",
};

// 消费记录
interface Transaction {
  id: string;
  date: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  description: string;
  amount: number;
  type: "expense" | "recharge";
  status: "completed" | "pending" | "refunded";
  orderId?: string;
}

// 模拟消费记录
const transactions: Transaction[] = [
  {
    id: "TXN-001",
    date: "2024-01-25",
    serviceCategory: "seo",
    serviceName: "外链代发",
    description: "50条外链 - DA30+ 平台",
    amount: -299,
    type: "expense",
    status: "completed",
    orderId: "BL-20240125-001",
  },
  {
    id: "TXN-002",
    date: "2024-01-24",
    serviceCategory: "geo",
    serviceName: "关键词优化",
    description: "3个关键词 x ChatGPT, Perplexity",
    amount: -1200,
    type: "expense",
    status: "completed",
    orderId: "GEO-20240124-001",
  },
  {
    id: "TXN-003",
    date: "2024-01-23",
    serviceCategory: "social",
    serviceName: "Reddit 发帖",
    description: "10条帖子 - 优质账号",
    amount: -500,
    type: "expense",
    status: "completed",
    orderId: "SOC-20240123-001",
  },
  {
    id: "TXN-004",
    date: "2024-01-22",
    serviceCategory: "news",
    serviceName: "新闻稿发布",
    description: "5家媒体 - 科技行业",
    amount: -1500,
    type: "expense",
    status: "pending",
    orderId: "NEWS-20240122-001",
  },
  {
    id: "TXN-005",
    date: "2024-01-20",
    serviceCategory: "seo",
    serviceName: "客座文章",
    description: "3媒体套餐 - DA50+ 网站",
    amount: -899,
    type: "expense",
    status: "completed",
    orderId: "GA-20240120-001",
  },
  {
    id: "TXN-006",
    date: "2024-01-18",
    serviceCategory: "geo",
    serviceName: "权威建设",
    description: "引用来源建设",
    amount: -800,
    type: "expense",
    status: "completed",
    orderId: "GEO-20240118-001",
  },
  {
    id: "TXN-007",
    date: "2024-01-15",
    serviceCategory: "social",
    serviceName: "Instagram 粉丝",
    description: "1000粉丝 - 优质账号",
    amount: -200,
    type: "expense",
    status: "refunded",
    orderId: "SOC-20240115-001",
  },
  {
    id: "RCH-001",
    date: "2024-01-15",
    serviceCategory: "seo",
    serviceName: "账户充值",
    description: "在线充值",
    amount: 5000,
    type: "recharge",
    status: "completed",
  },
  {
    id: "RCH-002",
    date: "2024-01-01",
    serviceCategory: "seo",
    serviceName: "账户充值",
    description: "在线充值",
    amount: 3000,
    type: "recharge",
    status: "completed",
  },
];

// 充值套餐
const rechargePacks = [
  { amount: 500, bonus: 0, label: "$500" },
  { amount: 1000, bonus: 50, label: "$1,000", tag: "赠 $50" },
  { amount: 2000, bonus: 150, label: "$2,000", tag: "赠 $150" },
  { amount: 5000, bonus: 500, label: "$5,000", tag: "赠 $500", popular: true },
  { amount: 10000, bonus: 1500, label: "$10,000", tag: "赠 $1,500" },
];

export default function BillingPage() {
  const [showRechargeDialog, setShowRechargeDialog] = useState(false);
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 计算余额
  const balance = transactions.reduce((sum, t) => {
    if (t.status === "refunded") return sum;
    return sum + t.amount;
  }, 0);

  // 计算本月消费
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlySpending = transactions
    .filter(t => t.date.startsWith("2024-01") && t.type === "expense" && t.status !== "refunded")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // 计算总充值
  const totalRecharge = transactions
    .filter(t => t.type === "recharge" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  // 筛选记录
  const filteredTransactions = transactions.filter(t => {
    if (filterCategory !== "all" && t.serviceCategory !== filterCategory) return false;
    if (filterType !== "all" && t.type !== filterType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!t.serviceName.toLowerCase().includes(query) && 
          !t.description.toLowerCase().includes(query) &&
          !(t.orderId?.toLowerCase().includes(query))) {
        return false;
      }
    }
    return true;
  });

  // 分页
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRecharge = () => {
    const amount = selectedPack !== null ? rechargePacks[selectedPack].amount : parseInt(customAmount);
    if (amount > 0) {
      // 这里跳转到支付页面
      console.log("充值金额:", amount);
      setShowRechargeDialog(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold">账单中心</h1>
        <p className="text-muted-foreground mt-1">管理您的账户余额和消费记录</p>
      </div>

      {/* 账户概览 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">账户余额</p>
                <p className="text-3xl font-bold mt-1">${balance.toLocaleString()}</p>
              </div>
              <Button size="sm" onClick={() => setShowRechargeDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                充值
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">本月消费</p>
            <p className="text-3xl font-bold mt-1">${monthlySpending.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">累计充值</p>
            <p className="text-3xl font-bold mt-1">${totalRecharge.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* 消费记录 */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg">消费记录</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 筛选 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索订单号、服务名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="服务类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部服务</SelectItem>
                <SelectItem value="seo">SEO 服务</SelectItem>
                <SelectItem value="geo">GEO 服务</SelectItem>
                <SelectItem value="social">社交媒体</SelectItem>
                <SelectItem value="news">发稿服务</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="expense">消费</SelectItem>
                <SelectItem value="recharge">充值</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 表格 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日期</TableHead>
                  <TableHead>服务</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>订单号</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      暂无记录
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="text-muted-foreground">{t.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{t.serviceName}</span>
                          {t.type === "expense" && (
                            <Badge variant="outline" className="text-xs">
                              {serviceCategoryLabels[t.serviceCategory]}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{t.description}</TableCell>
                      <TableCell>
                        {t.orderId ? (
                          <button className="text-primary hover:underline text-sm flex items-center gap-1">
                            {t.orderId}
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${t.amount > 0 ? "text-emerald-600" : ""}`}>
                        {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={t.status === "completed" ? "default" : t.status === "pending" ? "secondary" : "outline"}
                          className={
                            t.status === "completed" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" :
                            t.status === "pending" ? "bg-amber-500/10 text-amber-600" : 
                            "text-muted-foreground"
                          }
                        >
                          {t.status === "completed" ? "已完成" : t.status === "pending" ? "处理中" : "已退款"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                共 {filteredTransactions.length} 条记录
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 充值弹窗 */}
      <Dialog open={showRechargeDialog} onOpenChange={setShowRechargeDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>账户充值</DialogTitle>
            <DialogDescription>
              选择充值金额，充值越多赠送越多
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 充值套餐 */}
            <div className="grid grid-cols-3 gap-3">
              {rechargePacks.map((pack, index) => (
                <button
                  key={pack.amount}
                  onClick={() => {
                    setSelectedPack(index);
                    setCustomAmount("");
                  }}
                  className={`relative p-4 rounded-lg border text-center transition-all ${
                    selectedPack === index
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/50"
                  } ${pack.popular ? "ring-2 ring-primary ring-offset-2" : ""}`}
                >
                  {pack.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                      推荐
                    </span>
                  )}
                  <div className="font-semibold">{pack.label}</div>
                  {pack.tag && (
                    <div className="text-xs text-emerald-600 mt-1">{pack.tag}</div>
                  )}
                </button>
              ))}
            </div>

            {/* 自定义金额 */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">或输入自定义金额</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  placeholder="输入金额"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedPack(null);
                  }}
                  className="pl-8"
                />
              </div>
            </div>

            {/* 支付金额 */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">充值金额</span>
                <span className="font-medium">
                  ${selectedPack !== null 
                    ? rechargePacks[selectedPack].amount.toLocaleString()
                    : customAmount || "0"
                  }
                </span>
              </div>
              {selectedPack !== null && rechargePacks[selectedPack].bonus > 0 && (
                <div className="flex items-center justify-between mt-2 text-emerald-600">
                  <span>赠送金额</span>
                  <span>+${rechargePacks[selectedPack].bonus.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <span className="font-medium">实际到账</span>
                <span className="font-bold text-lg">
                  ${selectedPack !== null
                    ? (rechargePacks[selectedPack].amount + rechargePacks[selectedPack].bonus).toLocaleString()
                    : customAmount || "0"
                  }
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRechargeDialog(false)}>
              取消
            </Button>
            <Button 
              onClick={handleRecharge}
              disabled={selectedPack === null && !customAmount}
            >
              确认充值
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

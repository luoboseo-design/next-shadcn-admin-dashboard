import {
  BarChart3,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  type LucideIcon,
  Package,
  Settings,
  Shield,
  Users,
  Wallet,
} from "lucide-react";

export interface AdminNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface AdminNavGroup {
  id: number;
  label?: string;
  items: AdminNavItem[];
}

export const adminSidebarItems: AdminNavGroup[] = [
  {
    id: 1,
    label: "概览",
    items: [
      {
        title: "仪表盘",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "数据分析",
        url: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    id: 2,
    label: "业务管理",
    items: [
      {
        title: "用户管理",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "订单管理",
        url: "/admin/orders",
        icon: FileText,
      },
      {
        title: "媒体资源",
        url: "/admin/platforms",
        icon: Globe,
      },
      {
        title: "服务套餐",
        url: "/admin/packages",
        icon: Package,
      },
    ],
  },
  {
    id: 3,
    label: "财务中心",
    items: [
      {
        title: "收入统计",
        url: "/admin/finance",
        icon: Wallet,
      },
      {
        title: "充值记录",
        url: "/admin/recharge",
        icon: CreditCard,
      },
    ],
  },
  {
    id: 4,
    label: "系统",
    items: [
      {
        title: "权限管理",
        url: "/admin/permissions",
        icon: Shield,
      },
      {
        title: "系统设置",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

import {
  Activity,
  Banknote,
  Calendar,
  ChartBar,
  ClipboardList,
  FileEdit,
  Fingerprint,
  Forklift,
  Gauge,
  Globe,
  GraduationCap,
  Home,
  Kanban,
  LayoutDashboard,
  Link2,
  ListTodo,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  Newspaper,
  Radar,
  ReceiptText,
  Search,
  Share2,
  ShoppingBag,
  SquareArrowUpRight,
  Users,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "营销智能体",
    items: [
      {
        title: "首页",
        url: "/dashboard/home",
        icon: Home,
        isNew: true,
      },
      {
        title: "SEO 服务",
        url: "/dashboard/services/seo",
        icon: Search,
        subItems: [
          { title: "外链代发", url: "/dashboard/services/seo/backlinks", icon: Link2 },
          { title: "客座文章", url: "/dashboard/services/seo/guest-posts", icon: FileEdit },
          { title: "内容撰写", url: "/dashboard/services/seo/content", icon: FileEdit },
        ],
      },
      {
        title: "GEO 服务",
        url: "/dashboard/services/geo",
        icon: Globe,
      },
      {
        title: "社交媒体",
        url: "/dashboard/services/social",
        icon: Share2,
      },
      {
        title: "发稿服务",
        url: "/dashboard/services/press-release",
        icon: Newspaper,
      },
      {
        title: "获客情报",
        url: "/dashboard/services/leads",
        icon: Radar,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "仪表盘",
    items: [
      {
        title: "任务中心",
        url: "/dashboard/tasks",
        icon: ClipboardList,
      },
      {
        title: "SEO 任务",
        url: "/dashboard/seo-monitor",
        icon: Link2,
        isNew: true,
      },
      {
        title: "GEO 监控",
        url: "/dashboard/geo-monitor",
        icon: Activity,
        isNew: true,
      },
      {
        title: "数据概览",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "财务",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "分析",
        url: "/dashboard/analytics",
        icon: Gauge,
      },
      {
        title: "效率",
        url: "/dashboard/productivity",
        icon: ListTodo,
      },
      {
        title: "电商",
        url: "/dashboard/ecommerce",
        icon: ShoppingBag,
      },
      {
        title: "学院",
        url: "/dashboard/academy",
        icon: GraduationCap,
      },
      {
        title: "物流",
        url: "/dashboard/coming-soon",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 3,
    label: "页面",
    items: [
      {
        title: "邮件",
        url: "/dashboard/mail",
        icon: Mail,
      },
      {
        title: "聊天",
        url: "/dashboard/coming-soon",
        icon: MessageSquare,
        comingSoon: true,
      },
      {
        title: "日历",
        url: "/dashboard/coming-soon",
        icon: Calendar,
        comingSoon: true,
      },
      {
        title: "看板",
        url: "/dashboard/coming-soon",
        icon: Kanban,
        comingSoon: true,
      },
      {
        title: "发票",
        url: "/dashboard/coming-soon",
        icon: ReceiptText,
        comingSoon: true,
      },
      {
        title: "用户",
        url: "/dashboard/coming-soon",
        icon: Users,
        comingSoon: true,
      },
      {
        title: "权限",
        url: "/dashboard/coming-soon",
        icon: Lock,
        comingSoon: true,
      },
      {
        title: "认证",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "登录 v1", url: "/auth/v1/login", newTab: true },
          { title: "登录 v2", url: "/auth/v2/login", newTab: true },
          { title: "注册 v1", url: "/auth/v1/register", newTab: true },
          { title: "注册 v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "其他",
    items: [
      {
        title: "更多功能",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        comingSoon: true,
      },
    ],
  },
];

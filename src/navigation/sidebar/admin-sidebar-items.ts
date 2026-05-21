import {
  Activity,
  Bot,
  CreditCard,
  FileText,
  Globe,
  Home,
  type LucideIcon,
  Newspaper,
  Search,
  Settings,
  Share2,
  Users,
  Workflow,
  Database,
  CheckCircle,
  Server,
} from "lucide-react";

export interface AdminNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: string;
  subItems?: {
    title: string;
    url: string;
  }[];
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
        title: "控制台",
        url: "/admin",
        icon: Home,
      },
      {
        title: "系统监控",
        url: "/admin/monitor",
        icon: Activity,
      },
    ],
  },
  {
    id: 2,
    label: "资源配置",
    items: [
      {
        title: "SEO 资源库",
        url: "/admin/resources/seo",
        icon: Search,
        subItems: [
          { title: "博客站点", url: "/admin/resources/seo/blogs" },
          { title: "论坛列表", url: "/admin/resources/seo/forums" },
          { title: "目录站点", url: "/admin/resources/seo/directories" },
          { title: "客座媒体", url: "/admin/resources/seo/guest-posts" },
        ],
      },
      {
        title: "GEO 资源库",
        url: "/admin/resources/geo",
        icon: Globe,
        subItems: [
          { title: "AI 平台配置", url: "/admin/resources/geo/ai-platforms" },
          { title: "引用来源库", url: "/admin/resources/geo/citations" },
        ],
      },
      {
        title: "社交媒体资源",
        url: "/admin/resources/social",
        icon: Share2,
        subItems: [
          { title: "Reddit 账号池", url: "/admin/resources/social/reddit" },
          { title: "Twitter 账号池", url: "/admin/resources/social/twitter" },
          { title: "LinkedIn 账号池", url: "/admin/resources/social/linkedin" },
        ],
      },
      {
        title: "新闻媒体资源",
        url: "/admin/resources/news",
        icon: Newspaper,
        subItems: [
          { title: "新闻站点", url: "/admin/resources/news/sites" },
          { title: "发稿渠道", url: "/admin/resources/news/channels" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "工作流管理",
    items: [
      {
        title: "工作流配置",
        url: "/admin/workflows",
        icon: Workflow,
      },
      {
        title: "AI 代理设置",
        url: "/admin/ai-agents",
        icon: Bot,
      },
      {
        title: "执行日志",
        url: "/admin/logs",
        icon: FileText,
      },
    ],
  },
  {
    id: 4,
    label: "业务管理",
    items: [
      {
        title: "订单管理",
        url: "/admin/orders",
        icon: CheckCircle,
      },
      {
        title: "用户管理",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "财务中心",
        url: "/admin/finance",
        icon: CreditCard,
      },
    ],
  },
  {
    id: 5,
    label: "系统",
    items: [
      {
        title: "服务定价",
        url: "/admin/pricing",
        icon: Database,
      },
      {
        title: "系统设置",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

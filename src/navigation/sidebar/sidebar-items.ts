import {
  ClipboardList,
  CreditCard,
  FileEdit,
  Globe,
  Home,
  Link2,
  type LucideIcon,
  Newspaper,
  Radar,
  Search,
  Share2,
  Users,
  Zap,
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
  requireAuth?: boolean; // 是否需要登录才能看到
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "营销智能体",
    items: [
      {
        title: "首页",
        url: "/",
        icon: Home,
        isNew: true,
      },
      {
        title: "SEO 服务",
        url: "/services/seo",
        icon: Search,
        subItems: [
          { title: "外链代发", url: "/services/seo/backlinks", icon: Link2 },
          { title: "客座文章", url: "/services/seo/guest-posts", icon: FileEdit },
          { title: "Google秒收", url: "/services/seo/google-index", icon: Zap },
        ],
      },
      {
        title: "GEO 服务",
        url: "/services/geo",
        icon: Globe,
      },
      {
        title: "社交媒体",
        url: "/services/social",
        icon: Share2,
      },
      {
        title: "发稿服务",
        url: "/services/press-release",
        icon: Newspaper,
      },
      {
        title: "获客情报",
        url: "/services/leads",
        icon: Radar,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "仪表盘",
    requireAuth: true, // 需要登录才能看到
    items: [
      {
        title: "任务中心",
        url: "/dashboard/tasks",
        icon: ClipboardList,
      },
      {
        title: "内容撰写",
        url: "/dashboard/content",
        icon: FileEdit,
      },
      {
        title: "账单中心",
        url: "/dashboard/billing",
        icon: CreditCard,
      },
      {
        title: "账户设置",
        url: "/dashboard/account",
        icon: Users,
      },
    ],
  },
];

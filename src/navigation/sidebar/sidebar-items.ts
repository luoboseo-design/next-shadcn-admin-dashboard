import {
  Activity,
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
    requireAuth: true, // 需要登录才能看到
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
        title: "社交媒体",
        url: "/dashboard/social-monitor",
        icon: Share2,
        isNew: true,
      },
      {
        title: "发稿任务",
        url: "/dashboard/news-monitor",
        icon: Newspaper,
        isNew: true,
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

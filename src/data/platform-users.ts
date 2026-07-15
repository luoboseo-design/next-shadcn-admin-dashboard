// 平台用户数据 - 前端(演示账户)与 admin 后台共享的唯一用户来源

export type PlatformUserStatus = "active" | "inactive" | "banned";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  /** 账户余额(USD) */
  balance: number;
  status: PlatformUserStatus;
  registeredAt: string; // YYYY-MM-DD
  lastLoginAt: string; // YYYY-MM-DD HH:mm
}

/** 演示账户 - 与登录弹窗的 DEMO_USER 对应，前端任务中心展示的任务都归属该用户 */
export const DEMO_USER_ID = "U001";

export const platformUsers: PlatformUser[] = [
  {
    id: DEMO_USER_ID,
    name: "演示用户",
    email: "demo@luoboseo.com",
    phone: "138****1234",
    avatar: "",
    balance: 5200,
    status: "active",
    registeredAt: "2023-08-15",
    lastLoginAt: "2024-01-25 14:30",
  },
  {
    id: "U002",
    name: "李华",
    email: "lihua@example.com",
    phone: "139****5678",
    avatar: "",
    balance: 1800,
    status: "active",
    registeredAt: "2023-10-22",
    lastLoginAt: "2024-01-25 10:15",
  },
  {
    id: "U003",
    name: "王伟",
    email: "wangwei@example.com",
    phone: "137****9012",
    avatar: "",
    balance: 4500,
    status: "active",
    registeredAt: "2023-03-10",
    lastLoginAt: "2024-01-25 09:00",
  },
  {
    id: "U004",
    name: "赵芳",
    email: "zhaofang@example.com",
    phone: "136****3456",
    avatar: "",
    balance: 800,
    status: "active",
    registeredAt: "2024-01-05",
    lastLoginAt: "2024-01-24 18:00",
  },
  {
    id: "U005",
    name: "钱进",
    email: "qianjin@example.com",
    phone: "135****7890",
    avatar: "",
    balance: 3200,
    status: "active",
    registeredAt: "2023-06-15",
    lastLoginAt: "2024-01-25 16:45",
  },
  {
    id: "U006",
    name: "孙丽",
    email: "sunli@example.com",
    phone: "134****2345",
    avatar: "",
    balance: 0,
    status: "inactive",
    registeredAt: "2024-01-20",
    lastLoginAt: "2024-01-22 08:30",
  },
];

export const userStatusLabels: Record<PlatformUserStatus, string> = {
  active: "正常",
  inactive: "未激活",
  banned: "已封禁",
};

export function getUserById(id: string): PlatformUser | undefined {
  return platformUsers.find((u) => u.id === id);
}

"use client";

import { useState } from "react";

import Link from "next/link";

import { AlertCircle, Bell, CheckCircle2, CreditCard, FileText, Info, MailOpen, Settings, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// 通知类型
type NotificationType = "system" | "order" | "billing" | "task";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  time: string;
  read: boolean;
  link?: string;
}

// 模拟通知数据
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "订单已完成",
    content: "您的外链代发订单 #ORD-2024-001 已全部完成，请查看报告。",
    time: "10 分钟前",
    read: false,
    link: "/dashboard/seo-monitor",
  },
  {
    id: "2",
    type: "billing",
    title: "充值成功",
    content: "您已成功充值 ¥1,000，当前余额 ¥2,580。",
    time: "1 小时前",
    read: false,
    link: "/dashboard/billing",
  },
  {
    id: "3",
    type: "task",
    title: "任务进度更新",
    content: "客座文章任务「SaaS 行业趋势分析」已发布 3/5 篇。",
    time: "2 小时前",
    read: false,
    link: "/dashboard/seo-monitor",
  },
  {
    id: "4",
    type: "system",
    title: "系统维护通知",
    content: "系统将于 2024-02-01 凌晨 2:00-4:00 进行维护升级，届时服务将暂停。",
    time: "昨天",
    read: true,
  },
  {
    id: "5",
    type: "order",
    title: "新订单创建",
    content: "您已成功创建 GEO 优化订单 #ORD-2024-002。",
    time: "昨天",
    read: true,
    link: "/dashboard/geo-monitor",
  },
  {
    id: "6",
    type: "system",
    title: "新功能上线",
    content: "社交媒体发布服务已上线，支持 Reddit、Instagram、X 平台。",
    time: "3 天前",
    read: true,
    link: "/dashboard/services/social",
  },
];

const typeConfig: Record<NotificationType, { icon: typeof Bell; label: string; color: string }> = {
  system: { icon: Info, label: "系统", color: "text-blue-500" },
  order: { icon: FileText, label: "订单", color: "text-emerald-500" },
  billing: { icon: CreditCard, label: "账单", color: "text-amber-500" },
  task: { icon: CheckCircle2, label: "任务", color: "text-purple-500" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<NotificationType | "all">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const selectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  const markAsRead = (ids: string[]) => {
    setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)));
    setSelectedIds([]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotifications = (ids: string[]) => {
    setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)));
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">通知消息</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `您有 ${unreadCount} 条未读消息` : "暂无未读消息"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <MailOpen className="h-4 w-4 mr-1.5" />
              全部已读
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/account">
              <Settings className="h-4 w-4 mr-1.5" />
              通知设置
            </Link>
          </Button>
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="flex items-center gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          全部
        </Button>
        {Object.entries(typeConfig).map(([key, config]) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(key as NotificationType)}
          >
            {config.label}
          </Button>
        ))}
      </div>

      {/* 批量操作 */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <span className="text-sm">已选择 {selectedIds.length} 项</span>
          <Button variant="outline" size="sm" onClick={() => markAsRead(selectedIds)}>
            标为已读
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive"
            onClick={() => deleteNotifications(selectedIds)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            删除
          </Button>
        </div>
      )}

      {/* 通知列表 */}
      <div className="rounded-lg border bg-card">
        {/* 列表头部 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Checkbox
            checked={filteredNotifications.length > 0 && selectedIds.length === filteredNotifications.length}
            onCheckedChange={selectAll}
          />
          <span className="text-sm text-muted-foreground">{filteredNotifications.length} 条通知</span>
        </div>

        {/* 通知项 */}
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Bell className="h-12 w-12 mb-4 opacity-20" />
            <p>暂无通知</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredNotifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 px-4 py-4 hover:bg-muted/30 transition-colors ${
                    !notification.read ? "bg-muted/20" : ""
                  }`}
                >
                  <Checkbox
                    checked={selectedIds.includes(notification.id)}
                    onCheckedChange={() => toggleSelect(notification.id)}
                    className="mt-1"
                  />
                  <div className={`mt-0.5 ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${!notification.read ? "" : "text-muted-foreground"}`}>
                        {notification.title}
                      </span>
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                      <Badge variant="secondary" className="text-xs">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {notification.link && (
                        <Link
                          href={notification.link}
                          className="text-xs text-primary hover:underline"
                          onClick={() => markAsRead([notification.id])}
                        >
                          查看详情
                        </Link>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteNotifications([notification.id])}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

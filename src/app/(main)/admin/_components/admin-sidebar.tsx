"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ChevronDown, ShieldCheck, ArrowLeft } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { adminSidebarItems } from "@/navigation/sidebar/admin-sidebar-items";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => 
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // Auto-expand menus that contain the current path
  const isMenuOpen = (item: { title: string; url: string; subItems?: { url: string }[] }) => {
    if (openMenus.includes(item.title)) return true;
    if (item.subItems?.some((sub) => path.startsWith(sub.url))) return true;
    return false;
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-base font-semibold truncate group-data-[collapsible=icon]:hidden">管理后台</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {adminSidebarItems.map((group) => (
          <SidebarGroup key={group.id}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = path === item.url || (path.startsWith(item.url + "/") && !item.subItems);
                const hasSubItems = item.subItems && item.subItems.length > 0;

                if (hasSubItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isMenuOpen(item)}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems?.map((subItem) => {
                              const isSubActive = path === subItem.url || path.startsWith(subItem.url + "/");
                              return (
                                <SidebarMenuSubItem key={subItem.url}>
                                  <SidebarMenuSubButton asChild isActive={isSubActive}>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <span
                            className={cn("ml-auto text-xs px-1.5 py-0.5 rounded-full", "bg-primary/10 text-primary")}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="返回用户端">
              <Link href="/dashboard/home" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">返回用户端</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

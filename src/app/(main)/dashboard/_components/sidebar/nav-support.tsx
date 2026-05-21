"use client";

import { Headphones, MessageSquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavSupport() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-2 p-2">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
            <a href="/dashboard/support/ticket">
              <MessageSquarePlus className="h-4 w-4" />
              提交工单
            </a>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
            <a href="/dashboard/support/contact">
              <Headphones className="h-4 w-4" />
              联系客服
            </a>
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

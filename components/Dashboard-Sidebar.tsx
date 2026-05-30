"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FolderKanban, Newspaper, LogOut } from "lucide-react";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { dashboardLogoutAction } from "@/lib/actions/auth/action";
import { useArabicText } from "@/lib/utils/arabic-helper";

const NAV = [
  {
    label: "Project Management",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Blog Management",
    href: "/dashboard/blogs",
    icon: Newspaper,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { isArabic } = useArabicText();

  return (
    <Sidebar
      side={isArabic ? "right" : "left"}
      collapsible="icon"
      className="top-20! h-[calc(100svh-80px)]!"
    >
      {/* ── Header ── */}
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground truncate group-data-[collapsible=icon]:hidden">
            Dashboard
          </span>
        </div>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            {NAV.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={active}
                    tooltip={label}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: logout ── */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              onClick={() => dashboardLogoutAction()}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

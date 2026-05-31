"use client";

import { usePathname, useRouter } from "next/navigation";
import { FolderKanban, Newspaper, LogOut, LayoutDashboard } from "lucide-react";
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
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { dashboardLogoutAction } from "@/lib/actions/auth/action";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { useTranslations } from "next-intl";

const NAV = [
  {
    labelKey: "ProjectManagement",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  { labelKey: "BlogManagement", href: "/dashboard/blogs", icon: Newspaper },
] as const;

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const { isArabic } = useArabicText();

  return (
    <Sidebar
      side={isArabic ? "right" : "left"}
      collapsible="icon"
      className="top-20! h-[calc(100svh-80px)]! border-border"
    >
      {/* ── Header ── */}
      <SidebarHeader className="p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <LayoutDashboard size={14} />
          </div>

          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground leading-none">
              {t("Dashboard")}
            </span>
          </div>

          <SidebarTrigger className="ms-auto text-muted-foreground hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </SidebarHeader>

      {/* ── Divider ── */}
      <div className="mx-3 border-t border-sidebar-border" />

      {/* ── Nav ── */}
      <SidebarContent className="p-2 pt-3">
        <SidebarGroup className="p-0 gap-1">
          <SidebarGroupLabel className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground group-data-[collapsible=icon]:hidden">
            {t("Management")}
          </SidebarGroupLabel>

          <SidebarMenu className="gap-0.5">
            {NAV.map(({ labelKey, href, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    tooltip={t(labelKey)}
                    onClick={() => !active && router.replace(href)}
                    className={[
                      "text-sm font-medium transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-primary! text-primary-foreground! hover:bg-primary/90! cursor-default"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    ].join(" ")}
                  >
                    <Icon size={16} />
                    <span>{t(labelKey)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer ── */}
      <div className="mx-3 border-t border-sidebar-border" />
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t("Logout")}
              onClick={() => dashboardLogoutAction()}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200
                         hover:bg-destructive/10 hover:text-destructive
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut size={16} />
              <span>{t("Logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

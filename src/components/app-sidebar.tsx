"use client";

import * as React from "react";
import {
  Home,
  Settings,
  Users,
  BarChart3,
  Calendar,
  FileText,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar";
import AppLocaleSwitcher from "./LanguageSwitcher";

// Sample data for navigation items
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    isActive: false,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
    isActive: false,
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FileText,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    isActive: false,
  },
];

const userData = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(navItems[0]);

  return (
    <Sidebar collapsible="icon" className="overflow-hidden" {...props}>
      <SidebarHeader>
        <AppLocaleSwitcher />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FishTer</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    onClick={() => setActiveItem(item)}
                    isActive={activeItem?.title === item.title}
                    className="px-2.5 md:px-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}

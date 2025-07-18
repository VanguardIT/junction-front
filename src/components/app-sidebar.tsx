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
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/routes";

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
              <Link href="/dashboard">
                <Image
                  src="/imgs/logo.png"
                  alt="FishTer"
                  width={52}
                  height={52}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-xl">FishTer</span>
                </div>
              </Link>
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
                    <Link href={item.url}>{item.title}</Link>
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

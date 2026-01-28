"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Chart, TableDocument, Eye, User } from "iconsax-reactjs"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Chart,
  },
  {
    title: "Tableau des créas",
    url: "/dashboard/tableau",
    icon: TableDocument,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
                  <Eye size={18} color="#fff" variant="Bold" />
                </div>
                <span className="text-base font-semibold">Turing Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url || 
                  (item.url === "/dashboard" && pathname === "/dashboard") ||
                  (item.url !== "/dashboard" && pathname.startsWith(item.url))
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon 
                          size={20} 
                          variant={isActive ? "Bold" : "Linear"} 
                          className={isActive ? "text-purple-600" : ""}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <User size={20} className="text-purple-600" variant="Bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Marie Dupont</span>
            <span className="text-xs text-muted-foreground">Growth Manager</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

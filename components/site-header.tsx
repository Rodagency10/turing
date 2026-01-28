"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/tableau": "Tableau des créas",
}

export function SiteHeader() {
  const pathname = usePathname()
  
  // Get page title based on pathname
  let title = pageTitles[pathname] || "Détail créa"
  if (pathname.startsWith("/dashboard/crea/")) {
    title = "Détail créa"
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-semibold">{title}</h1>
      </div>
    </header>
  )
}

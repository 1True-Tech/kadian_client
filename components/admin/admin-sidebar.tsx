"use client";
import { Home, LogOut, Package, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Profile from "@/app/(ADMIN)/admin/(pages)/components/profile"
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Inventory", href: "/admin/inventory", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/users", icon: Users },
]



export function AdminSidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  

  return (
    <Sidebar className="z-50 sticky top-0 min-h-[100dvh] min-w-3xs">
      <SidebarContent className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 shadow-lg border-r border-border/40">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border/40 bg-gradient-to-b from-background to-card flex items-center justify-between">
            <Profile />
            <SidebarTrigger className="ml-2 h-9 w-9 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/5 transition-all duration-200"/>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs uppercase tracking-wider text-muted-foreground/70 font-medium">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-4">
                <SidebarMenu className="flex flex-col gap-small">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.href} className="px-2">
                      <SidebarMenuButton
                        asChild
                        className={`w-full rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all duration-200 ${
                          isActive(item.href)
                            ? "bg-accent/90 text-accent-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/5 hover:shadow-sm"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 transition-colors duration-200 ${
                            isActive(item.href) 
                              ? "text-accent-foreground" 
                              : "text-muted-foreground/70"
                          }`} />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-6 opacity-40" />

            {/* Quick Actions */}
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs uppercase tracking-wider text-muted-foreground/70 font-medium">
                Quick Actions
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-4">
                <SidebarMenu className="flex flex-col gap-small">
                  <SidebarMenuItem className="px-2">
                    <SidebarMenuButton asChild>
                      <Link
                        href="/"
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground hover:bg-accent/5 hover:shadow-sm transition-all duration-200 flex items-center gap-3"
                      >
                        <Home className="h-5 w-5" />
                        <span>View Store</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="px-2">
                    <SidebarMenuButton asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-destructive/90 hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
                      >
                        <LogOut className="h-5 w-5 mr-3 text-destructive/70" />
                        <span>Sign Out</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

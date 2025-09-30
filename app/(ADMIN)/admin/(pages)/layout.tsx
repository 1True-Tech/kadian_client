import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Kadian Admin Dashboard - Manage products, orders, and users",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/";
  const otherPath = pathname.split("/").pop()
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background/95 to-muted/10">
        {/* Sidebar overlays on mobile, static on desktop */}
        <AdminSidebar />
  <div className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Header */}
          <header className="bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 border-b border-border/40 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20 transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-4 sm:gap-6">
                <SidebarTrigger className="h-9 w-9 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/5 transition-all duration-200 lg:hidden" />
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight truncate">
                  {pathname === "/admin"
                    ? "Dashboard"
                    : otherPath
                    ? otherPath.charAt(0).toUpperCase() +
                      otherPath.slice(1)
                    : "Dashboard"}
                </h2>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground/90 font-medium tracking-wide">
                  Welcome back, Admin
                </span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-full bg-card/40 backdrop-blur-sm supports-[backdrop-filter]:bg-card/20 px-0 sm:px-2 md:px-4 py-4 overflow-x-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

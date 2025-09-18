import { Loader } from "@/components/ui/loaders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LoadUser } from "@/lib/controllers/_loadUser";
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

  return (
    <>
      <Loader loader="flip-text-loader" text="KADIAN" loaderSize="fullscreen">
        <LoadUser rerouteOnFail />
      </Loader>
      <SidebarProvider>
        <AdminSidebar pathname={pathname} />
        <div className="min-h-screen w-full bg-gradient-to-br from-background via-background/95 to-muted/10">
          <div className="w-full min-h-screen bg-background/40">
            {/* Header */}
            <header className="bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 border-b border-border/40 px-8 py-4 sticky top-0 z-20 transition-all duration-200 shadow-sm">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                  <SidebarTrigger className="h-9 w-9 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/5 transition-all duration-200 lg:hidden" />
                  <h2 className="text-xl font-semibold tracking-tight">
                    {pathname === "/admin"
                      ? "Dashboard"
                      : pathname.split("/").pop()
                        ? pathname.split("/").pop()!.charAt(0).toUpperCase() +
                          pathname.split("/").pop()!.slice(1)
                        : "Dashboard"}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground/90 font-medium tracking-wide">
                    Welcome back, Admin
                  </span>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="p-0 w-full mx-auto">
              <div className="w-full bg-card/40 backdrop-blur-sm supports-[backdrop-filter]:bg-card/20 p-container">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;

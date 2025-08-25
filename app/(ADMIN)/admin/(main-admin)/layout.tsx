import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";
import { LoadUser } from "@/lib/controllers/_loadUser";
import {
  BarChart3,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/";

  const navigationItems = [
    { label: "Dashboard", href: "/admin", icon: Home },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Loader loader="flip-text-loader" text="KADIAN" loaderSize="fullscreen">
        <LoadUser />
      </Loader>
      <div className="min-h-screen bg-muted/30">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-card border-r sticky top-0 h-[100dvh] flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-rose rounded-lg flex items-center justify-center">
                  <span className="text-rose-gold-foreground font-semibold text-sm">
                    K
                  </span>
                </div>
                <div>
                  <h1 className="font-semibold">Kadian Admin</h1>
                  <p className="text-xs text-muted-foreground">
                    Fashion Management
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <Separator className="my-4" />

              {/* Quick Actions */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Home className="h-4 w-4" />
                  View Store
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <header className="bg-card border-b px-6 py-4 sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {navigationItems.find((item) => isActive(item.href))?.label ||
                    "Dashboard"}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome back, Admin
                  </span>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

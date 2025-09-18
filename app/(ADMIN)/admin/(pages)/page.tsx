"use client";

import React, { useEffect, useState } from "react";
import { DashboardMetric } from "@/app/api/admin/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@/lib/server/client-hook";
import {
  DollarSign,
  Eye,
  InboxIcon,
  Package,
  PlusIcon,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action?: { label: string; onClick?: () => void };
};

function EmptyState({
  title,
  description,
  Icon = InboxIcon,
  action,
}: EmptyStateProps) {
  return (
    <div className="w-full py-10 px-6 flex flex-col items-center justify-center gap-3 text-center">
      <div className="p-4 rounded-full bg-muted/40 border border-muted-foreground/10">
        <Icon className="h-8 w-8" />
      </div>
      <p className="font-medium">{title}</p>
      {description ? (
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      ) : null}

      {action ? (
        <Button
          variant="ghost"
          size="sm"
          className="mt-3"
          onClick={action.onClick}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
function AnimatedNumber({
  value,
  duration = 900,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = Number(value) || 0;
    if (start === end) return;
    const startTime = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * (end - start) + start);
      setDisplay(current);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span className="text-2xl md:text-3xl lg:text-4xl font-semibold">
      {new Intl.NumberFormat().format(display)}
    </span>
  );
}

const AdminDashboard: React.FC = () => {
  const { run, data, status, error } = useQuery("getAdminDashboard");

  useEffect(() => {
    if (status === "idle") run();
  }, [status, run]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500">Error loading dashboard: {String(error)}</p>
      </div>
    );
  }

  const adminDashboard = (data?.data || {}) as DashboardMetric;

  const stats = (adminDashboard.stats || []).map((ad) => ({
    title: ad.title,
    value: ad.value,
    change: ad.change,
    color: ad.positive ? "text-green-500" : "text-red-500",
    colorBg: ad.positive
      ? "from-emerald-50 to-emerald-100 text-emerald-600 ring-emerald-200/40"
      : "from-rose-50 to-rose-100 text-rose-600 ring-rose-200/40",
    icon:
      ad.type === "orders"
        ? ShoppingCart
        : ad.type === "revenue"
          ? DollarSign
          : ad.type === "users"
            ? Users
            : TrendingUp,
    positive: ad.positive,
  }));

  const recentOrders = adminDashboard.recentOrders || [];
  const topProducts = adminDashboard.topProducts || [];

  const getStatusColor = (s: string) => {
    switch ((s || "").toLowerCase()) {
      case "delivered":
        return "success";
      case "shipped":
        return "default";
      case "processing":
        return "warning";
      case "pending":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon as React.ComponentType<
            React.SVGProps<SVGSVGElement>
          >;
          return (
            <Card
              key={stat.title}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {stat.title}
                    </p>
                    <AnimatedNumber value={Number(stat.value) || 0} />
                    <p className={`text-sm mt-2 ${stat.color}`}>
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      {stat.change}
                    </p>
                  </div>

                  <div className="relative">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${stat.colorBg} ring-1`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-200/20 to-transparent blur-md pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            { recentOrders.length>0&&<Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>}
          </CardHeader>

          <CardContent>
            <div className="divide-y divide-muted-foreground/10">
              {recentOrders.length === 0 ? (
                <EmptyState
                  title="No recent orders"
                  description="No orders were placed in the selected time range"
                  Icon={ShoppingCart}
                  action={{
                    label: "Create Order",
                    onClick: () => console.log("create order clicked"),
                  }}
                />
              ) : (
                recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="shrink w-[60%]">
                      <p className="font-medium truncate">{order.id}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {order.customer}
                      </p>
                    </div>

                    <div className="text-right w-fit shrink-0">
                      <p className="font-medium font-mono">{order.amount}</p>
                      <div className="flex items-center justify-end gap-2 mt-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-500"
                              : order.status === "pending"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                        <Badge
                          variant={getStatusColor(order.status) as any}
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Top Products</CardTitle>
            {
             topProducts.length>0&& <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
            }
          </CardHeader>

          <CardContent>
            <div className="divide-y divide-muted-foreground/10">
              {topProducts.length === 0 ? (
                <EmptyState
                  title="No top products"
                  description="No product has enough sales to appear here yet"
                  Icon={Package}
                  action={{
                    label: "Add Product",
                    onClick: () => console.log("add product clicked"),
                  }}
                />
              ) : (
                topProducts.map((product: any, index: number) => (
                  <div
                    key={product.name}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] md:grid-cols-3 gap-4">
            <Button
              className="h-20 flex-col gap-2 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              variant="outline"
            >
              <div className="p-2 rounded-md bg-gradient-to-br from-indigo-50 to-indigo-100">
                <Package className="h-6 w-6" />
              </div>

              <span>Add Product</span>
            </Button>

            <Button
              className="h-20 flex-col gap-2 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              variant="outline"
            >
              <div className="p-2 rounded-md bg-gradient-to-br from-emerald-50 to-emerald-100">
                <ShoppingCart className="h-6 w-6" />
              </div>

              <span>Process Orders</span>
            </Button>

            <Button
              className="h-20 flex-col gap-2 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              variant="outline"
            >
              <div className="p-2 rounded-md bg-gradient-to-br from-amber-50 to-amber-100">
                <Users className="h-6 w-6" />
              </div>

              <span>Manage Customers</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

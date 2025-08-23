import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,567",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Orders",
      value: "148",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-accent"
    },
    {
      title: "Customers",
      value: "1,247",
      change: "+15.3%",
      icon: Users,
      color: "text-rose-gold"
    },
    {
      title: "Products",
      value: "89",
      change: "+5.1%",
      icon: Package,
      color: "text-muted-foreground"
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Sarah Johnson", amount: "$149.99", status: "processing" },
    { id: "ORD-002", customer: "Mike Chen", amount: "$89.99", status: "shipped" },
    { id: "ORD-003", customer: "Emma Wilson", amount: "$234.99", status: "delivered" },
    { id: "ORD-004", customer: "David Brown", amount: "$67.99", status: "pending" },
    { id: "ORD-005", customer: "Lisa Garcia", amount: "$199.99", status: "processing" }
  ];

  const topProducts = [
    { name: "Silk Wrap Dress", sales: 45, revenue: "$6,749.55" },
    { name: "Knit Sweater", sales: 38, revenue: "$3,039.62" },
    { name: "Wide Leg Trousers", sales: 32, revenue: "$3,839.68" },
    { name: "Blazer Jacket", sales: 28, revenue: "$4,479.72" },
    { name: "Cotton Maxi Dress", sales: 25, revenue: "$2,249.75" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'default';
      case 'processing': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                      <p className={`text-sm mt-1 ${stat.color}`}>
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <Badge variant={getStatusColor(order.status) as any} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-medium">{product.revenue}</p>
                  </div>
                ))}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Package className="h-6 w-6" />
                Add Product
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ShoppingCart className="h-6 w-6" />
                Process Orders
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Manage Customers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default AdminDashboard;
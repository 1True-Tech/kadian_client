"use client"
import { useState } from "react";
import { User, Package, MapPin, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUser } from "@/assets/dummy-data/mockData";

const Dashboard = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "shipped":
        return "default";
      case "processing":
        return "warning";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-rose rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-10 w-10 text-rose-gold-foreground" />
              </div>
              <CardTitle className="text-xl font-light">
                {user.firstName} {user.lastName}
              </CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-3" />
                  Profile Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-3" />
                  Order History
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-3" />
                  Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-3" />
                  Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Account Settings
                </Button>
                <Separator className="my-4" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <h3 className="font-semibold text-2xl">
                      {user.orders.length}
                    </h3>
                    <p className="text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <h3 className="font-semibold text-2xl">
                      {user.wishlist.length}
                    </h3>
                    <p className="text-muted-foreground">Wishlist Items</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <h3 className="font-semibold text-2xl">
                      {user.addresses.length}
                    </h3>
                    <p className="text-muted-foreground">Saved Addresses</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(order.status) as any}>
                            {order.status}
                          </Badge>
                          <p className="text-sm mt-1">${order.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {order.date}
                            </p>
                          </div>
                          <Badge variant={getStatusColor(order.status) as any}>
                            {order.status}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {item.size} • {item.color} • Qty:{" "}
                                  {item.quantity}
                                </p>
                                <p className="text-sm font-medium">
                                  ${item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <span className="font-semibold">
                            Total: ${order.total}
                          </span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={user.firstName}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={user.lastName}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={user.phone || ""}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-4">
                        <Button type="submit" className="btn-hero">
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button variant="outline">Add New Address</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{address.name}</h3>
                              {address.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {address.street}
                              <br />
                              {address.city}, {address.state} {address.zipCode}
                              <br />
                              {address.country}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

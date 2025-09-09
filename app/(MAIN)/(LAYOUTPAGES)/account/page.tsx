"use client";
import { mockProducts } from "@/assets/dummy-data/mockData";
import AddressItem from "@/components/pages/account/AddressItem";
import OrderHistoryItem from "@/components/pages/account/OrderHistoryItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStatusColor } from "@/lib/utils/getStatusColor";
import { useUserStore } from "@/store/user";
import { OrderPreviewReady } from "@/types/user";
import { Heart, MapPin, MoveRight, MoveRightIcon, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user, actions } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update
  };
  console.log(user)


  if (!user) return null;
  const {orders} = user


  return (
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
                <h3 className="font-semibold text-2xl">{user.orders.length}</h3>
                <p className="text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-accent" />
                <h3 className="font-semibold text-2xl">
                  {user.wishList.length}
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
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(order.status) as any}>
                        {order.status}
                      </Badge>
                      <p className="text-sm mt-1">${order.totalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-8">
          <Card>
            <CardHeader className="flex justify-between w-full flex-row">
              <CardTitle>Order History</CardTitle>
              <Link href="/account/order-history" className="w-fit flex gap-small items-center"> See all orders <MoveRightIcon/> </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orders.map((order, idx) => <OrderHistoryItem key={idx} {...order} />)}
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
                      value={user.name.first}
                      disabled={!isEditing}
                      // onChange={(e) =>
                      //   setUser({ ...user, firstName: e.target.value })
                      // }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={user.name.last}
                      disabled={!isEditing}
                      // onChange={(e) =>
                      //   setUser({ ...user, lastName: e.target.value })
                      // }
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
                    // onChange={(e) =>
                    //   setUser({ ...user, email: e.target.value })
                    // }
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={user.phone || ""}
                    disabled={!isEditing}
                    // onChange={(e) =>
                    //   setUser({ ...user, phone: e.target.value })
                    // }
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
              <div className="flex gap-4 items-center">
                <Link href="/account/addresses" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                  See all addresses <MoveRightIcon className="h-4 w-4" />
                </Link>
                <Button variant="outline">Add New Address</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.addresses.slice(0, 3).map((address, idx) => (
                  <AddressItem key={idx} address={address}/>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

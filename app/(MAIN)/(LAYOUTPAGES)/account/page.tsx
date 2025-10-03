"use client";
import AddressItem from "@/components/pages/account/AddressItem";
import OrderHistoryItem from "@/components/pages/account/OrderHistoryItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loaders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateMe } from "@/lib/server/handlers";
import { getStatusColor } from "@/lib/utils/getStatusColor";
import { useUserStore } from "@/store/user";
import { Heart, MapPin, MoveRightIcon, Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  );
};

const DashboardContent = () => {
  const { user, actions, userInfoStatus } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName: user?.name.first || "",
    lastName: user?.name.last || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // E.164 regex: starts with +, then 1–15 digits
    const e164Regex = /^\+\d{1,15}$/;

    if (userInfo.phone && !e164Regex.test(userInfo.phone)) {
      actions.setUserInfoStatus("phone", {
        error: true,
        isLoading: false,
        message: "Phone must be in E.164 format (+123456789)",
      });
      toast.error("Phone number must be in E.164 format, e.g. +123456789");
      return;
    }

    try {
      actions.setUserInfoStatus("email", {
        error: false,
        isLoading: true,
        message: "",
      });
      actions.setUserInfoStatus("name", {
        error: false,
        isLoading: true,
        message: "",
      });
      actions.setUserInfoStatus("phone", {
        error: false,
        isLoading: true,
        message: "",
      });

      const updatedUser = await updateMe({
        body: {
          name: { first: userInfo.firstName, last: userInfo.lastName },
          email: userInfo.email,
          phone: userInfo.phone,
        },
      });

      if (!updatedUser.success) {
        actions.setUserInfoStatus("email", {
          error: true,
          isLoading: false,
          message: updatedUser.message || "Failed to update profile",
        });
        actions.setUserInfoStatus("name", {
          error: true,
          isLoading: false,
          message: updatedUser.message || "Failed to update profile",
        });
        actions.setUserInfoStatus("phone", {
          error: true,
          isLoading: false,
          message: updatedUser.message || "Failed to update profile",
        });

        toast.error(updatedUser.message || "Failed to update profile");
      }

      if (updatedUser.success && updatedUser.data) {
        actions.setUser({
          ...user!,
          name: {
            first: userInfo.firstName,
            last: userInfo.lastName,
          },
          email: userInfo.email,
          phone: userInfo.phone,
        });
        toast.success("Profile updated successfully");
      }
    } catch {
      toast.error("Unexpected error while updating profile");
    } finally {
      actions.setUserInfoStatus("email", {
        error: false,
        isLoading: false,
        message: "",
      });
      actions.setUserInfoStatus("name", {
        error: false,
        isLoading: false,
        message: "",
      });
      actions.setUserInfoStatus("phone", {
        error: false,
        isLoading: false,
        message: "",
      });
      setIsEditing(false);
    }
  };

  // Simulate loading completion after user data is available
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Loader
        loaderSize="fullscreen"
        loader="flip-text-loader"
        text="Loading account information..."
      />
    );
  }

  if (!user) return null;
  const { orders } = user;

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
                <h3 className="font-semibold text-2xl">
                  {user.orders?.length}
                </h3>
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
              <CardTitle className="text-base sm:text-lg md:text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.orders?.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <Link
                        href={`/account/order-history/${order.id}`}
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        <p className="font-medium">Order #{order.id}</p>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(order.status) as any}>
                        {order.status}
                      </Badge>
                      <p className="text-sm mt-1">
                        ${order.totalAmount.toFixed(2)}
                      </p>
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
              <CardTitle className="text-base sm:text-lg md:text-xl">Order History</CardTitle>
              <Link
                href="/account/order-history"
                className="w-fit flex gap-small items-center"
              >
                {" "}
                See all orders <MoveRightIcon />{" "}
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orders?.map((order, idx) => (
                  <OrderHistoryItem key={idx} {...order} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base sm:text-lg md:text-xl">Profile Information</CardTitle>
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
                      value={userInfo.firstName}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={
                        userInfoStatus?.name?.isLoading ||
                        userInfoStatus?.email?.isLoading ||
                        userInfoStatus?.phone?.isLoading
                      }
                      className="btn-hero"
                    >
                      {userInfoStatus?.name?.isLoading ||
                      userInfoStatus?.email?.isLoading ||
                      userInfoStatus?.phone?.isLoading
                        ? "Saving..."
                        : "Save Changes"}
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
              <CardTitle className="text-base sm:text-lg md:text-xl">Saved Addresses</CardTitle>
              <div className="flex gap-4 items-center">
                <Link
                  href="/account/addresses"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  See all <MoveRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.addresses.slice(0, 3).map((address, idx) => (
                  <AddressItem key={idx} address={address} />
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

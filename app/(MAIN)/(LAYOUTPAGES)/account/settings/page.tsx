"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputPassword } from "@/components/ui/InputPassword";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import cookies from "@/lib/utils/cookies";
import { useUserStore } from "@/store/user";
import { BellIcon, ShieldIcon, UserIcon } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user, actions, userInfoStatus } = useUserStore();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productAlerts: true,
  });

  if (!user) return null;

  const saveNotificationSettings = async () => {
    actions.setUserInfoStatus("settings.notifications", {
      error: false,
      isLoading: true,
      message: "",
    });

    try {
      actions.updateNotificationSettings(notificationSettings);
    } catch (error) {
      actions.setUserInfoStatus("settings.notifications", {
        error: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update notification settings",
        isLoading: false,
      });
      // Clear error message after 3 seconds
      setTimeout(() => {
        actions.setUserInfoStatus("settings.notifications", {
          error: false,
          isLoading: false,
          message: "",
        });
      }, 3000);
    } finally {
      actions.setUserInfoStatus("settings.notifications", {
        error: false,
        isLoading: false,
        message: "",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
        passwordData.newPassword
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one number, and one special character"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/me/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setSuccess("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setIsPasswordDialogOpen(false);
      }, 2000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>
            Manage your account security and authentication preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Password</Label>
              <p className="text-sm text-muted-foreground">
                Last changed 3 months ago
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              Change Password
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>
            Choose what updates you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Order Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notifications about your order status
              </p>
            </div>
            <Switch
              checked={notificationSettings.orderUpdates}
              onCheckedChange={(checked) =>
                setNotificationSettings({
                  ...notificationSettings,
                  orderUpdates: checked,
                })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Promotional Offers</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about sales and special offers
              </p>
            </div>
            <Switch
              checked={notificationSettings.promotions}
              onCheckedChange={(checked) =>
                setNotificationSettings({
                  ...notificationSettings,
                  promotions: checked,
                })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Newsletter</Label>
              <p className="text-sm text-muted-foreground">
                Subscribe to our monthly newsletter
              </p>
            </div>
            <Switch
              checked={notificationSettings.newsletter}
              onCheckedChange={(checked) =>
                setNotificationSettings({
                  ...notificationSettings,
                  newsletter: checked,
                })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Product Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when items in your wishlist are back in stock
              </p>
            </div>
            <Switch
              checked={notificationSettings.productAlerts}
              onCheckedChange={(checked) =>
                setNotificationSettings({
                  ...notificationSettings,
                  productAlerts: checked,
                })
              }
            />
          </div>

          {userInfoStatus && (
            <>
              {!userInfoStatus?.["settings.notifications"]?.error &&
                userInfoStatus?.["settings.notifications"]?.message !== "" && (
                  <div
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mt-4"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      {userInfoStatus?.["settings.notifications"]?.message}
                    </span>
                  </div>
                )}

              {userInfoStatus?.["settings.notifications"]?.error &&
                !userInfoStatus?.["settings.notifications"]?.isLoading && (
                  <div
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-4"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      {userInfoStatus?.["settings.notifications"]?.message}
                    </span>
                  </div>
                )}
            </>
          )}

          <Button
            onClick={saveNotificationSettings}
            disabled={userInfoStatus?.["settings.notifications"]?.isLoading}
            className="mt-4"
          >
            {userInfoStatus?.["settings.notifications"]?.isLoading
              ? "Saving..."
              : "Save Notification Preferences"}
          </Button>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Account Management</CardTitle>
          </div>
          <CardDescription>
            Manage your account data and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Export Data</Label>
            <p className="text-sm text-muted-foreground">
              Download a copy of your personal data
            </p>
            <Button variant="outline">Export Account Data</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="text-base text-destructive">Danger Zone</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>
          {error && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <InputPassword
                  id="current"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <InputPassword
                  id="new"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters with an uppercase
                  letter, number, and special character.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <InputPassword
                  id="confirm"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsPasswordDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Changing..." : "Change Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

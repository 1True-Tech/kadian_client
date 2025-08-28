"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BellIcon, KeyIcon, ShieldIcon, UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SettingsPage() {
  const { user } = useUserStore();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productAlerts: true,
  });

  if (!user) return null;

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic
    setIsPasswordDialogOpen(false);
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

      {/* Notification Preferences */}
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
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

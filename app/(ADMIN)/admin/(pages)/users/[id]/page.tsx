"use client";

import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@/lib/server/client-hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Save, Trash2, UserCog } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserData, UserRole } from "@/types/user";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const userId = params.id as string;
  const isNewUser = userId === "new";
  
  const { run: fetchUser, data: userData, status: userStatus } = useQuery("getUserById");
  const { run: updateUser, status: updateStatus } = useQuery("updateUser");
  const { run: createUser, status: createStatus } = useQuery("createUser");
  const { run: deleteUser, status: deleteStatus } = useQuery("deleteUser");
  
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: {
      first: "",
      last: ""
    },
    phone: "",
    role: "user",
    active: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isNewUser) {
      fetchUser({ params:{userId}});
    }
  }, [fetchUser, userId, isNewUser]);

  useEffect(() => {
    if (userData?.data) {
      setUser({
        active:true,
        email:userData.data.email,
        id:userData.data._id,
        name:userData.data.name,
        phone:userData.data.phone||"",
        role:userData.data.role
      });
    }
  }, [userData]);

  useEffect(() => {
    if (updateStatus === "success") {
      toast({
        title: "User updated",
        description: "User information has been updated successfully.",
      });
      setIsSubmitting(false);
    } else if (updateStatus === "error") {
      toast({
        title: "Update failed",
        description: "Failed to update user information.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }, [updateStatus, toast]);

  useEffect(() => {
    if (createStatus === "success") {
      toast({
        title: "User created",
        description: "New user has been created successfully.",
      });
      router.push("/admin/users");
    } else if (createStatus === "error") {
      toast({
        title: "Creation failed",
        description: "Failed to create new user.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }, [createStatus, toast, router]);

  useEffect(() => {
    if (deleteStatus === "success") {
      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
      });
      router.push("/admin/users");
    } else if (deleteStatus === "error") {
      toast({
        title: "Deletion failed",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  }, [deleteStatus, toast, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUser(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRoleChange = (value: UserRole) => {
    setUser(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleActiveChange = (checked: boolean) => {
    setUser(prev => ({
      ...prev,
      active: checked
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (isNewUser) {
      createUser({body:{...user} as Partial<UserData> });
    } else {
      updateUser({ params: {userId}, body:{ ...user } as Partial<UserData> });
    }
  };

  const handleDelete = () => {
    deleteUser({ params: {userId} });
  };

  if (!isNewUser && userStatus === "loading") {
    return (
      <div className="mx-auto p-4 flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => router.push("/admin/users")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <h1 className="text-3xl font-bold">{isNewUser ? "Create New User" : "Edit User"}</h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e as any); }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Manage user&lsquo;s personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name.first">First Name</Label>
                    <Input 
                      id="name.first" 
                      name="name.first" 
                      value={user.name.first} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name.last">Last Name</Label>
                    <Input 
                      id="name.last" 
                      name="name.last" 
                      value={user.name.last} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={user.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={user.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage user&lsquo;s role and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">User Role</Label>
                  <Select 
                    value={user.role} 
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Customer</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user.role === "admin" && "Full access to all system features and settings"}
                    {user.role === "manager" && "Can manage products, orders, and view reports"}
                    {user.role === "support" && "Can view orders and handle customer inquiries"}
                    {user.role === "user" && "Standard customer account with shopping privileges"}
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="active" className="text-base">Active Account</Label>
                    <p className="text-sm text-muted-foreground">
                      User can login and access their account
                    </p>
                  </div>
                  <Switch 
                    id="active"
                    checked={user.active}
                    onCheckedChange={handleActiveChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {!isNewUser && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" type="button">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the user
                          account and remove their data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {isNewUser ? "Creating..." : "Updating..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isNewUser ? "Create User" : "Save Changes"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
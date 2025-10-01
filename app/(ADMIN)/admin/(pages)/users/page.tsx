"use client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@/lib/server/client-hook";
import { UserDataMini } from "@/types/user";
import { Plus, RefreshCw } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "../components/data-table";
import { columns } from "../components/users-columns";

const metaContentClient = {
  title: "Users Management | Admin Dashboard",
  description: "Manage user accounts",
};

const Meta = ({placeHolder}:{placeHolder?:string}) => {
  return (
    <Head>
      <title>{placeHolder}|{metaContentClient.title}</title>
      <meta name="description" content={metaContentClient.description} />
    </Head>
  );
};
export default function UsersPage() {
  const { run, data, status, error } = useQuery("getUsers");
  const [users, setUsers] = useState<UserDataMini[]>([]);

  useEffect(() => {
    if (status === "idle") run();
  }, [status, run]);

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
      toast.success("Users loaded successfully.");
    } else if (status === "error") {
      toast.error("Failed to load users: " + (error || "Unknown error"));
    }
  }, [data, status, error]);

  const handleRefresh = () => {
    run();
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="mx-auto p-4">
        <Meta placeHolder={"loading"}/>
        <h1 className="text-3xl font-bold mb-8">Users Management</h1>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto p-4">
        <Meta placeHolder={"Something went wrong"}/>
        <h1 className="text-3xl font-bold mb-8">Users Management</h1>
        <p className="text-red-500">Failed to load users data: {String(error)}</p>
        <Button onClick={handleRefresh} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
        <Meta/>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Link href="/admin/users/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </Link>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage and monitor user accounts across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns({setUsers})} 
            data={users} 
            searchKey="email" 
            placeholder="Search users by email..."
          />
        </CardContent>
      </Card>
    </div>
  );
}

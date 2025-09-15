import { Metadata } from "next";
import { DataTable } from "../components/data-table";
import { columns } from "../components/users-columns";
import { cookies } from "next/headers";
import baseUrl from "@/lib/utils/baseurl";

export const metadata: Metadata = {
  title: "Users Management | Admin Dashboard",
  description: "Manage user accounts",
};

async function getUsers() {
  try {
    const response = await fetch(`${await baseUrl()}/api/users`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${(await cookies()).get("access_token")?.value}`, //
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return { users: data.data, success: true };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], success: false };
  }
}

export default async function UsersPage() {
  const { users = [], success } = await getUsers();
  
  if (!success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Users Management</h1>
        <p className="text-red-500">Failed to load users data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>
      <div className="rounded-md border">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}

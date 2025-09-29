import { DashboardMetric } from "@/app/api/admin/route";
import { UserData, UserDataMini } from "@/types/user";
import cookies from "@/lib/utils/cookies";
import { GeneralResponse } from "@/types/structures";

/**
 * Get admin data
 */
export async function getAdminDashboard(): Promise<
  GeneralResponse & { data?: DashboardMetric }
> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/admin", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function getUsers(): Promise<GeneralResponse & { data?: UserDataMini[] }> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/users", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function getUserDetails(userId: string): Promise<GeneralResponse & { data?: UserData }> {
  const token = cookies.get("access_token") || "";
  const res = await fetch(`/api/users/${userId}`, {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function updateUserRole(userId: string, role: string): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";
  const res = await fetch(`/api/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ role }),
  });
  return res.json();
}

export async function deleteUser(userId: string): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";
  const res = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

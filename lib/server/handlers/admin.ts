import { DashboardMetric } from "@/app/api/admin/route";
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

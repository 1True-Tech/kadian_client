import { headers } from "next/headers";

export default async function baseUrl() {
  const h = await headers();
  const protocol = h.get("x-forwarded-proto") || "http";
  const host = h.get("host");
  return `${protocol}://${host}`;
}

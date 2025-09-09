"use server";

import { cookies } from "next/headers";
export interface authToken {
  access: string;
  refresh: string;
}
export default async function handleAuthToken(
  tokens: Partial<
    Record<
      keyof authToken,
      {
        token: string;
        expires: number;
      }
    >
  >
) {
  const { access, refresh } = tokens;
  // Always set cookies at the root path

  const cookieStore = await cookies();

  if (access) {
    cookieStore.set("access_token", access.token);
  }

  if (refresh) {
    cookieStore.set("refresh_token", refresh.token);
  }
}

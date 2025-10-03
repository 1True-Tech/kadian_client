"use server";
import jwt from 'jsonwebtoken';

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
  const accessDecode = jwt.decode(access?.token || "") as {
    iat: number;
    exp: number;
};
const refreshDecode = jwt.decode(access?.token || "") as {
    iat: number;
    exp: number;
};


  const cookieStore = await cookies();

  if (access) {
    cookieStore.set("access_token", access.token, {
      expires: new Date((accessDecode?.exp || 0) * 1000),
    });
  }

  if (refresh) {
    cookieStore.set("refresh_token", refresh.token, {
      expires: new Date((refreshDecode?.exp || 0) * 1000),
    });
  }
}

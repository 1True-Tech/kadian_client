import {
  LoginRequestBody,
  LoginSuccessResponse,
} from "@/app/api/auth/login/route";
import {
  RegisterRequestBody,
  RegisterSuccessResponse,
} from "@/app/api/auth/register/route";
import cookies from "@/lib/utils/cookies";
import { GeneralResponse } from "@/types/structures";
import { UserData } from "@/types/user";

/**
 * Login
 */
export async function login({body}: {body: LoginRequestBody}): Promise<GeneralResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: LoginSuccessResponse = await res.json();
  if (data.data) {
    return {
      message: data.message || "Login successful.",
      status: "good",
      statusCode: data.statusCode || res.status,
      success: true,
      connectionActivity: data.connectionActivity || "online",
    };
  } else {
    return {
      message: data.message || "Login Failed.",
      status: "bad",
      statusCode: data.statusCode || res.status,
      success: false,
      connectionActivity: data.connectionActivity || "online",
    };
  }
}

/**
 * Register
 */
export async function register(
  {body}: {body: RegisterRequestBody}
): Promise<GeneralResponse> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: RegisterSuccessResponse = await res.json();
  if (data.data) {
    return {
      message: data.message || "Registration successful.",
      status: "good",
      statusCode: data.statusCode || res.status,
      success: true,
      connectionActivity: data.connectionActivity || "online",
    };
  } else {
    return {
      message: data.message || "Registration Failed.",
      status: "bad",
      statusCode: data.statusCode || res.status,
      success: false,
      connectionActivity: data.connectionActivity || "online",
    };
  }
}

/**
 * Get current user
 * @param options - Optional parameters
 * @param options.include_orders - Whether to include user orders in the response
 */
export async function getMe({query}:{query: {include_orders:boolean}}): Promise<GeneralResponse & { data?: UserData }> {
  const token = cookies.get("access_token") || "";
  
  const url = `/api/auth/me?include_orders=${query.include_orders}`;

  const res = await fetch(url, {
    headers: { authorization: "Bearer " + token, },
  });
  return res.json();
}

/**
 * Update current user
 */
export async function updateMe(
  {body}:{body: Partial<Omit<UserData, "_id" | "id" | "role">>}
): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Delete current user
 */
export async function deleteMe(): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";

  const res = await fetch("/api/auth/me", {
    method: "DELETE",
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

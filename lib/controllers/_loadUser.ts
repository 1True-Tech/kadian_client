"use client";
import { useUserStore } from "@/store/user";
import React, { useCallback, useEffect } from "react";
import { useQuery } from "../server/client-hook";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/user";

interface ReturnStructure {
  returnHasUser?: React.ReactNode;
  returnHasNoUser?: React.ReactNode;
  returnBadAuth?: React.ReactNode;
  returnPage?: React.ReactNode;
  returnLoad?: React.ReactNode;
  rerouteOnFail?: boolean;
  pushData?: UserData;
}
export function LoadUser({
  rerouteOnFail = false,
  returnBadAuth = "bad auth",
  returnHasNoUser = "no user",
  returnLoad = "loading",
  returnPage = "page",
  pushData,
}: ReturnStructure) {
  const { user, actions, status } = useUserStore();
  const loadUserRequest = useQuery("getMe", { retry: false });
  const { push } = useRouter();

  const runUserInfo = useCallback(async () => {
    if (status !== "done" && !pushData) {
      try {
        // Use the enhanced API endpoint with include_orders parameter
        const data = await loadUserRequest.run({ query:{include_orders: "true"} });
        if (data?.data) {
          actions.setUser(data.data);
        }
        actions.setStatus("done");
      } catch (err) {
        console.error("Failed to load user:", err);
        actions.setStatus("done");
        if (rerouteOnFail) {
          push("/");
        }
      }
    }

    if (pushData) {
      actions.setUser(pushData);
      actions.setStatus("done");
    }
  }, [actions, loadUserRequest, push, pushData, rerouteOnFail, status]);
  useEffect(() => {
    if (status === "not-initialized") {
      actions.initialize();
      runUserInfo();
    }
  }, [status, actions, runUserInfo]);

  if (
    status === "loading" ||
    status === "initialized" ||
    status === "not-initialized"
  )
    return returnLoad;
  if (status === "has-error") return returnHasNoUser;

  if (user) {
    if (user.role !== "admin" && user.role !== "superadmin") return returnBadAuth;
    return returnPage;
  }
  return returnHasNoUser;
}

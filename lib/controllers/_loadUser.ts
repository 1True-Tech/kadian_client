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
  pushData?:UserData
}
export function LoadUser({
  rerouteOnFail = false,
  returnBadAuth = "bad auth",
  returnHasNoUser = "no user",
  returnLoad = "loading",
  returnPage = "page",
  pushData
}: ReturnStructure) {
  const { user, actions, status } = useUserStore();
  const loadUserRequest = useQuery("getMe", { retry: false });
  const { push } = useRouter();
  
  const runUserInfo = useCallback(async () => {
    if (status !== "done" && !pushData) {
      try {
        const data = await loadUserRequest.run();
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

    if(pushData){
      actions.setUser(pushData)
      actions.setStatus("done")
    }

  }, []);
  console.log(status);
  if (status === "not-initialized") {
    actions.initialize();
    runUserInfo();
  }

  if (
    status === "loading" ||
    status === "initialized" ||
    status === "not-initialized"
  )
    return returnLoad;
  if (status === "has-error") return returnHasNoUser;

  if (user) {
    if (user.role !== "admin") return returnBadAuth;
    return returnPage;
  }
  return returnHasNoUser;
}

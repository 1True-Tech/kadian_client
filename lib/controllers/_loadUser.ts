"use client"
import { useUserStore } from "@/store/user";
import { useEffect } from "react";

export function LoadUser() {
  const { user, actions, status } = useUserStore();
  useEffect(() => {
    if (!user || status === "not-initialized") {
      actions.initialize();
      actions.fetchUser();
    }
  }, [user,status]);


  return null;
}

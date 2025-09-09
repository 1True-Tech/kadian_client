"use client";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { useQuery } from "../server/client-hook";
import { RequestProcess } from "@/types/structures";

export function LoadUser() {
  const { user, actions, status } = useUserStore();
  const loadUserRequest = useQuery("getMe");

  useEffect(() => {
    const runUserInfo = async () => {
      try {
        const data = await loadUserRequest.run();
        if (data?.data) {
          actions.setUser(data.data);
          actions.setStatus("done"); // ✅ update status on success
        } else {
          actions.setStatus("done"); // ✅ update status if no user data
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        actions.setStatus("done"); // ✅ fallback on error
      }
    };

    if (!user || status === "not-initialized") {
      actions.initialize();
      runUserInfo();
    }
  }, [user, status]);

  return null;
}

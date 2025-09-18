"use client";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { useQuery } from "../server/client-hook";
import { useRouter } from "next/navigation";

export function LoadUser({rerouteOnFail=false}:{rerouteOnFail?:boolean}) {
  const { user, actions, status } = useUserStore();
  const loadUserRequest = useQuery("getMe");
  const {push} = useRouter()

  useEffect(() => {
    const runUserInfo = async () => {
      try {
        const data = await loadUserRequest.run();
        if (data?.data) {
          actions.setUser(data.data);
          actions.setStatus("done"); // ✅ update status on success
        } else {
          if(rerouteOnFail){
            push("/")
          }
          actions.setStatus("done"); // ✅ update status if no user data
        }
      } catch (err) {
        if(rerouteOnFail){
            push("/")
          }
        console.error("Failed to load user:", err);
        actions.setStatus("done"); // ✅ fallback on error
      }
    };

    if (!user || status === "not-initialized") {
      actions.initialize();
      runUserInfo();
    }
  }, [user, status, loadUserRequest, actions, rerouteOnFail, push]);

  return null;
}

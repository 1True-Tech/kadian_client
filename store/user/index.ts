import { updateMe } from "@/lib/server/handlers";
import cookies from "@/lib/utils/cookies";
import { NotificationSettings, SecuritySettings } from "@/types/settings";
import { toast } from "sonner";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { storeUser, UserStore } from "./types";

export const useUserStore = create<UserStore>()(
  immer((set, get) => ({
    user: null,
    userInfoStatus: null,
    status: "not-initialized",
    error: null,
    actions: {
      initialize: () => {
        set((state) => {
          state.status = "initialized";
        });
      },

      setStatus: (stats) => {
        set((state) => {
          state.status = stats;
        });
      },

      setUser: (user: storeUser) => {
        set((state) => {
          state.user = user;
          state.status = "done";
        });
      },

      logout: () => {
        set((state) => {
          state.user = null;
          state.status = "done";
        });
        cookies.remove("access_token");
        cookies.remove("refresh_token");
      },

      updateNotificationSettings: async (
        settings: Partial<NotificationSettings>
      ) => {
        const state = get();
        if (!state.user) return;

        // set loading state
        set({
          userInfoStatus: {
            ...state.userInfoStatus,
            "settings.notifications": {
              error: false,
              isLoading: true,
              message: "",
            },
          },
        });

        try {
          const res = await updateMe({
            body: { settings: { notifications: settings } },
          });

          if (!res.success) {
            set({
              userInfoStatus: {
                ...get().userInfoStatus,
                "settings.notifications": {
                  error: true,
                  isLoading: false,
                  message:
                    res.message || "Failed to update notification settings",
                },
              },
            });
            toast.error(
              res.message || "Failed to update notification settings"
            );
            return;
          }

          // update user settings
          set({
            user: {
              ...get().user!,
              settings: {
                ...get().user!.settings,
                notifications: {
                  ...get().user!.settings?.notifications,
                  ...settings,
                } as NotificationSettings,
                security: get().user!.settings?.security ?? ({} as any),
              },
            },
            userInfoStatus: {
              ...get().userInfoStatus,
              "settings.notifications": {
                error: false,
                isLoading: false,
                message: "Notification settings updated successfully",
              },
            },
          });

          toast.success("Notification settings updated successfully");
        } catch {
          toast.error("Failed to update notification settings");
        } finally {
          setTimeout(() => {
            set({
              userInfoStatus: {
                ...get().userInfoStatus,
                "settings.notifications": {
                  error: false,
                  isLoading: false,
                  message: "",
                },
              },
            });
          }, 3000);
        }
      },
      updateSecuritySettings: async (settings: Partial<SecuritySettings>) => {
  const state = get();
  if (!state.user) return;

  // set loading state
  set({
    userInfoStatus: {
      ...state.userInfoStatus,
      "settings.security": {
        error: false,
        isLoading: true,
        message: "",
      },
    },
  });

  try {
    const res = await updateMe({
      body: { settings: { security: settings } },
    });

    if (!res.success) {
      set({
        userInfoStatus: {
          ...get().userInfoStatus,
          "settings.security": {
            error: true,
            isLoading: false,
            message: res.message || "Failed to update security settings",
          },
        },
      });
      toast.error(res.message || "Failed to update security settings");
      return;
    }

    // update user settings
    set({
      user: {
        ...get().user!,
        settings: {
          ...get().user!.settings,
          security: {
            ...get().user!.settings?.security,
            ...settings,
          } as SecuritySettings,
          notifications: get().user!.settings?.notifications ?? ({} as any),
        },
      },
      userInfoStatus: {
        ...get().userInfoStatus,
        "settings.security": {
          error: false,
          isLoading: false,
          message: "Security settings updated successfully",
        },
      },
    });

    toast.success("Security settings updated successfully");
  } catch {
    toast.error("Failed to update security settings");
  } finally {
    setTimeout(() => {
      set({
        userInfoStatus: {
          ...get().userInfoStatus,
          "settings.security": {
            error: false,
            isLoading: false,
            message: "",
          },
        },
      });
    }, 3000);
  }
},
      setUserInfoStatus(key, info) {
        set((state) => {
          if (!state.userInfoStatus) {
            state.userInfoStatus = {};
          }
          state.userInfoStatus[key] = info;
        });
      },

      deleteAccount: async () => {
        set((state) => {
          state.status = "loading";
        });

        try {
          const token = cookies.get("access_token") || "";

          const res = await fetch("/api/auth/me", {
            method: "DELETE",
            headers: { authorization: "Bearer " + token },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error("Failed to delete account: " + data.message);
          }

          toast.success(data.message || "Account deleted successfully");
          // API call would go here
          set((state) => {
            state.user = null;
            state.status = "done";
          });
          cookies.remove("access_token");
          cookies.remove("refresh_token");
          return true;
        } catch (error) {
          set((state) => {
            state.status = "has-error";
            state.error = "Failed to delete account";
          });
          const errorItem = error instanceof Error ? error.message : null;
          toast.error(errorItem || "Failed to delete account");
          return false;
        }
      },
    },
  }))
);

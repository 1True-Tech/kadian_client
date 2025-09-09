import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { User, UserData } from '@/types/user';
import { UserStore } from './types';
import { fetchUser } from './controllers/fetchUser';
import { produce } from 'immer';
import cookies from '@/lib/utils/cookies';
import { NotificationSettings } from '@/types/settings';

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    user: null,
    status: 'not-initialized',
    error: null,
    actions: {
      initialize: () => {
        set((state) => {
          state.status = 'initialized';
        });
      },

      setStatus: (stats) => {
        set((state) => {
          state.status = stats;
        });

      },

      setUser: (user: UserData) => {
        set((state) => {
          state.user = user;
          state.status = 'done';
        });
      },

      logout: () => {
        set((state) => {
          state.user = null;
          state.status = 'done';
        });
        cookies.remove("access_token")
        cookies.remove("refresh_token")

      },

      updateNotificationSettings: (settings: NotificationSettings) => {
        set((state) => {
          if (state.user) {
            // state.user.settings = {
            //   ...state.user.settings,
            //   notifications: settings,
            //   security: state.user.settings?.security ?? {} as any
            // };
          }
        });
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        set((state) => {
          state.status = 'loading';
        });

        try {
          // API call would go here
          set((state) => {
            state.status = 'done';
          });
          return true;
        } catch (error) {
          set((state) => {
            state.status = 'has-error';
            state.error = 'Failed to change password';
          });
          return false;
        }
      },

      toggleTwoFactor: async (enabled: boolean) => {
        set((state) => {
          state.status = 'loading';
        });

        try {
          // API call would go here
          set((state) => {
            // if (state.user) {
            //   state.user.settings = {
            //     ...state.user.settings,
            //     security: {
            //       ...state.user.settings?.security,
            //       lastPasswordChange: state.user.settings?.security?.lastPasswordChange ?? "",
            //       twoFactorEnabled: enabled
            //     },
            //     notifications: state.user.settings?.notifications ?? {} as NotificationSettings
            //   };
            // }
            state.status = 'done';
          });
          return true;
        } catch (error) {
          set((state) => {
            state.status = 'has-error';
            state.error = 'Failed to update two-factor authentication';
          });
          return false;
        }
      },

      deleteAccount: async () => {
        set((state) => {
          state.status = 'loading';
        });

        try {
          // API call would go here
          set((state) => {
            state.user = null;
            state.status = 'done';
          });
          cookies.remove("access_token");
          cookies.remove("refresh_token");
          return true;
        } catch (error) {
          set((state) => {
            state.status = 'has-error';
            state.error = 'Failed to delete account';
          });
          return false;
        }
      },
    },
  }))
);

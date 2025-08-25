import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { User } from '@/types/user';
import { UserStore } from './types';
import { fetchUser } from './controllers/fetchUser';
import { produce } from 'immer';
import cookies from '@/lib/utils/cookies';

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

      fetchUser: async () => {
        set((state) => {
          state.status = 'loading';
          state.error = null;
        });

        set(produce((draft:UserStore) => {
            fetchUser(draft)
        }))
      },

      setUser: (user: User) => {
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
        cookies.remove("user-id")
      },
    },
  }))
);

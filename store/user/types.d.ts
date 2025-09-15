import { RequestProcess } from "@/types/structures";
import { CartItem, UserData } from "@/types/user";

export type storeUser = Omit<UserData, 'cart'>& {cart:CartItem[]}
export interface UserStore {
  user: storeUser | null;
  status: RequestProcess;
  error: string | null;
  actions: {
    initialize: () => void;
    setUser: (user: storeUser) => void;
    setStatus: (status: RequestProcess) => void;
    logout: () => void;
  };
}

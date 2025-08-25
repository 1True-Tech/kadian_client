import { RequestProcess } from "@/types/structures";
import { User } from "@/types/user";

export interface UserStore {
  user: User | null;
  status: RequestProcess;
  error: string | null;
  actions: {
    initialize: () => void;
    fetchUser: () => Promise<void>;
    setUser: (user: User) => void;
    logout: () => void;
  };
}

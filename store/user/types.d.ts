import { RequestProcess } from "@/types/structures";
import { UserData } from "@/types/user";

export interface UserStore {
  user: UserData | null;
  status: RequestProcess;
  error: string | null;
  actions: {
    initialize: () => void;
    setUser: (user: UserData) => void;
    setStatus: (status: RequestProcess) => void;
    logout: () => void;
  };
}

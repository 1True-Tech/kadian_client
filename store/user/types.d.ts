import { NotificationSettings, SecuritySettings } from "@/types/settings";
import { DeepPartial, DotNestedKeys, RequestProcess } from "@/types/structures";
import { CartItem, UserData } from "@/types/user";

export type storeUser = Omit<UserData, 'cart'>& {cart:CartItem[]}
export type UserInfoStatus = DeepPartial<Record<DotNestedKeys<UserData>, {
    error:boolean;
    isLoading:boolean;
    message: string
  }>>
export interface UserStore {
  user: storeUser | null;
  status: RequestProcess;
  error: string | null;
  userInfoStatus:UserInfoStatus | null;
  actions: {
    initialize: () => void;
    setUser: (user: storeUser) => void;
    setStatus: (status: RequestProcess) => void;
    
    updateSecuritySettings: (settings: Partial<SecuritySettings>) => void
    updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
    setUserInfoStatus: (key: DotNestedKeys<UserData>, info: {error:boolean;isLoading:boolean, message:string}) => void;
    deleteAccount: () => Promise<boolean>;
    logout: () => void;
  };
}

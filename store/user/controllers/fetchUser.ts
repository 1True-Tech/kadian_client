import { mockUsers } from "@/assets/dummy-data/mockData";
import cookies from "@/lib/utils/cookies";
import { UserStore } from "../types";

export async function fetchUser(store:UserStore){
    store.status = "done"
    const userId = cookies.get("user-id")
    store.user = mockUsers.find(i => i.id === userId) || null
}
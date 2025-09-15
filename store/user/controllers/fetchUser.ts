import { getMe } from "@/lib/server/handlers/auth";
import { UserStore } from "../types";

export async function fetchUser(store: UserStore) {
  store.status = "done";
}

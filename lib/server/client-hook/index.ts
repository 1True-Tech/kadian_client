import { useCallback, useState } from "react";
import * as api from "../handlers"; // 👈 import all your request functions here
import { Routes } from "./routes";

export type Status = "idle" | "loading" | "success" | "error";

export function useQuery<K extends keyof Routes>(
  key: K,
  options: { retry?: number | boolean } = {}
) {
  type Def = Routes[K];

  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Def["response"] | null>(null);
  const [error, setError] = useState<any>(null);

  const run = useCallback(
    async (
      args: {
        params?: Def["params"];
        query?: Record<string, string | number>;
        body?: Def["body"];
      } = {}
    ) => {
      let retries = typeof options.retry === "number" ? options.retry : options.retry === false ? 0 : 3;

      while (retries >= 0) {
        try {
          setStatus("loading");

          // Call the correct function directly
          const fn = (api as any)[key];
          if (typeof fn !== "function") {
            throw new Error(`API function for "${String(key)}" not found`);
          }

          // Pass args to function
          const result = await fn({
            params: args.params ?? undefined, // for ID/param-based functions
            body: args.body ?? undefined,
            query: args.query ?? undefined,
          });

          setData(result);
          setStatus("success");
          return result as Def["response"];
        } catch (err) {
          if (retries === 0) {
            setError(err);
            setStatus("error");
            throw err;
          }
          retries--;
        }
      }
    },
    [key, options.retry]
  );

  return { run, status, data, error };
}

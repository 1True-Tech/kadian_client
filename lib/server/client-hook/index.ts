import { useCallback, useState } from "react";
import * as api from "../handlers"; // 👈 import all your request functions here
import { Routes } from "./routes";

export type Status = "idle" | "loading" | "success" | "error";

// Define specific error types for better error handling
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection error') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Calculate exponential backoff delay
const getBackoffDelay = (attempt: number, baseDelay: number = 300): number => {
  return Math.min(baseDelay * Math.pow(2, attempt), 10000); // Max 10 seconds
};

// Helper to create a timeout promise
const createTimeout = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError()), ms);
  });
};

export function useQuery<K extends keyof Routes>(
  key: K,
  options: { 
    retry?: number | boolean;
    timeout?: number;
    retryOnStatusCodes?: number[];
  } = {}
) {
  type Def = Routes[K];

  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Def["response"] | null>(null);
  const [error, setError] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);

  const run = useCallback(
    async (
      args: {
        params?: Def["params"];
        query?: Record<string, string | number>;
        body?: Def["body"];
      } = {}
    ) => {
      const maxRetries = typeof options.retry === "number" ? options.retry : options.retry === false ? 0 : 3;
      const timeout = options.timeout || 30000; // Default 30s timeout
      const retryOnStatusCodes = options.retryOnStatusCodes || [408, 429, 500, 502, 503, 504];
      
      let currentRetry = 0;
      setRetryCount(0);

      while (currentRetry <= maxRetries) {
        try {
          setStatus("loading");

          // Call the correct function directly
          const fn = (api as any)[key];
          if (typeof fn !== "function") {
            throw new ApiError(`API function for "${String(key)}" not found`, 404);
          }

          // Create a race between the API call and a timeout
          const result = await Promise.race([
            fn({
              params: args.params ?? undefined, // for ID/param-based functions
              body: args.body ?? undefined,
              query: args.query ?? undefined,
            }),
            createTimeout(timeout)
          ]);

          setData(result);
          setStatus("success");
          return result as Def["response"];
        } catch (err: any) {
          // Determine if we should retry based on the error
          const isNetworkError = err instanceof NetworkError || 
            (err.message && (
              err.message.includes('network') || 
              err.message.includes('connection') ||
              err.message.includes('offline')
            ));
          
          const isTimeoutError = err instanceof TimeoutError || 
            (err.message && err.message.includes('timeout'));
          
          const isRetryableStatusCode = err.statusCode && 
            retryOnStatusCodes.includes(err.statusCode);
          
          const shouldRetry = isNetworkError || isTimeoutError || isRetryableStatusCode;
          
          if (currentRetry < maxRetries && shouldRetry) {
            // Implement exponential backoff
            const delay = getBackoffDelay(currentRetry);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            currentRetry++;
            setRetryCount(currentRetry);
            continue;
          }
          
          // Format error for better debugging
          let formattedError;
          if (err.statusCode) {
            formattedError = new ApiError(
              err.message || `Request failed with status ${err.statusCode}`,
              err.statusCode
            );
          } else if (err instanceof TimeoutError) {
            formattedError = err;
          } else if (isNetworkError) {
            formattedError = new NetworkError(err.message || 'Network connection error');
          } else {
            formattedError = new Error(err.message || 'Unknown error occurred');
          }
          
          setError(formattedError);
          setStatus("error");
          throw formattedError;
        }
      }
    },
    [key, options.retry, options.timeout, options.retryOnStatusCodes]
  );

  return { 
    run, 
    status, 
    data, 
    error,
    retryCount,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle'
  };
}

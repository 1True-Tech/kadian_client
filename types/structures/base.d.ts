export type FalsyValue = false | "" | 0 | 0n | null | undefined;
export type TruthyValue<T> = Exclude<T, FalsyValue>;

export namespace Booleanish {
  export type Falsy = FalsyValue;
  export type Truthy<T> = TruthyValue<T>;
}

export type TrueObject<T> = {
  [K in keyof T]: Booleanish.Truthy<T[K]>;
};

/**
 * Represents possible activity states.
 */
export type ActivityStatus = "online" | "offline";

/**
 * Represents health check result status.
 */
export type HealthStatus = "good" | "bad";

/**
 * Represents pagination details for paginated responses.
 */
export interface Pagination {
  /** Current page number. */
  page: number;
  /** Number of items per page. */
  pageSize: number;
  /** Total number of items. */
  total: number;
  /** Total number of pages. */
  totalPages: number;
}

/**
 * Standard API response structure used across endpoints.
 */
export interface GeneralResponse {
  /** Health status of the system. */
  status: HealthStatus;
  /** Current activity state. */
  connectionActivity: ActivityStatus;
  /** HTTP-like status code for operation result. */
  statusCode: number;
  /** Optional message describing the result. */
  message?: string;
  /** Indicates if the operation was successful. */
  success: boolean;
}

/**
 * Helper type that returns true if `T` is not a plain object (e.g., string, array, function).
 */
export type NonPlainObject<T> = T extends
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Function
  | Date
  | any[]
  ? true
  : false;

/**
 * A utility type that represents all possible dot-notation key paths of a nested object `T`.
 *
 * This excludes arrays, functions, and built-in object prototypes like strings and dates.
 *
 * For example, given:
 * ```ts
 * const obj = {
 *   user: {
 *     profile: {
 *       name: string;
 *     },
 *     age: number;
 *   },
 *   isAdmin: boolean;
 * };
 * ```
 *
 * `DotNestedKeys<typeof obj>` will include:
 * - "user"
 * - "user.profile"
 * - "user.profile.name"
 * - "user.age"
 * - "isAdmin"
 */
export type DotNestedKeys<T> = T extends object
  ? {
      [K in Extract<keyof T, string>]: NonPlainObject<T[K]> extends true
        ? K
        : K | `${K}.${DotNestedKeys<T[K]>}`;
    }[Extract<keyof T, string>]
  : never;

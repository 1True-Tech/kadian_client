import React from "react";

export interface HasSlot {
  children: React.ReactNode;
}
export type FalsyValue = false | "" | 0 | 0n | null | undefined;
export type TruthyValue<T> = Exclude<T, FalsyValue>;

export namespace Booleanish {
  export type Falsy = FalsyValue;
  export type Truthy<T> = TruthyValue<T>;
}

export type TrueObject<T> = {
  [K in keyof T]: Booleanish.Truthy<T[K]>;
};

interface NavItemChildrenBase {
  hasLabel?: boolean;
  items: {
    name: string;
    url: string;
  }[];
}
interface NavItemChildrenWithLabel extends NavItemChildrenBase {
  hasLabel: true;
  label: string;
}
export interface NavItem {
  label: string;
  url?: string;
  children?: NavItemChildrenWithLabel[];
}

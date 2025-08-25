import React from "react";

export interface HasSlot {
  children: React.ReactNode;
}

export interface ParamsProps<T> {
  params: Promise<T>;
}

export type LayoutWithParams<T> = ParamsProps<T> & HasSlot;
export type HasNoSlot<T> = Omit<T, "children">;

"use client";

import React from "react";
import HeaderAccountSection from "./headerAccountSection";
import { useIsMobile } from "@/lib/hooks/isMobile";

export default function HeaderTopClient() {
  const isMobile = useIsMobile(768);
  if (isMobile) return null;
  return <HeaderAccountSection />;
}

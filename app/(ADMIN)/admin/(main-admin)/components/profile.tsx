"use client"
import { useUserStore } from "@/store/user";
import Link from "next/link";
import React from "react";


export default function Profile() {
    const {user} = useUserStore()
  return (
    <Link href="/admin" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-rose rounded-lg flex items-center justify-center">
        <span className="text-rose-gold-foreground font-semibold text-sm">
          {user?.name ? user.name.first.charAt(0).toUpperCase() : "A"}
        </span>
      </div>
      <div>
        <h1 className="font-semibold">{user?.name.first} {user?.name.last}</h1>
        <p className="text-xs text-muted-foreground">Fashion Management</p>
      </div>
    </Link>
  );
}

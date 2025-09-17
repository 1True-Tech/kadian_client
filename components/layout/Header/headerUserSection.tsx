"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { AlertCircle, LoaderCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderUserSection() {
  const { user, status, error } = useUserStore();
  const pathname = usePathname(); // current URL path

  const loader = (
    <div className="w-5 h-5 animate-spin text-muted-foreground hidden sm:flex items-center justify-center">
      <LoaderCircle className="h-5 w-5" />
    </div>
  );

  if (user) {
    return (
      <Link href="/account">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <User className="h-5 w-5" />
        </Button>
      </Link>
    );
  }

  if (
    status === "not-initialized" ||
    status === "initialized" ||
    status === "loading"
  ) {
    return loader;
  }

  if (status === "has-error") {
    return (
      <div
        title={error ?? "Error loading user"}
        className="text-destructive hidden sm:flex items-center justify-center"
      >
        <AlertCircle className="h-5 w-5" />
      </div>
    );
  }

  // fallback for loaded/done but no user
  return (
    <div className="hidden sm:flex items-center gap-2">
      <Link href={`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`}>
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href={`/auth/sign-up?redirect=${encodeURIComponent(pathname)}`}>
        <Button variant="glow" size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

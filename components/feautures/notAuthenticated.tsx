"use client";

import { LogIn, UserPlus, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function NotAuthenticated() {
  const pathname = usePathname();
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md text-center p-6">
        <CardHeader>
          <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
          <CardTitle className="mt-2 text-lg font-semibold">
            You’re not signed in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted-foreground">
            Please sign in to continue, or create an account if you’re new.
          </p>
          <div className="flex gap-3">
            <Link
              href={`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`}
              className="w-1/2"
            >
              <Button className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link
              href={`/auth/sign-up?redirect=${encodeURIComponent(pathname)}`}
              className="w-1/2"
            >
              <Button variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

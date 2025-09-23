"use client";

import { ShieldAlert, Home } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Unauthorized() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md text-center p-6">
        <CardHeader>
          <ShieldAlert className="mx-auto h-10 w-10 text-yellow-500" />
          <CardTitle className="mt-2 text-lg font-semibold">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            You’re signed in, but your account doesn’t have permission to view
            this page.
          </p>
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

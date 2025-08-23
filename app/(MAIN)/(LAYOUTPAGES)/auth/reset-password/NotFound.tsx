import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-2xl font-light mb-4">Invalid Reset Link</h1>
            <p className="text-muted-foreground mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Button asChild>
              <Link href="/auth/forgot-password">Request New Link</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

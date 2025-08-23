"use client";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    setIsSubmitted(true);
    // Handle password reset
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-light">
              {isSubmitted ? "Check Your Email" : "Forgot Password"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isSubmitted
                ? "We've sent a password reset link to your email"
                : "Enter your email to reset your password"}
            </p>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  If an account with that email exists, we've sent you a link to
                  reset your password. Please check your inbox and spam folder.
                </p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/auth/sign-in">Back to Sign In</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try Different Email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full btn-hero">
                  Send Reset Link
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/sign-in"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;

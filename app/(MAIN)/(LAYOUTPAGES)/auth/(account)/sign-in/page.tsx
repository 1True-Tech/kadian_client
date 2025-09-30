"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/lib/hooks/use-toast";
import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginUser = useQuery("login");
  const getUser = useQuery("getMe");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const { actions } = useUserStore();
  const { push } = useRouter();
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const successfulSignIn = await loginUser.run({
      body: formData,
    });

    if (successfulSignIn?.status === "good" && successfulSignIn.success) {
      const userData = await getUser.run({query: {include_orders: "true"}});
      if (userData?.success && userData.data) {
        actions.setUser(userData.data);
        push(redirect);
      }
      {
        toast({
          title: "User information failed to load",
          description: userData?.message,
        });
      }
    } else {
      toast({
        title: "Sign In Failed",
        description: successfulSignIn?.message,
        variant: "destructive",
      });
    }
    // Handle sign in
  };

  return (
    <div className="w-full px-container py-16 md:py-0">
      <div className="max-w-md mx-auto">
        <Card className="bg-transparent backdrop-blur-md md:!border-0 md:!shadow-none">
          <CardHeader className="text-center md:text-left">
            <CardTitle className="text-2xl text-background md:text-foreground font-light font-cinzel">
              Welcome Back
            </CardTitle>
            <p className="text-primary-foreground md:text-foreground/70">
              Sign in to your account
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-background md:text-foreground"
            >
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  className="text-black"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="user123"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    className="text-black"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", !!checked)
                    }
                    className="border-white md:border-foreground"
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-accent hover:text-accent/80 md:text-primary md:hover:text-primary/80 font-bold"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                variant={"ghost"}
                disabled={loginUser.status === "loading" || getUser.status === "loading"}
                className="w-full btn-hero bg-accent text-accent-foreground"
              >
                {
                  loginUser.status==="loading"?"Signing In...":getUser.status ==="loading"?"Loading User...":"Sign In"
                }
              </Button>

              <div className="text-center md:text-left">
                <span className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="text-accent hover:text-accent/80 md:text-primary md:hover:text-primary/80 font-bold"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;

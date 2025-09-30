"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const signUpUser = useQuery("register");
  const getUser = useQuery("getMe");
  const [showPassword, setShowPassword] = useState(false);
  const { actions } = useUserStore();
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signUpUser.run({
      body: {
        email: formData.email,
        password: formData.password,
        name: {
          first: formData.firstName,
          last: formData.lastName,
        },
        username: formData.userName,
        phone: "",
      },
    });

    if (res?.success && res?.status === "good") {
      const userData = await getUser.run({query: {include_orders: "true"}});
      if (userData?.success && userData.data) {
        actions.setUser(userData.data);
        push(redirect);
      }
    }
  };

  return (
    <div className="container mx-auto px-container py-16 md:py-0">
      <div className="max-w-md mx-auto">
        <Card className="bg-transparent backdrop-blur-md md:!border-0 md:!shadow-none">
          <CardHeader className="text-center md:text-left">
            <CardTitle className="text-2xl text-background md:text-foreground font-light font-cinzel">
              Create Account
            </CardTitle>
            <p className="text-primary-foreground md:text-foreground/70">
              Join the Kadian Fashion community
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-background md:text-foreground"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    className="text-black"
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    className="text-black"
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  className="text-black"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.userName}
                  className="text-black"
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
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
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", !!checked)
                    }
                    required
                    className="border-white md:border-foreground"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-accent hover:text-accent/80 md:text-primary md:hover:text-primary/80 font-bold"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-accent hover:text-accent/80 md:text-primary md:hover:text-primary/80 font-bold"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) =>
                      handleInputChange("subscribeNewsletter", !!checked)
                    }
                    className="border-white md:border-foreground"
                  />
                  <Label htmlFor="subscribeNewsletter" className="text-sm">
                    Subscribe to our newsletter for updates and exclusive offers
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant={"ghost"}
                className="w-full btn-hero bg-accent text-accent-foreground"
                disabled={signUpUser.status === "loading" || getUser.status === "loading"}
              >
                {signUpUser.status === "loading"
                  ? "Creating Account..."
                  : getUser.status === "loading"
                  ? "Loading User..."
                  : "Sign Up"}
              </Button>

              <div className="text-center md:text-left">
                <span className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="text-accent hover:text-accent/80 md:text-primary md:hover:text-primary/80 font-bold"
                  >
                    Sign in
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

export default SignUp;

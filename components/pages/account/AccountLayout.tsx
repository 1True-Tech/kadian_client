"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user";
import { HasSlot } from "@/types/structures";
import {
  LogInIcon,
  LogOutIcon,
  MapPinIcon,
  PackageIcon,
  Settings2Icon,
  SettingsIcon,
  UserIcon,
  UserPlusIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AccountSidebar({
  children,
  mainHeader,
}: HasSlot & { mainHeader: ReactNode }) {
  const { user, actions, status } = useUserStore();
    const pathname = usePathname(); // current URL path
  if(status !== "done" && !user)  return (
    <div className="w-5 h-5 animate-spin text-muted-foreground hidden sm:flex items-center justify-center">
      <Loader unLoad={!(true && !user)} type="content-loader" loader="flip-text-loader" text="Loading User ..." loaderSize="fullscreen" />
    </div>
  );
  if (!user && status === "done")
    return (
      <section className="w-full max-w-md mx-auto text-center py-16 px-6">
        <h2 className="text-2xl font-semibold mb-4">Access Your Account</h2>
        <p className="text-muted-foreground mb-8">
          You need to be signed in to view this page.
        </p>

        <div className="flex justify-center gap-4">
          <Link href={`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`}>
            <Button variant="secondary">
              <LogInIcon className="h-4 w-4 mr-2" />
              Log In
            </Button>
          </Link>
          <Link href={`/auth/sign-up?redirect=${encodeURIComponent(pathname)}`}>
            <Button variant={"glow"}>
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </Link>
        </div>
      </section>
    );

  return (
    <div className="mx-auto py-8 px-0">
      <div className="flex flex-col md:flex-row gap-8 md:gap-0">
        <div className="h-fit md:sticky md:top-20 px-container md:pr-0 md:pl-container md:z-10 lg:w-80 flex-shrink-0">
          <Card>
            <CardHeader>
              <div className="w-20 h-20 bg-gradient-rose rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon className="h-10 w-10 text-rose-gold-foreground" />
              </div>
              <CardTitle className="text-xl font-light">
                {user?.name.first} {user?.name.last}
              </CardTitle>
              <p className="text-muted-foreground">{user?.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href={"/account"} className="w-full flex">
                  <Button variant="ghost" className="w-full justify-start">
                    <UserIcon className="h-4 w-4 mr-3" />
                    Profile
                  </Button>
                </Link>
                <Link href={"/account/order-history"} className="w-full flex">
                  <Button variant="ghost" className="w-full justify-start">
                    <PackageIcon className="h-4 w-4 mr-3" />
                    Order History
                  </Button>
                </Link>
                <Link href={"/account/addresses"} className="w-full flex">
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPinIcon className="h-4 w-4 mr-3" />
                    Addresses
                  </Button>
                </Link>
                <Link href={"/account/settings"} className="w-full flex">
                  <Button variant="ghost" className="w-full justify-start">
                    <SettingsIcon className="h-4 w-4 mr-3" />
                    Account Settings
                  </Button>
                </Link>
                {(user?.role === "admin" ||user?.role === "superadmin" ) && (
                  <Link href={"/admin"} className="w-full flex">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings2Icon className="h-4 w-4 mr-3" />
                      Admin management
                    </Button>
                  </Link>
                )}

                <Separator className="my-4" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                  onClick={() => actions.logout()}
                >
                  <LogOutIcon className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <section className="w-full relative isolate md:px-1 flex flex-col gap-small">
          {mainHeader && (
            <header className="w-full px-container z-10 min-h-20 flex items-center gap-small py-small h-fit bg-card sticky top-16">
              {mainHeader}
            </header>
          )}

          <main className="w-full px-container relative isolate">
            {/* Main Content */}
            {children}
          </main>
        </section>
      </div>
    </div>
  );
}

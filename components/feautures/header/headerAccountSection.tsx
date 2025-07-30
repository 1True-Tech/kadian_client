import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircleIcon
} from "lucide-react";
import React from "react";



export default function HeaderAccountSection({loggedInChild,notLoggedInChild}:{
  loggedInChild?:React.ReactNode;
  notLoggedInChild?:React.ReactNode;
}) {
  const isLoggedIn = false;
  return (
    <>
      {!isLoggedIn ? (
        notLoggedInChild?notLoggedInChild:<Button variant={"link"}>Sign in</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            {loggedInChild?loggedInChild:<span className="flex bg-secondary text-secondary-foreground px-4 py-1 rounded-md items-center gap-2 data-[state=open]:[--rotate:180deg] data-[state=closed]:[--rotate:0deg]">
              John Doe{" "}
              <ChevronDownIcon className="rotate-[var(--rotate)] duration-300" />
            </span>}

          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="w-fit flex items-center gap-2 shrink-0">
                <UserCircleIcon />
              </span>
              <b className="font-semibold">Profile</b>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="w-fit flex items-center gap-2 shrink-0">
                <SettingsIcon />
              </span>
              <b className="font-semibold">Settings</b>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="w-fit flex items-center gap-2 shrink-0">
                <LogOutIcon />
              </span>
              <b className="font-semibold">Logout</b>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

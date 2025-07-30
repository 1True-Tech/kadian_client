import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HeartIcon,
  LogInIcon,
  MenuIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XIcon,
} from "lucide-react";
import HeaderAccountSection from "../header/headerAccountSection";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { NavItem } from "@/types";
import HeaderNavListItem from "./headerNavItem";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  navigationList: NavItem[];
};

export default function MobileHeaderNav({ navigationList }: Props) {
  const isMobile = useIsMobile(768);
  if (!isMobile) return null;
  console.log(navigationList);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="!bg-transparent md:hidden !size-10 !p-0"
        >
          <MenuIcon
            strokeWidth={0.5}
            className="size-full scale-110 text-foreground"
          />
        </Button>
      </SheetTrigger>
      <SheetContent icon={null} side="left" className="max-w-sm">
        <SheetHeader className="w-full flex !flex-row items-center justify-between">
          <SheetTitle className="font-cinzel text-lg min-[498px]:text-2xl">
            Kadian Fashion
          </SheetTitle>
          <SheetClose>
            <XIcon className="size-8 text-foreground/70 cursor-pointer" />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="w-full shrink flex flex-col h-full px-small">
          <ul className="w-full h-fit flex flex-col gap-2">
          {navigationList.map((navItem, idx) => (
            <HeaderNavListItem key={idx} {...navItem} />
          ))}
        </ul>
        </ScrollArea>
        <SheetFooter>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex gap-2">
              <Button
                variant={"secondary"}
                className="w-full shrink h-fit !py-3"
              >
                <HeartIcon /> Wishlist (0)
              </Button>
              <Button variant={"outline"} className="w-full shrink h-fit !py-3">
                <ShoppingBagIcon /> My Bag (0)
              </Button>
            </div>
            {
              <HeaderAccountSection
                loggedInChild={
                  <Button
                    variant={"outline"}
                    className="w-full shrink h-fit !py-3"
                  >
                    <UserCircleIcon /> Account
                  </Button>
                }
                notLoggedInChild={
                  <Button
                    variant={"outline"}
                    className="w-full shrink h-fit !py-3"
                  >
                    <LogInIcon /> Login
                  </Button>
                }
              />
            }
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

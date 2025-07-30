import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

type Props = {
  navigationList?: string[];
};

export default function MobileHeaderNav({}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="!bg-transparent !size-10 !p-0">
          <MenuIcon
            strokeWidth={0.5}
            className="size-full scale-110 text-foreground"
          />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

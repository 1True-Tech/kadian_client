import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
    MailIcon,
    MessageSquareIcon,
    PhoneCallIcon,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import HeaderAccountSection from "./headerAccountSection";

export default function HeaderTopSection() {
  return (
    <div className="w-full h-10 bg-background flex items-center justify-between px-4 sm:px-8">
      {/* language */}
      <ul className="w-fit flex items-center gap-3 border-transparent border-b-1 active:border-foreground hover:border-foreground">
        <li className="size-5 overflow-hidden rounded-full flex items-center justify-center">
          <ReactCountryFlag
            className="object-cover object-center !size-full"
            countryCode="JM"
            svg
          />
        </li>
        <li className="px-3 border-x-1 border-accent">EN</li>
        <li>JM</li>
      </ul>
      <div className="w-fit flex items-center gap-2">
        {/* contact */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex items-center gap-2 data-[state=open]:[--rotate:180deg] data-[state=closed]:[--rotate:0deg]">
              Need help?{" "}
              <ChevronDown className="rotate-[var(--rotate)] duration-300" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-70">
            <DropdownMenuLabel>Contact us</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between gap-2">
              <span className="w-fit flex items-center gap-2 shrink-0">
                <PhoneCallIcon />
                Phone:&nbsp;
              </span>
              <a
                href="tel:+1(234)-567-8910"
                className="font-semibold truncate overflow-hidden text-ellipsis"
              >
                +1(234)-567-8910
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between gap-2">
              <span className="w-fit flex items-center gap-2 shrink-0">
                <MessageSquareIcon />
                Chat:&nbsp;
              </span>
              <a
                href="http://wa.me/1234"
                className="font-semibold truncate overflow-hidden text-ellipsis"
              >
                http://wa.me/1234
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between gap-2">
              <span className="w-fit flex items-center gap-2 shrink-0">
                <MailIcon />
                Email:&nbsp;
              </span>
              <a
                href="mailto:kadian@example.com"
                className="font-semibold truncate overflow-hidden text-ellipsis"
              >
                kadian@example.com
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* account */}
        <HeaderAccountSection />
      </div>
    </div>
  );
}

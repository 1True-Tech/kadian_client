import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InstagramIcon, SendHorizontalIcon } from "lucide-react";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="px-4 sm:px-8 py-8">
      <div className="max-w-7xl text-primary-foreground bg-primary dark:bg-secondary rounded-xl py-sections px-container mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Company Info */}
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-2xl font-bold">Kadian Fashion</h2>
          <p className="text-sm">
            Discover the latest trends in fashion. We bring you quality products
            to elevate your style and beauty.
          </p>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2 min-w-44">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        {/* Newsletter Signup */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="text-sm">
            Subscribe to get the latest updates and exclusive offers.
          </p>
          <form className="flex flex-wrap gap-2">
            <div className="flex flex-col min-[498px]:flex-row md:max-w-md min-h-fit p-small gap-small bg-primary-foreground dark:bg-secondary-foreground rounded-md header-nav-section-search w-full">
              <Input
                id="email"
                name="email"
                type="email"
                className="!w-full text-primary rounded-sm !shadow-none !outline-none !h-fit  !border border-accent !px-0 py-4 !pl-2"
              />
              <Button
                variant={"outline"}
                className="!bg-accent text-white !border-transparent !h-fit min-[498px]:!h-full rounded-sm"
              >
                Submit <SendHorizontalIcon />
              </Button>
            </div>
          </form>
        </div>
        {/* Socials */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <ul className="flex gap-4 text-2xl">
            <li>
              <a href="#">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="pi pi-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="pi pi-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="pi pi-whatsapp"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="pi pi-pinterest"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Footer Links */}
      <div className="mt-8 text-foreground pt-4 text-center text-xs flex flex-col-reverse min-[498px]:flex-row gap-small items-center justify-between">
        <p className="text-xs opacity-70">&copy; 2025 Elberyth. All rights reserved.</p>

        <p className="flex items-center justify-center gap-small">
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>{" "}
          |
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}

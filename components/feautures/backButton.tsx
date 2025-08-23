"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust path
import { cn } from "@/lib/utils";

export default function BackButton({
  text = "Back",
  defaultHref,
  className
}: {
  text?: string | null;
  defaultHref?: string;
  className?:string
}) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 2);
    }
  }, []);

  if (!canGoBack && !defaultHref) return null;

  return (
    <Button
      variant="link"
      onClick={() => {
        if (!canGoBack&&defaultHref) {
          router.push(defaultHref);
        } else {
          router.back();
        }
      }}
      aria-label="Go back to previous page"
      className={cn("inline-flex items-center gap-1 !px-0 w-fit",className)}
    >
      <ArrowLeft className="w-4 h-4" />
      {text && <span>{text}</span>}
    </Button>
  );
}

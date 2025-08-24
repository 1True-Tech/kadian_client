import { cn } from "@/lib/utils";
import { PortableTextComponents } from "next-sanity";

export const lBPtComponents: (
  generalClass: string
) => PortableTextComponents = (generalClass) => ({
  block: {
    // “normal” is the default style; you can add other styles (h1, h2…) here too
    normal: ({ children }) => (
      <p
        className={cn(
          generalClass,
          "line-clamp-2 sm:line-clamp-3 duration-300"
        )}
      >
        {children}
      </p>
    ),
  },
  marks: {
    // if you have inline marks (e.g. links, strong), style them here:
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-indigo-300 hover:underline"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
});

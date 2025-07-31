"use client";
import { HasSlot } from "@/types";
import { createContext, useCallback, useContext, useState } from "react";
import cookies from "../utils/cookies";

// helper to get system theme

const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // default to light if window is not available
};

type themes = "light" | "dark" | "system";
interface ThemeContext {
  theme: themes;
  setTheme: (theme: themes) => void;
  initiate: () => void;
}
const ThemeContext = createContext<ThemeContext>({
  theme: "light",
  setTheme() {},
  initiate() {},
});

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme)
    throw Error("must be within a ThemeProvider", {
      cause: "using use theme outside a ThemeProvider",
    });

  return theme;
};

const updateTheme = (theme: themes, cookieKey: string = "theme") => {
  cookies.set(cookieKey, theme);
  switch (theme) {
    case "dark":
      if (!document.querySelector("html")?.classList.contains("dark")) {
        document.querySelector("html")?.classList.add("dark");
      }
      break;
    case "light":
      document.querySelector("html")?.classList.remove("dark");
      break;
    case "system":
      updateTheme(getSystemTheme(), cookieKey);
      break;

    default:
      document.querySelector("html")?.classList.remove("dark");
      break;
  }
};
const ThemeProvider = ({
  children,
  cookieKey,
}: HasSlot & { cookieKey?: string }) => {
  const [theme, changeTheme] = useState<themes>("light");

  const setTheme = useCallback(
    (theme: themes) => {
      changeTheme(theme);
      updateTheme(theme, cookieKey);
    },
    [cookieKey]
  );
  const initiate = useCallback(() => {
    const initiated = getSystemTheme();
    updateTheme(initiated, cookieKey);
  }, [cookieKey]);

  return (
    <ThemeContext
      value={{
        theme,
        setTheme,
        initiate,
      }}
    >
      {children}
    </ThemeContext>
  );
};

export { ThemeProvider, useTheme };


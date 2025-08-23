import { useEffect, useState } from "react";

export function useDomLoaded() {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsDomLoaded(true);

    if (document.readyState === "complete") {
      setIsDomLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return isDomLoaded;
}

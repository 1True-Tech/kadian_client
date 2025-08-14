"use client";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  onSelect?: (selected: boolean) => void;
  select?: boolean;
};

export default function ShopColorPick({
  onSelect,
  select = false,
}: Props) {
  const [selection, setSelection] = useState(select);
  useEffect(() => {
    setSelection(select)
  }, [select])
  
  const handleToggle = useCallback(() => {
    setSelection(!selection);

    if (onSelect) onSelect(!selection);
  }, [selection]);

  return (
    <span
      className="size-full absolute inset-0 flex items-center justify-center"
      onClick={handleToggle}
    >
      <Check
        className={clsx("size-4 duration-300", {
          "opacity-0 scale-50": !selection,
          "opacity-100 scale-100": selection,
        })}
      />
    </span>
  );
}

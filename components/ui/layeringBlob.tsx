import { cn } from "@/lib/utils";
import React from "react";

export function LayeringBlobLarge({
  className,
  ...props
}: React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      id="visual"
      viewBox="0 0 900 800"
      width="900"
      height="800"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      preserveAspectRatio="xMidYMid slice"
      {...props}
      className={cn(className)}
    >
      <path
        d="M0 352L113 327L225 364L338 339L450 405L563 343L675 398L788 323L900 330L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z"
        fill="var(--accent)"
      ></path>
      <path
        d="M0 425L113 402L225 390L338 418L450 411L563 436L675 422L788 452L900 430L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z"
        fill="var(--accent-400)"
      ></path>
      <path
        d="M0 453L113 467L225 420L338 447L450 471L563 453L675 490L788 483L900 480L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z"
        fill="var(--accent-300)"
      ></path>
      <path
        d="M0 480L113 495L225 503L338 532L450 530L563 513L675 503L788 471L900 542L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z"
        fill="var(--accent-200)"
      ></path>
      <path
        d="M0 530L113 559L225 573L338 520L450 547L563 538L675 561L788 518L900 566L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z"
        fill="var(--accent-100)"
      ></path>
    </svg>
  );
}

export function LayeringBlobMobile({
  className,
  ...props
}: React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      id="visual"
      viewBox="0 0 540 960"
      width="540"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      preserveAspectRatio="xMidYMid slice"
      {...props}
      className={cn("min-h-[50px]",className)}
    >
      <path
        d="M0 564L68 523L135 583L203 543L270 648L338 550L405 637L473 518L540 529L540 961L473 961L405 961L338 961L270 961L203 961L135 961L68 961L0 961Z"
        fill="var(--accent)"
      ></path>
      <path
        d="M0 681L68 644L135 624L203 669L270 659L338 698L405 675L473 724L540 689L540 961L473 961L405 961L338 961L270 961L203 961L135 961L68 961L0 961Z"
        fill="var(--accent-400)"
      ></path>
      <path
        d="M0 726L68 747L135 672L203 716L270 755L338 725L405 785L473 774L540 768L540 961L473 961L405 961L338 961L270 961L203 961L135 961L68 961L0 961Z"
        fill="var(--accent-300)"
      ></path>
      <path
        d="M0 768L68 792L135 806L203 852L270 848L338 822L405 806L473 754L540 868L540 961L473 961L405 961L338 961L270 961L203 961L135 961L68 961L0 961Z"
        fill="var(--accent-200)"
      ></path>
      <path
        d="M0 849L68 895L135 917L203 833L270 876L338 861L405 898L473 830L540 906L540 961L473 961L405 961L338 961L270 961L203 961L135 961L68 961L0 961Z"
        fill="var(--accent-100)"
      ></path>
    </svg>
  );
}

export default function LayeringBlob() {
  const Comp = LayeringBlobLarge;
  return (
    <span className="size-full absolute inset-0 -z-1">
      <Comp className="size-full flex items-end" />
    </span>
  );
}

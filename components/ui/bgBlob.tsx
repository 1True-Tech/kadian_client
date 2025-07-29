"use client";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { cn } from "@/lib/utils";
import React from "react";


export function BgBlobLarge({
  className,
  ...props
}: React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      id="visual"
      viewBox="0 0 960 540"
      width="960"
      height="540"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      preserveAspectRatio="xMidYMid slice"
      {...props}
      className={cn(className)}
    >
      <rect
        x="0"
        y="0"
        width="960"
        height="540"
        fill="var(--background)"
      ></rect>
      <defs>
        <linearGradient id="grad1_0" x1="43.8%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="14.444444444444446%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
          <stop
            offset="85.55555555555554%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_0" x1="0%" y1="0%" x2="56.3%" y2="100%">
          <stop
            offset="14.444444444444446%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
          <stop
            offset="85.55555555555554%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
        </linearGradient>
      </defs>
      <g transform="translate(960, 0)">
        <path
          d="M0 351C-15.3 345.7 -30.5 340.4 -43.7 332.1C-56.9 323.9 -68 312.7 -84.1 313.9C-100.2 315.1 -121.4 328.7 -133.2 321.5C-144.9 314.3 -147.2 286.2 -160 277.1C-172.8 268 -196.1 277.9 -209.4 272.9C-222.7 268 -226.1 248.2 -236.9 236.9C-247.6 225.5 -265.8 222.6 -278.5 213.7C-291.2 204.8 -298.4 190 -303.1 175C-307.8 160 -310 144.8 -316 130.9C-322 116.9 -331.8 104.1 -335.2 89.8C-338.6 75.5 -335.5 59.6 -337.1 44.4C-338.7 29.2 -344.8 14.6 -351 0L0 0Z"
          fill="var(--accent)"
        ></path>
      </g>
      <g transform="translate(0, 540)">
        <path
          d="M0 -351C12 -321.5 23.9 -291.9 37.2 -282.6C50.5 -273.2 65 -284.1 75.3 -281.1C85.6 -278.1 91.8 -261.2 111.4 -268.8C131 -276.5 164 -308.7 175.5 -304C187 -299.2 176.9 -257.6 188.1 -245.1C199.3 -232.7 231.9 -249.4 241.8 -241.8C251.8 -234.2 239.1 -202.3 241.2 -185.1C243.3 -167.9 260.3 -165.4 276.3 -159.5C292.3 -153.6 307.3 -144.1 318.7 -132C330.2 -119.9 337.9 -105.2 333.2 -89.3C328.6 -73.4 311.4 -56.2 312.3 -41.1C313.2 -26 332.1 -13 351 0L0 0Z"
          fill="var(--accent)"
        ></path>
      </g>
    </svg>
  );
}

export function BgBlobMobile({
  className,
  ...props
}: React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      id="visual"
      viewBox="0 0 540 960"
      width="540"
      height="960"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      preserveAspectRatio="xMidYMid slice"
      {...props}
      className={cn(className)}
    >
      <rect
        x="0"
        y="0"
        width="540"
        height="960"
        fill="var(--background)"
      ></rect>
      <defs>
        <linearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="30%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
          <stop
            offset="70%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="30%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
          <stop
            offset="70%"
            stopColor="var(--background)"
            stopOpacity="1"
          ></stop>
        </linearGradient>
      </defs>
      <g transform="translate(540, 0)">
        <path
          d="M0 351C-13.6 331.3 -27.2 311.7 -39.7 301.4C-52.2 291.1 -63.6 290.2 -78.9 294.6C-94.3 299.1 -113.7 308.9 -124.8 301.2C-135.8 293.5 -138.4 268.3 -148.5 257.2C-158.6 246.1 -176 249.2 -185.7 242C-195.3 234.8 -197.2 217.3 -212.8 212.8C-228.5 208.3 -258.1 216.8 -276.9 212.5C-295.7 208.1 -303.7 191.1 -294.4 170C-285.1 148.9 -258.5 123.9 -270.7 112.1C-282.9 100.4 -334 101.8 -339 90.8C-344.1 79.9 -303.1 56.4 -297.4 39.2C-291.8 21.9 -321.4 11 -351 0L0 0Z"
          fill="var(--accent)"
        ></path>
      </g>
      <g transform="translate(0, 960)">
        <path
          d="M0 -351C10.4 -314.4 20.9 -277.8 37.1 -281.6C53.3 -285.3 75.2 -329.4 90.8 -339C106.5 -348.7 115.8 -324 130.5 -315C145.2 -306.1 165.2 -312.9 175 -303.1C184.8 -293.3 184.4 -266.8 197.2 -257C210.1 -247.3 236.2 -254.3 241.8 -241.8C247.5 -229.4 232.8 -197.5 236.4 -181.4C240.1 -165.3 262.1 -164.9 267.6 -154.5C273.1 -144.1 262 -123.8 268.8 -111.4C275.7 -98.9 300.6 -94.4 315.9 -84.6C331.1 -74.9 336.8 -59.9 341.1 -44.9C345.3 -29.9 348.2 -15 351 0L0 0Z"
          fill="var(--accent)"
        ></path>
      </g>
    </svg>
  );
}

export default function BgBlob() {
  const isMobile = useIsMobile(640);
  const Comp = isMobile ? BgBlobMobile : BgBlobLarge;
  return (
    <span className="size-full absolute inset-0 -z-1">
      <Comp className="size-full blur-3xl opacity-40"/>
    </span>
  );
}

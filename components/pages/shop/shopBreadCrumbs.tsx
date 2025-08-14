"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function ShopBreadCrumbs() {
  const { shop_items } = useParams<{ shop_items: [string, string] }>();
    const shopItems = shop_items||[]
  const [category, collection] = shopItems;
  return (
    <section className="w-full isolate relative bg-foreground/10 text-white overflow-hidden flex flex-col gap-5 py-peers px-container">
      <div className="w-full flex flex-col gap-2">
        <em className="text-base not-italic text-foreground/70">
          <Link href={"/shop"} className="link text-foreground">
            shop
          </Link>
          {category && collection ? (
            <Link href={`/shop/${category}`} className="link text-foreground">
              /{shop_items[0]}
            </Link>
          ) : (
            `/${category}`
          )}
          {collection && `/${collection}`}
        </em>
      </div>
    </section>
  );
}

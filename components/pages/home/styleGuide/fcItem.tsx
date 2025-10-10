import Link from "next/link";
import { HomeStyleGuideItem } from "./types";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { lBPtComponents } from "@/components/feautures/PortableText";

type Props = {
  item: HomeStyleGuideItem;
};

export default function FcItem({ item }: Props) {
  return (
    <Link
      href={`/style-guide/${item.slug}`}
      className="style-guide-item relative block w-full overflow-hidden rounded-md border-2 border-accent/50 shadow-sm transition-all"
    >
      {/* Image */}
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={500}
        height={700}
        quality={75}
        loading="lazy"
        className="item_bg aspect-square w-full object-cover object-top transition-transform duration-300"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end">
        <div className="w-full style-guide-item-content flex flex-col gap-3">
          <span className="text-xs text-white uppercase tracking-wider">
          {item.category}
        </span>
        <h3 className="text-lg font-semibold text-white leading-tight style-guide-item-title">
          {item.title}
        </h3>

        <div className="text-xs text-neutral-200 line-clamp-2 max-w-none">
          <PortableText
            value={item.description.slice(0, 1)}
            components={lBPtComponents("style-guide-item-content-sub-text")}
          />
        </div>
        </div>
      </div>
    </Link>
  );
}

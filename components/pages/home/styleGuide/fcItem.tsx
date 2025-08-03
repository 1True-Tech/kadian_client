import Link from "next/link";
import { HomeStyleGuideItem } from "./types";
import Image from "next/image";

type Props = {
  item: HomeStyleGuideItem;
};

export default function FcItem({ item }: Props) {
  return (
    <Link href={`/guides/style/${item.slug}`} className="w-fit rounded-sm overflow-hidden border border-accent">
      <Image src={item.image.src} alt={item.image.alt} width={500} height={500} quality={75} className="w-fit object-contain object-top" />
    </Link>
  );
}

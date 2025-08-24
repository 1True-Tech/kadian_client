import { lBPtComponents } from "@/components/feautures/PortableText";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LookBookItem } from "@/types/home";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = {
  data: LookBookItem;
  index:number;
};

export default function FtLookBookItem({ data,index }: Props) {
  return (
    <Card
      className="card-premium overflow-hidden group cursor-pointer hover-lift animate-fade-up"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <CardContent className="p-0 relative overflow-hidden">
        <div className="relative h-96">
          <Image
            width={720}
            height={480}
            src={data.previewImage.src}
            alt={data.previewImage.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-2xl font-light mb-2">{data.title}</h3>
            <div className="prose prose-invert max-w-none mb-2">
              <PortableText
                value={data.contentLines.slice(0, 1)}
                components={lBPtComponents("")}
              />
            </div>
            <Button
              variant="outline"
              className="btn-ghost-elegant bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              See LookBook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

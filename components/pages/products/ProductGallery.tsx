'use client';

import { Carousel, CarouselContent, CarouselIndicators, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProductImageReady } from '@/types/product';
import Image from 'next/image';

export default function ProductGallery({ images }: { images: ProductImageReady[] }) {

  return (
    <Carousel className="overflow-hidden relative product-gallery h-[60vh] *:data-[slot=carousel-content]:h-full" >
      <CarouselContent className="flex h-full">
        {images.map((img, i) => (
          <CarouselItem className="min-w-full product-gallery-items relative h-full !rounded-sm overflow-hidden" key={i}>
            <Image
              src={img.src}
              alt={img.alt || 'Product image'}
              fill
              className="object-cover product-gallery-items-image"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext/>
      <CarouselPrevious/>
      <CarouselIndicators className='absolute z-10 bottom-0 product-gallery-indicators opacity-0 duration-300 bg-gradient-to-b from-transparent via-transparent via-70% to-black/50 h-full w-full items-end px-container scroll-px-container' slotProps={{
        item:{
            className: "size-20 !rounded-sm cursor-pointer",
            getBackgroundImage(index) {
                const image = images[index]
                return `url('${image.src}')`
            },
            style:{
                backgroundSize: "cover",
            }
        }
      }} />
    </Carousel>
  );
}

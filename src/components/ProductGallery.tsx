"use client";

import { useState } from "react";
import { Image } from "@imagekit/next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ProductGallery({
  name,
  images
}: {
  name: string;
  images: string[];
}) {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.jpg");

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-foreground relative overflow-hidden border">
        {mainImage && (
          <Image 
            urlEndpoint="https://ik.imagekit.io/daiphucimex"
            src={mainImage}
            fill
            alt={name}
            className="object-cover"
          />
        )}
      </div>
      {images.length > 0 && (
        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((img, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4">
                  <div 
                    className={`aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity ${mainImage === img ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setMainImage(img)}
                  >
                    <Image 
                      urlEndpoint="https://ik.imagekit.io/daiphucimex"
                      src={img}
                      fill
                      alt={`${name} thumbnail ${i+1}`}
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
}

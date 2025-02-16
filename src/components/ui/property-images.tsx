"use client";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import NextJsImage from "./nextjs-image";

type PropertyImagesTypes = {
  images: Array<{
    id: number;
    url: string;
    type: number | null;
  }>;
};

export default function PropertyImages({ images }: PropertyImagesTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setActiveIndex] = useState(0);

  const [firstImage, ...otherImages] = images;

  const handleCLick = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {firstImage && (
        <button
          type="button"
          className="group relative h-72 overflow-hidden rounded-lg md:h-[36rem] lg:h-[37.5rem]"
          onClick={() => {
            handleCLick(0);
          }}
        >
          <Image
            className="object-cover"
            src={firstImage.url}
            alt=""
            sizes="(max-width: 1024px) 100vw, 50vw"
            fill
            priority
          />
          <div className="absolute inset-0 transition-all duration-200 group-hover:bg-slate-900/70" />
          <div className="invisible absolute end-0 start-0 top-1/2 -translate-y-1/2 text-center group-hover:visible">
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700">
              <CameraIcon width={18} />
            </div>
          </div>
        </button>
      )}
      <Carousel>
        <CarouselContent>
          {otherImages.map((image, index) => (
            <CarouselItem key={image.id} className="flex basis-1/4">
              <button
                type="button"
                className="group relative aspect-square flex-1 overflow-hidden rounded-lg"
                onClick={() => {
                  handleCLick(index + 1);
                }}
              >
                <Image
                  className="object-cover"
                  src={image.url}
                  alt=""
                  sizes="(max-width: 1024px) 25vw, 15vw"
                  fill
                  priority
                />
                <div className="absolute inset-0 transition-all duration-200 group-hover:bg-slate-900/70" />
                <div className="invisible absolute end-0 start-0 top-1/2 -translate-y-1/2 text-center group-hover:visible">
                  <div className="inline-flex size-10 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700">
                    <CameraIcon width={18} />
                  </div>
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-4">
          <CarouselPrevious className="static translate-y-0" variant="ghost" />
          <CarouselDots />
          <CarouselNext className="static translate-y-0" variant="ghost" />
        </div>
      </Carousel>

      <Lightbox
        open={isOpen}
        index={photoIndex}
        close={() => {
          setIsOpen(false);
        }}
        slides={images.map((image) => ({
          src: image.url,
        }))}
        render={{ slide: NextJsImage, thumbnail: NextJsImage }}
        plugins={[Thumbnails]}
      />
    </div>
  );
}

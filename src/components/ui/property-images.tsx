"use client";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";
import { CameraIcon } from "lucide-react";
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
    blurhash?: string | null;
  }>;
};

export default function PropertyImages({ images }: PropertyImagesTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
            className="object-center"
            src={firstImage.url}
            layout="fullWidth"
            height={600}
            width={900}
            alt=""
            priority
            background={
              firstImage.blurhash
                ? blurhashToCssGradientString(firstImage.blurhash)
                : ""
            }
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
                  src={image.url}
                  alt=""
                  priority
                  height={250}
                  width={250}
                  background={
                    image.blurhash
                      ? blurhashToCssGradientString(image.blurhash)
                      : ""
                  }
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
        index={activeIndex}
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

"use client";
import "react-18-image-lightbox/style.css";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-18-image-lightbox";

import { cn } from "@/lib/utils";

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

  const handleCLick = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {images.map((image, index) => (
        <button
          key={image.id}
          className={cn(
            "group relative h-72 overflow-hidden rounded-lg",
            index === 0
              ? "md:col-span-2 md:h-[36rem] lg:row-span-2 lg:h-[37.5rem]"
              : "",
          )}
          onClick={() => {
            handleCLick(images.indexOf(image));
          }}
        >
          <Image
            className="object-cover"
            src={image.url}
            alt=""
            sizes={
              index === 0
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            fill
            priority
          />
          <div className="absolute inset-0 transition-all duration-200 group-hover:bg-slate-900/70" />
          <div className="invisible absolute end-0 start-0 top-1/2 -translate-y-1/2 text-center group-hover:visible">
            <div className="btn btn-icon lightbox rounded-full bg-green-600 text-white hover:bg-green-700">
              <CameraIcon width={18} />
            </div>
          </div>
        </button>
      ))}

      {isOpen ? (
        <Lightbox
          mainSrc={images.at(photoIndex)?.url ?? ""}
          nextSrc={images.at((photoIndex + 1) % images.length)?.url}
          prevSrc={
            images.at((photoIndex + images.length - 1) % images.length)?.url
          }
          onCloseRequest={() => {
            setIsOpen(false);
          }}
          onMovePrevRequest={() => {
            setActiveIndex((photoIndex + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setActiveIndex((photoIndex + 1) % images.length);
          }}
        />
      ) : null}
    </div>
  );
}

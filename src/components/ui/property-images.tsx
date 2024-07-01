"use client";
import "react-18-image-lightbox/style.css";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-18-image-lightbox";

import { Link } from "@/navigation";

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

  const mainImage = images.find((image) => image.type === 1);
  const otherImages = images.filter((image) => image.type !== 1);

  return (
    <div className="mt-4 md:flex">
      {mainImage ? (
        <div className="p-1 md:w-1/2 lg:w-1/2">
          <div className="group relative overflow-hidden rounded-lg">
            <Image
              src={mainImage.url}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              priority
            />
            <div className="absolute inset-0 duration-500 ease-in-out group-hover:bg-slate-900/70" />
            <div className="invisible absolute end-0 start-0 top-1/2 -translate-y-1/2 text-center group-hover:visible">
              <Link
                href="#"
                onClick={() => {
                  handleCLick(images.indexOf(mainImage));
                }}
                className="btn btn-icon lightbox rounded-full bg-green-600 text-white hover:bg-green-700"
              >
                <CameraIcon width={18} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="md:w-1/2 lg:w-1/2">
        <div className="flex flex-wrap">
          {otherImages.map((image) => (
            <div key={image.id} className="w-1/2 p-1">
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
                <div className="absolute inset-0 duration-500 ease-in-out group-hover:bg-slate-900/70" />
                <div className="invisible absolute end-0 start-0 top-1/2 -translate-y-1/2 text-center group-hover:visible">
                  <Link
                    href="#"
                    onClick={() => {
                      handleCLick(images.indexOf(image));
                    }}
                    className="btn btn-icon lightbox rounded-full bg-green-600 text-white hover:bg-green-700"
                  >
                    <CameraIcon width={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

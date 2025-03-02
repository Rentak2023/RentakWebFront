import { getImageProps } from "next/image";
import { useTranslations } from "next-intl";
import BackgroundPlayer from "next-video/background-player";

import Container from "@/components/ui/container";

import poster from "./header-poster.jpg";

export default function Header() {
  const t = useTranslations("landlord.header");
  const {
    props: { src: posterSrc },
  } = getImageProps({
    src: poster,
    blurDataURL: poster.blurDataURL,
    width: poster.width,
    height: poster.height,
    alt: "",
  });

  return (
    <div className="bg-linear-to-b from-primary-100/20 relative isolate overflow-hidden pt-24">
      <Container className="items-center justify-between pt-10 lg:flex lg:flex-row lg:gap-x-8">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-[44rem]">
            <h1 className="text-primary-800 sm:text-6xl/16 text-pretty text-4xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-slate-700">{t("subtitle")}</p>
          </div>
        </div>
        <div className="relative mx-auto mt-20 sm:mt-24 md:max-w-md lg:mx-0 lg:mt-0 lg:w-screen">
          <BackgroundPlayer
            src="https://3djfa6xdh712ppgh.public.blob.vercel-storage.com/videos/rentak-marks-AsOxLiSUWqokCBdvgga33ZuHu6Jxg3.mp4"
            poster={posterSrc}
            blurDataURL={poster.blurDataURL}
            className="overflow-hidden rounded-3xl"
            style={{ aspectRatio: "1/1" }}
            loop
          />
        </div>
      </Container>
    </div>
  );
}

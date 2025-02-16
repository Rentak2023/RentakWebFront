import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  type RenderSlideProps,
  type RenderThumbnailProps,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

type NextJsImageProps = (RenderSlideProps | RenderThumbnailProps) & {
  offset?: number;
};

export default function NextJsImage({ slide, offset, rect }: NextJsImageProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isImageSlide(slide)) return;

  return (
    <div
      className="relative"
      style={{ width: rect.width || "100%", height: rect.height || "100%" }}
    >
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        // placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((rect.width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}

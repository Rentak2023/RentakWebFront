import { getLocale } from "next-intl/server";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Unit from "@/components/unit";
import getLocaleDirection from "@/lib/utils";
import { getUnits } from "@/services/units";

async function UnitsSlider() {
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);
  const units = await getUnits({ locale });

  return (
    <Carousel
      opts={{
        direction,
      }}
    >
      <CarouselContent>
        {units.map((unit) => (
          <CarouselItem key={unit.id} className="md:basis-1/2 lg:basis-1/3">
            <Unit item={unit} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex items-center justify-center gap-4">
        <CarouselPrevious className="static translate-y-0" variant="ghost" />
        <CarouselDots />
        <CarouselNext className="static translate-y-0" variant="ghost" />
      </div>
    </Carousel>
  );
}
export default UnitsSlider;

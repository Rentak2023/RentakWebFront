import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";
import { Calendar } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { type UnitSchema } from "@/schemas/units";
import URLS from "@/shared/urls";

type UnitProps = {
  item: Pick<
    UnitSchema,
    | "id"
    | "picture"
    | "english_name"
    | "rooms"
    | "area"
    | "bathrom_numbers"
    | "price"
    | "is_inspection"
    | "property_name"
    | "property_type"
  >;
  blurhash?: string | null;
};

function Unit({ item, blurhash }: UnitProps) {
  const t = useTranslations("unit");
  const formatter = useFormatter();

  const gradient = blurhash ? blurhashToCssGradientString(blurhash) : "";

  const formatCurrency = (amount: number) => {
    return formatter
      .number(amount, "money")
      .replace(/^([A-Z]{3})\s*(.+)$/, "$2 $1");
  };

  const bedroom = item.rooms.find(
    (room: { room_name: string }) => room.room_name === "Bedroom",
  );
  const bathroom = item.rooms.find(
    (room: { room_name: string }) => room.room_name === "Bathroom",
  );

  return (
    <Card className="rounded-[2rem] border-slate-100 transition duration-300 hover:shadow-xl">
      <Link href={URLS.viewUnit(item)}>
        <div className="relative h-80 overflow-hidden rounded-t-[2rem]">
          <Image
            src={item.picture}
            className="object-cover"
            height={320}
            width={500}
            layout="fullWidth"
            alt=""
            background={gradient}
          />
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-sky-950 truncate text-lg font-bold">
              {item.property_name}
            </h2>

            <div className="flex items-baseline gap-1.5">
              <p className="text-sky-950 text-xl font-bold">
                {formatCurrency(item.price)}
              </p>
              <span className="text-slate-400 text-sm font-medium">
                / {t("month")}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sky-900/80">
              <Calendar className="size-5" />
              <span className="text-sm font-bold">
                {t("availableNow")}
              </span>
            </div>

            <div className="bg-slate-100 my-4 h-px w-full" />

            <div className="flex items-center justify-between gap-4 text-slate-500">
              <div className="flex items-center gap-1.5">
                <BedIcon className="size-5" />
                <span className="text-sm font-bold">
                  BR: {bedroom ? bedroom.num_of_rooms : 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <BathIcon className="size-5" />
                <span className="text-sm font-bold">
                  BA: {bathroom ? bathroom.num_of_rooms : 0}
                </span>
              </div>
              {!!item.area && (
                <div className="flex items-center gap-1.5">
                  <AreaIcon className="size-5" />
                  <span className="text-sm font-bold">
                    {item.area} m²
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default Unit;


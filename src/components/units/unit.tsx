import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";
import { Calendar, Sparkles } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
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
    | "available_from"
    | "AvailableFrom"
    | "location"
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

  const rawAvailableFrom = item.available_from ?? item.AvailableFrom;
  const availableDate = rawAvailableFrom ? new Date(rawAvailableFrom) : null;
  const isFuture = availableDate && !Number.isNaN(availableDate.getTime()) && availableDate > new Date();

  // Premium condition check (e.g. Sodic)
  const isPremium =
    item.property_name.toLowerCase().includes("sodic") ||
    item.property_name.includes("سوديك") ||
    (item.english_name &&
      (item.english_name.toLowerCase().includes("sodic") ||
        item.english_name.includes("سوديك")));

  return (
    <Card
      className={cn(
        "isolate h-full flex flex-col rounded-[2rem] transition duration-300 relative overflow-hidden group/card",
        isPremium
          ? "border-[#00a6ca]/60 bg-[#00a6ca]/[0.01] shadow-md shadow-[#00a6ca]/5 hover:shadow-[#00a6ca]/15 hover:border-[#00a6ca] hover:scale-[1.01]"
          : "border-slate-100 hover:shadow-xl",
      )}
    >
      <Link href={URLS.viewUnit(item)} className="flex flex-col flex-1">
        {/* Top curved brand colored line for premium cards */}
        {isPremium && (
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#00a6ca] to-[#00bada] z-20" />
        )}

        <div className="relative h-80 overflow-hidden rounded-t-[2rem]">
          {/* Brand/Sodic Tag */}
          {isPremium && (
            <span className="absolute top-4 start-4 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#00a6ca] to-[#00bada] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md border border-cyan-300/20">
              <Sparkles className="size-3 text-white" />
              {t("premium")}
            </span>
          )}
          <Image
            src={item.picture}
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            height={320}
            width={500}
            layout="fullWidth"
            alt=""
            background={gradient}
          />
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          {/* Top section — grows to fill space */}
          <div className="flex flex-col gap-1.5 flex-1">
            <h2
              className={cn(
                "line-clamp-2 text-lg font-bold leading-snug",
                isPremium ? "text-[#008ba9]" : "text-sky-950",
              )}
            >
              {item.property_name}
            </h2>

            {item.location.city_name && (
              <p className="text-slate-400 text-xs font-medium truncate">
                {item.location.city_name}
              </p>
            )}

            <div className="flex items-baseline gap-1.5 mt-1">
              <p className="text-sky-950 text-xl font-bold">
                {formatCurrency(item.price)}
              </p>
              <span className="text-slate-400 text-sm font-medium">
                / {t("month")}
              </span>
            </div>
          </div>

          {/* Bottom section — always pinned to bottom */}
          <div className="mt-4">
            <div
              className={cn(
                "mb-3 h-px w-full",
                isPremium ? "bg-[#00a6ca]/20" : "bg-slate-100",
              )}
            />

            <div className="flex items-center justify-between gap-4 text-slate-500">
              <div className="flex items-center gap-1.5">
                <BedIcon className="size-5" />
                <span className="text-sm font-bold">
                  Bedrooms: {bedroom ? bedroom.num_of_rooms : 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <BathIcon className="size-5" />
                <span className="text-sm font-bold">
                  Bathrooms: {bathroom ? bathroom.num_of_rooms : 0}
                </span>
              </div>
              {!!item.area && (
                <div className="flex items-center gap-1.5">
                  <AreaIcon className="size-5" />
                  <span className="text-sm font-bold">{item.area} m²</span>
                </div>
              )}
            </div>

            {isFuture ? (
              <div className="flex items-center gap-1.5 text-sky-900/70 mt-2">
                <Calendar className="size-3.5 shrink-0" />
                <span className="text-xs font-medium">
                  {t("availableFromDate", {
                    date: formatter.dateTime(availableDate, {
                      month: "short",
                      year: "numeric",
                    }),
                  })}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-sky-900/70 mt-2">
                <Calendar className="size-3.5 shrink-0" />
                <span className="text-xs font-medium">{t("availableNow")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default Unit;

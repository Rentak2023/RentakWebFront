import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LinkIcon from "@/app/[locale]/assets/svgs/link-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/navigation";
import { type Unit as TUnit } from "@/services/types";
import URLS from "@/shared/urls";

type UnitProps = {
  item: TUnit;
};

function Unit({ item }: UnitProps) {
  const t = useTranslations("unit");
  const formatter = useFormatter();

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
    <Card className="transition duration-300 hover:shadow-lg">
      <Link href={URLS.viewUnit(item)}>
        <div className="relative h-80">
          <Image
            src={item.picture}
            className="rounded-t-lg object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
          />

          <div className="absolute bottom-4 end-4 rounded-lg bg-white px-3 py-1.5">
            <p className="font-semibold text-slate-800">
              {formatCurrency(item.price)} /{" "}
              <span className="font-normal">{t("month")}</span>
            </p>
          </div>
        </div>

        <CardContent className="mt-6">
          <div className="flex flex-col">
            <h2 className="truncate text-base font-semibold">
              {item.property_name}
            </h2>
            {item.property_type.type_name ? (
              <p className="inline-block text-sm text-slate-500">
                {item.property_type.type_name}
              </p>
            ) : (
              <div className="h-5" />
            )}
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-900">
            <div className="flex items-center gap-1">
              <BedIcon className="size-4" />
              <span>
                {t("bedrooms", {
                  count: bedroom ? bedroom.num_of_rooms : 0,
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BathIcon className="size-4" />
              <span>
                {t("bathrooms", {
                  count: bathroom ? bathroom.num_of_rooms : 0,
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <AreaIcon className="size-4" />
              <span>{formatter.number(item.area)}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex list-none items-center justify-between">
            <span className="text-sm font-normal">{t("availableNow")}</span>

            <LinkIcon />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default Unit;

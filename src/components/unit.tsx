import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LinkIcon from "@/app/[locale]/assets/svgs/link-icon";
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
    <div className="group overflow-hidden rounded-xl bg-white shadow duration-300 ease-in-out hover:shadow-xl">
      <Link href={URLS.viewUnit(item)}>
        <div className="relative h-80">
          <Image
            src={item.picture}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
          />

          <div className="absolute bottom-4 end-4">
            <div className="btn rounded-full bg-white">
              <p className="font-semibold text-slate-800">
                {formatCurrency(item.price)} /{" "}
                <span className="font-normal">{t("month")}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-col">
          <Link
            href={URLS.viewUnit(item)}
            className="truncate text-base font-semibold duration-500 ease-in-out hover:text-primary-800"
          >
            {item.property_name}
          </Link>
          {item.property_type.type_name ? (
            <p className="inline-block text-sm text-slate-500">
              {item.property_type.type_name}
            </p>
          ) : (
            <div className="h-5" />
          )}
        </div>

        <ul className="mt-6 flex list-none items-center gap-4 border-b border-slate-200 py-6">
          <li className="flex items-center gap-1">
            <BedIcon />
            <span>
              {t("bedrooms", {
                count: bedroom ? bedroom.num_of_rooms : 0,
              })}
            </span>
          </li>

          <li className="flex items-center gap-1">
            <BathIcon />
            <span>
              {t("bathrooms", {
                count: bathroom ? bathroom.num_of_rooms : 0,
              })}
            </span>
          </li>
          <li className="flex items-center gap-1">
            <AreaIcon />
            <span>{formatter.number(item.area)}</span>
          </li>
        </ul>

        <Link
          href={URLS.viewUnit(item)}
          className="duration-300 ease-in-out hover:text-primary-800"
        >
          <ul className="flex list-none items-center justify-between pt-6">
            <li>
              <p className="text-sm font-normal">{t("availableNow")}</p>
            </li>

            <li>
              <LinkIcon />
            </li>
          </ul>
        </Link>
      </div>
    </div>
  );
}

export default Unit;

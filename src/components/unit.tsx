import Image from "next/image";
import { getTranslations } from "next-intl/server";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LinkIcon from "@/app/[locale]/assets/svgs/link-icon";
import { Link } from "@/navigation";
import { type Unit as TUnit } from "@/services/units";

type UnitProps = {
  item: TUnit;
};

async function Unit({ item }: UnitProps) {
  const t = await getTranslations("unit");

  const bedroom = item.rooms.find(
    (room: { room_name: string }) => room.room_name === "Bedroom",
  );
  const bathroom = item.rooms.find(
    (room: { room_name: string }) => room.room_name === "Bathroom",
  );

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow duration-300 ease-in-out hover:shadow-xl">
      <div className="relative h-80">
        <Image className="object-cover" src={item.picture} alt="" fill />

        <div className="absolute bottom-4 end-4">
          <div className="btn rounded-full bg-white">
            <p className="font-semibold text-slate-800">
              {item.price} {t("egp")} /{" "}
              <span className="font-normal">{t("month")}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col">
          <Link
            href={`/property-detail/${item.id}`}
            className="truncate text-base font-semibold duration-500 ease-in-out hover:text-primary-800"
          >
            {item.property_name}
          </Link>
          {item.property_type.type_name ? (
            <p className="inline-block text-sm text-gray-500">
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
              {bedroom ? bedroom.num_of_rooms : 0} {t("beds")}
            </span>
          </li>

          <li className="flex items-center gap-1">
            <BathIcon />
            <span>
              {bathroom ? bathroom.num_of_rooms : 0} {t("baths")}
            </span>
          </li>
          <li className="flex items-center gap-1">
            <AreaIcon />
            <span>{item.area}</span>
          </li>
        </ul>

        <Link
          href={`/property-detail/${item.id}`}
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

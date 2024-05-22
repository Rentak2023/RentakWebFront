import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LinkIcon from "@/app/[locale]/assets/svgs/link-icon";
import { type Unit as TUnit } from "@/services/units";

type UnitProps = {
  item: TUnit;
};

const Unit = ({ item }: UnitProps) => {
  const t = useTranslations("unit");

  const bedroom = item.rooms.find(
    (room: { room_name: string }) => room.room_name === "Bedroom",
  );
  const bathroom = item.rooms.find(
    (room: { room_name: string }) => room.room_name === "Bathroom",
  );

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow duration-500 ease-in-out hover:shadow-xl">
      <div className="relative h-80">
        <Image className="object-cover" src={item.picture} alt="" fill />

        <div className="absolute bottom-4 end-4">
          <div className="btn rounded-full bg-white shadow hover:text-primary-600 focus:text-primary-600">
            <p className="text=[#181A20] font-semibold">
              {item.price} {t("egp")} /{" "}
              <span className="font-normal">{t("month")}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col pb-6">
          <Link
            href={`/property-detail/${item.id}`}
            className="truncate text-base font-semibold duration-500 ease-in-out hover:text-primary-800"
          >
            {item.property_name}
          </Link>
          {item.property_type.type_name ? (
            <p className="text=[#717171] inline-block text-sm">
              {item.property_type.type_name}
            </p>
          ) : (
            <p className="h-[20px]" />
          )}
        </div>

        <ul className="flex list-none items-center border-b border-[#DDDDDD] py-6">
          <li className="me-4 flex items-center gap-1">
            <BedIcon />
            <span>
              {bedroom == undefined ? 0 : bedroom.num_of_rooms} {t("beds")}
            </span>
          </li>

          <li className="me-4 flex items-center gap-1">
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
          className="duration-500 ease-in-out hover:text-primary-800"
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
};

export default Unit;

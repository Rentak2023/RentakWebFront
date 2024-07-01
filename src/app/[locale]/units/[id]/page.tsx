import { HeartIcon } from "lucide-react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import AvailableIcon from "@/app/[locale]/assets/svgs/available-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LocationIcon from "@/app/[locale]/assets/svgs/location-icon";
import StatusIcon from "@/app/[locale]/assets/svgs/status-icon";
import TypeIcon from "@/app/[locale]/assets/svgs/type-icon";
import { Button } from "@/components/ui/button";
import PropertyImages from "@/components/ui/property-images";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/navigation";
import { getProperty } from "@/services/properties";

export default async function UnitPage({
  params: { locale, id },
}: Readonly<{
  params: { locale: string; id: string };
}>) {
  unstable_setRequestLocale(locale);
  const property = await getProperty(id, locale);
  const t = await getTranslations("units");

  return (
    <main className="min-h-screen">
      <section className="relative mt-20 pb-16 md:pb-24">
        <div className="container mx-auto">
          <PropertyImages images={property.gallary} />
          <div className="mt-4 flex flex-row items-center gap-1 px-3">
            <StatusIcon />
            <p className="font-regular text-xl text-primary-950">
              {t("availableForRent")}
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-16 md:mt-24">
          <div className="md:flex">
            <div className="px-3 md:w-1/2 md:p-4 lg:w-2/3">
              <div className="flex flex-row items-center gap-1">
                <h3 className="text-3xl font-semibold text-slate-800">
                  {t("propertyDescription")}
                </h3>
              </div>

              <ul className="flex list-none items-center py-6">
                <li className="me-4 flex items-center gap-1 lg:me-6">
                  <span className="text-xl font-medium text-primary-900 lg:text-3xl">
                    {property.price} EGP
                  </span>
                </li>
                <li className="me-4 flex items-center gap-1 lg:me-6">
                  <AreaIcon size={40} color="#0066CC" />
                  <span className="text-xl lg:text-2xl">{property.area}</span>
                </li>

                <li className="me-4 flex items-center gap-1 lg:me-6">
                  <BedIcon size={40} color="#0066CC" />
                  <span className="text-xl lg:text-2xl">
                    {property.room_numbers} Beds
                  </span>
                </li>

                <li className="flex items-center gap-1">
                  <BathIcon size={40} color="#0066CC" />
                  <span className="text-xl lg:text-2xl">
                    {property.bathrom_numbers} Baths
                  </span>
                </li>
              </ul>

              <h4 className="text-2xl font-medium">{property.property_name}</h4>

              <p className="mt-3 flex items-center gap-1 text-slate-500">
                <LocationIcon color="currentColor" />
                <span className="text-xl lg:text-2xl">
                  {property.location.address_in_detail}
                </span>
              </p>
              <p className="mt-4 text-slate-500">
                {property.property_description}
              </p>
            </div>

            <div className="mt-8 px-3 md:mt-0 md:w-1/2 md:p-4 lg:w-1/2">
              <div className="sticky top-20 rounded-lg bg-slate-100/80 shadow">
                <div className="p-6">
                  <h5 className="text-xl font-semibold lg:text-4xl">
                    {property.price}
                  </h5>
                  <p className="font-regular mt-3 flex items-center gap-1 text-base text-slate-500">
                    <LocationIcon color="currentColor" />
                    <span>{property.location.address_in_detail}</span>
                  </p>

                  <ul className="mt-4 list-none">
                    <li className="flex items-center justify-between py-3">
                      {property.finish_type.type_name ? (
                        <div className="flex w-1/2 items-center gap-2">
                          <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                            <TypeIcon />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-base font-medium text-primary-900">
                              {t("propertyType")}
                            </p>
                            <p className="font-regular text-base text-primary-900">
                              {property.finish_type.type_name}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      <div className="flex w-1/2 items-center gap-2">
                        <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                          <AreaIcon size={21} />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primary-900">
                            {t("m2")}
                          </p>
                          <p className="font-regular text-base text-primary-900">
                            {property.area}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="flex items-center justify-between py-3">
                      <div className="flex w-1/2 items-center gap-2">
                        <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                          <BedIcon size={21} />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primary-900">
                            {t("rooms")}
                          </p>
                          <p className="font-regular text-base text-primary-900">
                            {property.room_numbers}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-1/2 items-center gap-2">
                        <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                          <BathIcon size={21} />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primary-900">
                            {t("toilets")}
                          </p>
                          <p className="font-regular text-base text-primary-900">
                            {property.bathrom_numbers}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="flex items-center justify-between py-3">
                      <div className="flex w-1/2 items-center gap-2">
                        <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                          <HeartIcon />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primary-900">
                            {t("sponsored")}
                          </p>
                          <p className="font-regular text-base text-primary-900">
                            {property.location.governorate_name}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-1/2 items-center gap-2">
                        <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                          <AvailableIcon />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primary-900">
                            {t("status")}
                          </p>
                          <p className="font-regular text-base text-[#156F0D]">
                            {t("availableNow")}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <Separator className="my-4" />

                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href="#">{t("requestATour")}</Link>
                    </Button>
                    <Button className="flex-1" variant="outline" asChild>
                      <Link href="#">{t("contactUs")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

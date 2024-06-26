import { HeartIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import AvailableIcon from "@/app/[locale]/assets/svgs/available-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LocationIcon from "@/app/[locale]/assets/svgs/location-icon";
import SeparatorIcon from "@/app/[locale]/assets/svgs/separator";
import StatusIcon from "@/app/[locale]/assets/svgs/status-icon";
import TypeIcon from "@/app/[locale]/assets/svgs/type-icon";
import { Link } from "@/navigation";
import { getProperty } from "@/services/properties";

import PropertyImages from "../ui/property-images";

// Function to fetch property data
async function fetchProperty(propertyId: string, locale: string) {
  const response = await getProperty(propertyId, locale);

  return response;
}

type PropertyProps = {
  params: {
    locale: string;
    id: string;
  };
};

const Property = async ({ params }: PropertyProps) => {
  const { locale, id } = params;
  const property = await fetchProperty(id, locale);
  const t = await getTranslations("units");

  return (
    <section className="relative mt-20 pb-16 md:pb-24">
      <div className="container-fluid">
        <PropertyImages images={property.gallary} />
        <div className="mt-4 flex flex-row items-center gap-1 px-3">
          <StatusIcon />
          <p className="font-regular text-xl text-primary-950">
            {t("availableForRent")}
          </p>
        </div>
      </div>

      <div className="container mt-16 md:mt-24">
        <div className="md:flex">
          <div className="px-3 md:w-1/2 md:p-4 lg:w-2/3">
            <div className="flex flex-row items-center gap-1">
              <h3 className="text-3xl font-bold text-primary-950">
                {t("propertyDescription")}
              </h3>
            </div>

            <ul className="flex list-none items-center py-6">
              <li className="me-4 flex items-center gap-1 lg:me-6">
                <span className="text-xl font-semibold text-primary-900 lg:text-3xl">
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

            <p className="mt-3 flex items-center gap-1 text-[#94A3B8]">
              <LocationIcon color="#94A3B8" />
              <span className="text-xl lg:text-2xl">
                {property.location.address_in_detail}
              </span>
            </p>
            <p className="mt-4 text-[#94A3B8]">
              {property.property_description}
            </p>
          </div>

          <div className="mt-8 px-3 md:mt-0 md:w-1/2 md:p-4 lg:w-1/2">
            <div className="sticky top-20 bg-[#F8FAFC]">
              <div className="rounded-lg shadow">
                <div className="p-6">
                  <h5 className="text-xl font-semibold lg:text-4xl">
                    {property.price}
                  </h5>
                  <p className="font-regular mt-3 flex items-center gap-1 text-base text-[#94A3B8]">
                    <LocationIcon color="#94A3B8" />
                    <span>{property.location.address_in_detail}</span>
                  </p>

                  <ul className="mt-4 list-none">
                    <li className="flex items-center justify-between py-3">
                      {property.finish_type.type_name ? (
                        <div className="flex w-1/2 items-center gap-2">
                          <div className="item-center flex justify-items-center rounded-lg border border-[#DDDDDD] p-3">
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
                        <div className="item-center flex justify-items-center rounded-lg border border-[#DDDDDD] p-3">
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
                        <div className="item-center flex justify-items-center rounded-lg border border-[#DDDDDD] p-3">
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
                        <div className="item-center flex justify-items-center rounded-lg border border-[#DDDDDD] p-3">
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
                        <div className="item-center flex justify-items-center rounded-lg border border-[#DDDDDD] p-3">
                          <HeartIcon />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primary-900">
                            {t("sponsered")}
                          </p>
                          <p className="font-regular text-base text-primary-900">
                            {property.location.governorate_name}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-1/2 items-center gap-2">
                        <div className="item-center flex justify-items-center rounded-lg border border-[#DDDDDD] p-3">
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

                  <div className="py-4">
                    <SeparatorIcon />
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-1">
                      <Link
                        href="#"
                        className="btn w-full rounded-md border border-primary-600 bg-primary-600 text-white transition-all hover:bg-white hover:text-primary-600"
                      >
                        <p className="text-xl font-medium">
                          {t("requestATour")}
                        </p>
                      </Link>
                    </div>
                    <div className="w-1/2 p-1">
                      <Link
                        href="#"
                        className="btn w-full rounded-md border border-primary-600 text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
                      >
                        <p className="text-xl font-medium">{t("contactUs")}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Property;

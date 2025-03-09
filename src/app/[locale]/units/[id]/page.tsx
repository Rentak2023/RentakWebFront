import { HeartIcon } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Locale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Fragment } from "react";
import { type Accommodation, type WithContext } from "schema-dts";

import logo from "@/app/[locale]/assets/images/Logo.png";
import AreaIcon from "@/app/[locale]/assets/svgs/area-icon";
import AvailableIcon from "@/app/[locale]/assets/svgs/available-icon";
import BathIcon from "@/app/[locale]/assets/svgs/bath-icon";
import BedIcon from "@/app/[locale]/assets/svgs/bed-icon";
import LocationIcon from "@/app/[locale]/assets/svgs/location-icon";
import StatusIcon from "@/app/[locale]/assets/svgs/status-icon";
import TypeIcon from "@/app/[locale]/assets/svgs/type-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import PropertyImages from "@/components/ui/property-images";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { generateAlternatesLinks } from "@/lib/utils";
import {
  getAllProperties,
  getProperty,
  getPropertyInspectionDetails,
} from "@/services/properties";

import { ArrangeVisit } from "./arrange-visit";
import CustomersTestimonials from "./customers-testimonials";
import { Step1Icon, Step2Icon, Step3Icon } from "./icons";
import { PropertyInspection } from "./property-inspection";
import SimilarUnits from "./similar-units";

export const generateStaticParams = async () => {
  const properties = await getAllProperties();

  return properties.map((property) => ({
    id: property.id.toString(),
  }));
};

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale; id: string }>;
  }>,
): Promise<Metadata> {
  const params = await props.params;
  const { locale, id } = params;
  const t = await getTranslations("units");

  const property = await getProperty(id, locale);

  if (property == null) {
    notFound();
  }

  return {
    title: t("details-title", {
      cityName: property.location.city_name,
      title: property.property_name,
    }),
    description: property.meta_description ?? property.property_description,
    openGraph: {
      title: t("details-title", {
        cityName: property.location.city_name,
        title: property.property_name,
      }),
      description:
        property.meta_description ?? property.property_description ?? undefined,
    },
    alternates: generateAlternatesLinks(`/units/${id}`),
  };
}

export default async function UnitPage(
  props: Readonly<{
    params: Promise<{ locale: Locale; id: string }>;
  }>,
) {
  const params = await props.params;
  const { locale, id } = params;
  setRequestLocale(locale);

  const t = await getTranslations("units");
  const formatter = await getFormatter();

  const [property, inspection] = await Promise.all([
    getProperty(id, locale),
    getPropertyInspectionDetails(id),
  ]);

  if (property == null) {
    notFound();
  }

  const jsonLd: WithContext<Accommodation> = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: property.property_name,
    image: property.gallary.map((img) => img.url),
    description: property.property_description ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Egypt",
      addressLocality: property.location.city_name,
      addressRegion: property.location.governorate_name,
      streetAddress: property.location.address_in_detail,
    },
    numberOfBedrooms: property.room_numbers,
    numberOfBathroomsTotal: property.bathrom_numbers,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitText: "m2",
    },
  };

  const formatCurrency = (amount: number) => {
    return formatter
      .number(amount, "money")
      .replace(/^([A-Z]{3})\s*(.+)$/, "$2 $1");
  };

  const stats = [
    {
      title: t("propertyType"),
      value: property.finish_type.type_name,
      icon: <TypeIcon className="size-6" />,
    },
    {
      title: t("m2"),
      value: formatter.number(property.area),
      icon: <AreaIcon className="size-6" />,
    },
    {
      title: t("rooms"),
      value: formatter.number(property.room_numbers),
      icon: <BedIcon className="size-6" />,
    },
    {
      title: t("toilets"),
      value: formatter.number(property.bathrom_numbers),
      icon: <BathIcon className="size-6" />,
    },
    {
      title: t("sponsored"),
      value: property.location.governorate_name,
      icon: <HeartIcon className="size-6" />,
    },
    {
      title: t("status"),
      value: <span className="text-green-800">{t("availableNow")}</span>,
      icon: <AvailableIcon className="size-6" />,
    },
  ];

  return (
    <main className="min-h-dvh">
      <script
        type="application/ld+json"
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative mt-24 pb-16 md:pb-24">
        <Container>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/units">Properties</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Property Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid items-start gap-4 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <PropertyImages images={property.gallary} />

              <div className="flex flex-row items-center gap-1">
                <h3 className="text-3xl font-semibold text-slate-800">
                  {t("propertyDescription")}
                </h3>
              </div>

              <ul className="flex flex-wrap items-center gap-4 py-6">
                <li className="flex items-center gap-1 lg:me-6">
                  <span className="text-primary-900 text-xl font-medium lg:text-3xl">
                    {formatCurrency(property.price)}
                  </span>
                </li>
                <li className="flex items-center gap-1 lg:me-6">
                  <AreaIcon className="text-primary-600 size-10" />
                  <span className="text-xl lg:text-2xl">
                    {formatter.number(property.area)}
                  </span>
                </li>

                <li className="flex items-center gap-1 lg:me-6">
                  <BedIcon className="text-primary-600 size-10" />
                  <span className="text-xl lg:text-2xl">
                    {t("bedrooms", {
                      count: property.room_numbers,
                    })}
                  </span>
                </li>

                <li className="flex items-center gap-1">
                  <BathIcon className="text-primary-600 size-10" />
                  <span className="text-xl lg:text-2xl">
                    {t("bathrooms", {
                      count: property.bathrom_numbers,
                    })}
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
              {property.property_description && (
                <p className="mt-4 text-slate-600">
                  {property.property_description
                    .split("\n")
                    .map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
                </p>
              )}
              <div className="mt-6">
                <h3 className="text-3xl font-semibold text-slate-800">
                  Purchase a unit, in{" "}
                  <span className="text-green-800">Just 3 steps</span>
                </h3>
                <Steps />
              </div>
              <div className="mt-16">
                <div className="ms-2 flex items-center gap-2 text-sm text-slate-600">
                  <span>
                    <span className="sr-only">Rentak</span>

                    <Image
                      src={logo}
                      className="h-5 w-auto object-contain"
                      alt=""
                      height={20}
                    />
                  </span>
                  All Rentak units go through strict quality checks to ensure
                  their safety and excellent condition.
                </div>
                <PropertyInspection inspection={inspection} />
              </div>
            </div>
            <div className="sticky top-20 rounded-lg bg-slate-100/80 shadow-sm lg:col-span-2">
              <div className="p-6">
                <div className="flex flex-row items-center gap-1">
                  <StatusIcon />
                  <p className="font-regular text-primary-950 text-xl">
                    {t("availableForRent")}
                  </p>
                </div>
                <h5 className="mt-4 text-xl font-medium lg:text-4xl">
                  {formatCurrency(property.price)}
                </h5>
                <p className="font-regular mt-3 flex items-center gap-1 text-base text-slate-500">
                  <LocationIcon />
                  <span>{property.location.address_in_detail}</span>
                </p>

                <div className="text-primary-900 mt-6 grid grid-cols-2 gap-y-4">
                  {stats.map((stat) => (
                    <div key={stat.title} className="flex items-center gap-2">
                      <div className="item-center flex justify-items-center rounded-lg border border-slate-300 p-3">
                        {stat.icon}
                      </div>
                      <div>
                        <dt>{stat.title}</dt>
                        <dd className="font-medium">{stat.value}</dd>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col gap-2">
                  <ArrangeVisit unitId={property.id} />

                  <Button className="flex-1" variant="outline" asChild>
                    <Link href="https://rent-ak.com/Home/ContactUs">
                      {t("contactUs")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <SimilarUnits />
      <CustomersTestimonials />
    </main>
  );
}

function Steps() {
  const steps = [
    {
      title: "Choose... Book Online!",
      description: (
        <>
          Choose the car that suits you on our website and book an appointment
          to visit it in our showroom.{" "}
          <strong className="font-semibold">No Fees!</strong>
        </>
      ),
      Icon: Step1Icon,
    },
    {
      title: "View and Reserve",
      description: (
        <>
          View the unit in our showroom and book it for 10,000 EGP.{" "}
          <strong className="font-semibold">(fully refundable)</strong>
        </>
      ),
      Icon: Step2Icon,
    },
    {
      title: "Buy Your Property",
      description:
        "The unit will be reserved for you for 24 hours, during which you can decide to buy it or look at other units.",
      Icon: Step3Icon,
    },
  ];
  return (
    <div className="mt-4 flex flex-col gap-2 lg:flex-row">
      {steps.map((step) => (
        <div
          key={step.title}
          className="flex-1 rounded-md bg-slate-100 px-6 pb-12"
        >
          <step.Icon />
          <dt className="text-primary-900 text-xl font-semibold">
            {step.title}
          </dt>
          <dd className="text-primary-800 mt-2">{step.description}</dd>
        </div>
      ))}
    </div>
  );
}

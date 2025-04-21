import {
  BadgeCheckIcon,
  MoveRightIcon,
  ShieldCheckIcon,
  UserCheckIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, type SVGProps } from "react";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  cta: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  href: string;
};

export default function Services() {
  const t = useTranslations("landlord.services");

  const services: Array<Service> = [
    {
      title: t("finishing-financing.title"),
      description: t("finishing-financing.description"),
      cta: t("finishing-financing.cta"),
      Icon: ShieldCheckIcon,
      href: "/property-valuation",
    },
    {
      title: t("maintenance-financing.title"),
      description: t("maintenance-financing.description"),
      cta: t("maintenance-financing.cta"),
      Icon: UserCheckIcon,
      href: "/maintenance-payment",
    },
    {
      title: t("contract-creation.title"),
      description: t("contract-creation.description"),
      cta: t("contract-creation.cta"),
      Icon: BadgeCheckIcon,
      href: "/contract",
    },
  ];
  return (
    <Container className="mt-24 xl:max-w-7xl">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-capitalized text-primary-800 w-16 text-3xl font-semibold tracking-tight sm:text-6xl">
          {t("title")}
        </h2>
      </div>
      <div className="mx-auto mt-8 sm:mt-12 lg:-mt-28">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-primary-600/10 relative flex items-center gap-12 rounded-3xl py-8 pe-8 ps-24 odd:ms-auto even:me-auto"
            >
              <div
                className={cn(
                  "absolute -start-16 flex size-32 shrink-0 items-center justify-center rounded-full p-[3px]",
                  "bg-linear-to-b from-[#3BF686] to-[#4CA9FF]",
                )}
              >
                <div className="bg-primary-800 flex size-full items-center justify-center rounded-full p-2">
                  <service.Icon
                    className="size-12 text-slate-50"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="max-w-xl lg:max-w-lg xl:max-w-xl">
                <dt className="text-primary-900 text-2xl font-semibold">
                  {service.title}
                </dt>
                <div className="mt-1 flex flex-col items-start gap-4">
                  <dd className="text-primary-800 text-lg/7">
                    {service.description}
                  </dd>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary-900 text-primary-900 hover:bg-primary-600/5 rounded-full bg-transparent"
                  >
                    <a href={service.href} className="inline-flex items-center">
                      {service.cta}
                      <MoveRightIcon
                        className="ms-2 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  );
}

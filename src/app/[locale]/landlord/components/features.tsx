import { BadgeCheckIcon, ShieldCheckIcon, UserCheckIcon } from "lucide-react";
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

const Features = () => {
  const t = useTranslations("landlord.services");

  const features: Array<Service> = [
    {
      title: t("property-valuation.title"),
      description: t("property-valuation.description"),
      cta: t("property-valuation.cta"),
      Icon: ShieldCheckIcon,
      href: "/property-valuation",
    },
    {
      title: t("legal-contract.title"),
      description: t("legal-contract.description"),
      cta: t("legal-contract.cta"),
      Icon: BadgeCheckIcon,
      href: "/contract",
    },
    {
      title: t("maintenance-payment.title"),
      description: t("maintenance-payment.description"),
      cta: t("maintenance-payment.cta"),
      Icon: UserCheckIcon,
      href: "/maintenance-payment",
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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-12 rounded-3xl bg-slate-50 p-4 odd:ms-auto even:me-auto"
            >
              <div
                className={cn(
                  "flex size-32 shrink-0 items-center justify-center rounded-full p-[3px]",
                  "bg-linear-to-b from-[#3BF686] to-[#4CA9FF]",
                )}
              >
                <div className="bg-primary-800 flex size-full items-center justify-center rounded-full p-2">
                  <feature.Icon
                    className="size-12 text-slate-50"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="max-w-xl lg:max-w-lg xl:max-w-xl">
                <dt className="text-primary-900 text-2xl font-semibold">
                  {feature.title}
                </dt>
                <div className="mt-1 flex flex-col items-start gap-4">
                  <dd className="text-primary-800 text-lg/7">
                    {feature.description}
                  </dd>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary-900 text-primary-900 rounded-full"
                  >
                    <a href={feature.href}>
                      {feature.cta}
                      <span className="ms-2" aria-hidden="true">
                        →
                      </span>
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
};

export default Features;

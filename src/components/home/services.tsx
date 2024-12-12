import { BriefcaseIcon, HomeIcon, KeyIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";

import { Button } from "../ui/button";
import SectionTitle from "./components/section-title";

type Service = {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  cta: string;
  href: string;
};

export async function Services() {
  const t = await getTranslations("home.our-services");

  const services: Array<Service> = [
    {
      title: t("rent-management.title"),
      description: t("rent-management.description"),
      icon: HomeIcon,
      cta: t("rent-management.cta"),
      href: "/rent-management",
    },
    {
      title: t("rent-collection.title"),
      description: t("rent-collection.description"),
      icon: BriefcaseIcon,
      cta: t("rent-collection.cta"),
      href: "/rent-collection",
    },
    {
      title: t("rent-payment.title"),
      description: t("rent-payment.description"),
      icon: KeyIcon,
      cta: t("rent-payment.cta"),
      href: "/rent-payment",
    },
  ];

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-stretch px-6 md:px-8 xl:max-w-7xl">
        <SectionTitle text={t("title")} />

        <div className="mt-12 flex w-full flex-col items-center justify-between gap-6 md:flex-row">
          {services.map((service) => (
            <Service key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Service({ title, description, icon: Icon, cta, href }: Service) {
  return (
    <div className="flex max-w-96 flex-col items-center justify-center gap-4">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary-600/5">
        <Icon className="size-8 text-primary-800" />
      </div>
      <h3 className="text-center text-xl font-medium text-slate-900">
        {title}
      </h3>
      <p className="text-balance text-center text-base text-slate-600">
        {description}
      </p>
      <Button className="mt-4" asChild>
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  );
}

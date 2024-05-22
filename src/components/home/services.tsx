import { BriefcaseIcon, HomeIcon, KeyIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import SectionTitle from "./components/section-title";

type Service = {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export function Services() {
  const t = useTranslations("home.our-services");

  const services: Array<Service> = [
    {
      title: t("rent-management.title"),
      description: t("rent-management.description"),
      icon: HomeIcon,
    },
    {
      title: t("rent-collection.title"),
      description: t("rent-collection.description"),
      icon: BriefcaseIcon,
    },
    {
      title: t("rent-payment.title"),
      description: t("rent-payment.description"),
      icon: KeyIcon,
    },
  ];

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-stretch px-6 md:px-8">
        <SectionTitle text={t("title")} />

        <p className="mt-5 max-w-2xl text-center text-lg text-slate-600">
          {t("subtitle")}
        </p>
        <div className="mt-12 flex w-full flex-col items-center justify-between gap-6 md:flex-row">
          {services.map((service) => (
            <Service key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Service({ title, description, icon: Icon }: Service) {
  return (
    <div className="flex max-w-72 flex-col items-center justify-center gap-4">
      <div className="hexagon flex h-28 w-24 items-center justify-center bg-primary/5">
        <Icon className="size-8 text-primary-shade-3" />
      </div>
      <h3 className="text-center text-xl font-medium text-slate-900">
        {title}
      </h3>
      <p className="text-center text-base text-slate-600">{description}</p>
    </div>
  );
}

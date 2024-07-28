import { BriefcaseIcon, HomeIcon, KeyIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/navigation";

import SectionTitle from "./components/section-title";

type TargetPerson = {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  href: string;
};

export async function People() {
  const t = await getTranslations("home.people");

  const services: Array<TargetPerson> = [
    {
      title: t("landlords.title"),
      description: t("landlords.description"),
      icon: HomeIcon,
      href: "/maintenance-payment",
    },
    {
      title: t("tenants.title"),
      description: t("tenants.description"),
      icon: BriefcaseIcon,
      href: "/rent-collection",
    },
    {
      title: t("brokers.title"),
      description: t("brokers.description"),
      icon: KeyIcon,
      href: "/rent-payment",
    },
  ];

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-stretch px-6 md:px-8 xl:max-w-7xl">
        <SectionTitle text={t("title")} />

        <hr className="mt-8 h-0.5 w-14 bg-slate-800" />

        <p className="mx-auto mt-8 max-w-6xl text-balance text-center text-lg text-slate-500">
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

function Service({ title, description, icon: Icon }: TargetPerson) {
  return (
    <div className="flex max-w-96 flex-col items-center justify-center gap-4">
      <div className="hexagon flex h-28 w-24 items-center justify-center bg-primary-600/5">
        <Icon className="size-8 text-primary-800" />
      </div>
      <h3 className="text-center text-xl font-medium text-slate-900">
        {title}
      </h3>
      <p className="text-balance text-center text-base text-slate-600">
        {description}
      </p>
    </div>
  );
}

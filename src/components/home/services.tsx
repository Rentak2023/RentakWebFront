import { BriefcaseIcon, HomeIcon, KeyIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";

import { Button } from "../ui/button";
import Container from "../ui/container";
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
    <Container className="flex flex-col items-center justify-stretch pt-24 sm:pt-32">
      <SectionTitle text={t("title")} />

      <div className="mt-12 flex w-full flex-col items-center justify-between gap-6 md:flex-row">
        {services.map((service) => (
          <Service key={service.title} {...service} />
        ))}
      </div>
    </Container>
  );
}

function Service({ title, description, icon: Icon, cta, href }: Service) {
  return (
    <div className="flex max-w-96 flex-col items-center justify-center gap-4">
      <div className="bg-primary-600/5 flex size-20 items-center justify-center rounded-full">
        <Icon className="text-primary-800 size-8" />
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

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import FormIcon from "@/app/[locale]/assets/svgs/form-icon.svg";
import RentIcon from "@/app/[locale]/assets/svgs/rent-icon.svg";
import SearchIcon from "@/app/[locale]/assets/svgs/search-icon.svg";
import { Link } from "@/navigation";

import SectionTitle from "./components/section-title";

type Service = {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Image>["src"];
  cta: string;
  href: string;
};

export async function Services() {
  const t = await getTranslations("home.our-services");

  const services: Array<Service> = [
    {
      title: t("rent-management.title"),
      description: t("rent-management.description"),
      icon: SearchIcon,
      cta: t("rent-management.cta"),
      href: "/maintenance-payment",
    },
    {
      title: t("rent-collection.title"),
      description: t("rent-collection.description"),
      icon: RentIcon,
      cta: t("rent-collection.cta"),
      href: "/rent-collection",
    },
    {
      title: t("rent-payment.title"),
      description: t("rent-payment.description"),
      icon: FormIcon,
      cta: t("rent-payment.cta"),
      href: "/rent-payment",
    },
  ];

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto flex flex-col items-center justify-stretch px-6 md:px-8 xl:max-w-7xl">
        <SectionTitle text={t("title")} />
        <hr className="mt-8 h-0.5 w-14 bg-slate-800" />

        <p className="mx-auto mt-8 max-w-6xl text-balance text-center text-lg text-slate-500">
          We provide to you the best choiches for you. Adjust it to your health
          needs and make sure your undergo treatment with our highly qualified
          doctors you can consult with us which type of service is suitable for
          your health
        </p>

        <div className="mt-12 flex w-full flex-col items-stretch justify-between gap-6 md:flex-row">
          {services.map((service) => (
            <Service key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Service({ title, description, icon, cta, href }: Service) {
  return (
    <div className="relative flex flex-col rounded-3xl p-4 pb-16 shadow-lg lg:p-8 lg:pb-20">
      <Image src={icon} alt="" className="h-20 object-contain" />
      <h3 className="mt-6 text-start text-2xl font-medium text-slate-900">
        {title}
      </h3>
      <p className="mt-6 text-start text-base font-light text-slate-500">
        {description}
      </p>
      <Link
        className="absolute bottom-8 right-8 ms-auto inline-flex items-center gap-2 font-medium text-primary-600"
        href={href}
      >
        {cta} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

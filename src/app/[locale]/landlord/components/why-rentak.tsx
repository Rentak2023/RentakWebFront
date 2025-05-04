import { BadgeCheck, Home, ShieldCheck, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import Container from "@/components/ui/container";

export default function WhyRentak() {
  const t = useTranslations("landlord.why-rentak");

  const reasons = [
    {
      title: t("features.guaranteed-rent.title"),
      description: t("features.guaranteed-rent.description"),
      Icon: ShieldCheck,
    },
    {
      title: t("features.verified-listings.title"),
      description: t("features.verified-listings.description"),
      Icon: BadgeCheck,
    },
    {
      title: t("features.tenant-screening.title"),
      description: t("features.tenant-screening.description"),
      Icon: UserCheck,
    },
    {
      title: t("features.property-inspection.title"),
      description: t("features.property-inspection.description"),
      Icon: Home,
    },
  ];

  return (
    <Container className="mt-16 rounded-2xl border border-slate-100 py-16">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-8 text-xl/8 text-slate-600">{t("subtitle")}</p>
      </div>
      <div className="m-16 mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid place-items-center gap-x-4 gap-y-16 md:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason.title} className="max-w-sm">
              <div className="flex h-full flex-col items-center text-center">
                <div className="flex items-center justify-center">
                  <div className="bg-primary-800 flex size-12 items-center justify-center rounded-full">
                    <reason.Icon
                      className="size-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <dt className="text-2xl/7 font-semibold text-slate-800">
                    {reason.title}
                  </dt>
                  <dd className="mt-4 text-pretty text-base/7 text-slate-600">
                    {reason.description}
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  );
}

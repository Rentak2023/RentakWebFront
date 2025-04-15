import {
  BadgeCheck,
  ClipboardCheck,
  Home,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

import Container from "@/components/ui/container";

export default function WhyRentak() {
  const t = useTranslations("landlord.why-rentak");

  const reasons = [
    {
      title: "Guaranteed Rent",
      description:
        "Get paid on time, every month, no matter what. Even if your tenant is late or the unit is vacant, you'll receive your rent—guaranteed.",
      Icon: ShieldCheck,
    },
    {
      title: "Verified Listings",
      description:
        "Stand out with a “Verified by Rentak” badge after inspection, ensuring tenants trust the authenticity and condition of your property.",
      Icon: BadgeCheck,
    },
    {
      title: "Tenant Screening",
      description:
        "We conduct comprehensive background and credit checks, so you only get reliable, pre-vetted tenants without the hassle.",
      Icon: UserCheck,
    },
    {
      title: "Property Inspections",
      description:
        "Regular inspections and detailed reports help keep your property in top condition while detecting potential issues early.",
      Icon: Home,
    },
    {
      title: "Tenant Screening ",
      description:
        "We conduct comprehensive background and credit checks, so you only get reliable, pre-vetted tenants without the hassle.",
      Icon: ClipboardCheck,
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
      <div className="m-16 mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="flex flex-wrap justify-center gap-x-4 gap-y-16">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="w-full max-w-sm sm:w-1/2 lg:w-1/3"
            >
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

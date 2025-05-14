import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import LeadForm from "@/app/[locale]/(services)/lead-form";
import { generateAlternatesLinks } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/brokerage-commission"),
    title: t("brokerage-commission.title"),
    description: t("brokerage-commission.description"),
    openGraph: {
      title: t("brokerage-commission.title"),
      description: t("brokerage-commission.description"),
    },
  };
}

export default function BrokerageCommission() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="brokerage-commission"
      title={t("brokerage-commission.title")}
      description={t("brokerage-commission.description")}
    />
  );
}

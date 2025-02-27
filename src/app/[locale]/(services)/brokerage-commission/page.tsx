import { type Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { generateAlternatesLinks } from "@/lib/utils";

import LeadForm from "../lead-form";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale: locale,
    namespace: "services",
  });

  return {
    alternates: generateAlternatesLinks("/brokerage-commission", locale),
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

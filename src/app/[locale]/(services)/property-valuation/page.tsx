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
    alternates: generateAlternatesLinks("/property-valuation", locale),
    title: t("property-valuation.title"),
    description: t("property-valuation.description"),
    openGraph: {
      title: t("property-valuation.title"),
      description: t("property-valuation.description"),
    },
  };
}

export default function PropertyValuation() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="property-valuation"
      title={t("property-valuation.title")}
      description={t("property-valuation.description")}
    />
  );
}

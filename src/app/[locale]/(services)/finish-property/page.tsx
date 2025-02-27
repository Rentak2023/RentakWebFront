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
    alternates: generateAlternatesLinks("/finish-property", locale),
    title: t("finish-property.title"),
    description: t("finish-property.description"),
    openGraph: {
      title: t("finish-property.title"),
      description: t("finish-property.description"),
    },
  };
}

export default function FinishProperty() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="property-finishing"
      title={t("finish-property.title")}
      description={t("finish-property.description")}
    />
  );
}

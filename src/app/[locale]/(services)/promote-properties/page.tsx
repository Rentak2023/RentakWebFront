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
    alternates: generateAlternatesLinks("/promote-", locale),
    title: t("promote-properties.title"),
    description: t("promote-properties.description"),
    openGraph: {
      title: t("promote-properties.title"),
      description: t("promote-properties.description"),
    },
  };
}

export default function PromoteProperties() {
  const t = useTranslations("services");

  return (
    <LeadForm
      serviceName="promote-properties"
      title={t("promote-properties.title")}
      description={t("promote-properties.description")}
    />
  );
}

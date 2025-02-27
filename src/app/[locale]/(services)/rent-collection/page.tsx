import { type Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Container from "@/components/ui/container";
import { generateAlternatesLinks } from "@/lib/utils";

import RentCollectionForm from "./rent-collection-form";

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
    alternates: generateAlternatesLinks("/rent-collection", locale),
    title: t("rent-collection.title"),
    description: t("rent-collection.description"),
    openGraph: {
      title: t("rent-collection.title"),
      description: t("rent-collection.description"),
    },
  };
}

export default function RentCollection() {
  const t = useTranslations("services");

  return (
    <main className="pt-32">
      <Container className="text-center">
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
          {t("rent-collection.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          {t("rent-collection.description")}
        </p>
      </Container>
      <RentCollectionForm />
    </main>
  );
}

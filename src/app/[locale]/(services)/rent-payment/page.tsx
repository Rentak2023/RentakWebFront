import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Container from "@/components/ui/container";
import { generateAlternatesLinks } from "@/lib/utils";

import RentPaymentForm from "./rent-payment-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");

  return {
    alternates: generateAlternatesLinks("/rent-payment"),
    title: t("rent-payment.title"),
    description: t("rent-payment.description"),
    openGraph: {
      title: t("rent-payment.title"),
      description: t("rent-payment.description"),
    },
  };
}

export default function RentPayment() {
  const t = useTranslations("services");

  return (
    <main className="pt-32">
      <Container className="text-center">
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
          {t("rent-payment.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          {t("rent-payment.description")}
        </p>
      </Container>
      <RentPaymentForm />
    </main>
  );
}

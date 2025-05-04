import { type Metadata } from "next";
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
  return (
    <main className="mt-24">
      <Container>
        <RentPaymentForm />
      </Container>
    </main>
  );
}

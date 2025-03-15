import { type Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Player from "next-video/player";

import Container from "@/components/ui/container";
import { generateAlternatesLinks } from "@/lib/utils";

import poster from "./poster.png";
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
  const steps = [
    {
      title: t("rent-payment.steps.select-unit.title"),
      description: t("rent-payment.steps.select-unit.description"),
    },
    {
      title: t("rent-payment.steps.agree-terms.title"),
      description: t("rent-payment.steps.agree-terms.description"),
    },
    {
      title: t("rent-payment.steps.bank-details.title"),
      description: t("rent-payment.steps.bank-details.description"),
    },
    {
      title: t("rent-payment.steps.rentak-handles.title"),
      description: t("rent-payment.steps.rentak-handles.description"),
    },
  ];

  return (
    <main className="mt-24">
      <Container className="text-primary-900 mx-auto flex flex-col items-center justify-between gap-4 rounded-lg bg-stone-100 py-16 lg:flex-row">
        <div className="flex flex-col items-start">
          <h1 className="max-w-lg text-balance text-5xl font-medium tracking-tight sm:text-6xl">
            {t("rent-payment.title")}
          </h1>
          <ol className="[counter-reset:item mt-8 flex max-w-2xl flex-col gap-4">
            {steps.map((step) => (
              <li
                className="before:bg-primary-600 flex items-baseline gap-4 [counter-increment:item] before:inline-flex before:size-6 before:shrink-0 before:items-center before:justify-center before:rounded-full before:text-sm before:text-white before:content-[counter(item)]"
                key={step.title}
              >
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-semibold">{step.title}</h4>
                  <p className="text-lg">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="max-w-xl 2xl:max-w-2xl">
          <Player src="https://3djfa6xdh712ppgh.public.blob.vercel-storage.com/videos/rent-payment-1z5pbOdUJXz60hyiUguXq9RtHIuSJK.webm">
            <Image
              slot="poster"
              src={poster}
              placeholder="blur"
              alt="How it works"
            />
          </Player>
        </div>
      </Container>
      <Container>
        <RentPaymentForm />
      </Container>
    </main>
  );
}

import { type Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Player from "next-video/player";

import forsaLogo from "@/app/[locale]/assets/images/logos/forsa.png";
import halanLogo from "@/app/[locale]/assets/images/logos/halan.png";
import mastercardLogo from "@/app/[locale]/assets/images/logos/mastercard.png";
import meezaLogo from "@/app/[locale]/assets/images/logos/Meeza.svg";
import souhoolaLogo from "@/app/[locale]/assets/images/logos/souhoola.png";
import valuLogo from "@/app/[locale]/assets/images/logos/valu.png";
import visaLogo from "@/app/[locale]/assets/images/logos/visa.png";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";
import { generateAlternatesLinks } from "@/lib/utils";

import poster from "./poster.png";

const partners = [
  {
    name: "valu",
    logo: valuLogo,
  },

  {
    name: "souhoola",
    logo: souhoolaLogo,
  },
  {
    name: "Forsa",
    logo: forsaLogo,
  },

  {
    name: "halan",
    logo: halanLogo,
  },
  {
    name: "mastercard",
    logo: mastercardLogo,
  },
  {
    name: "visa",
    logo: visaLogo,
  },

  {
    name: "Meeza",
    logo: meezaLogo,
  },
];

export function generateMetadata(): Metadata {
  return {
    alternates: generateAlternatesLinks("/vacay-now"),
    title: "Vacay Now, Pay Later!",
    description: "Pay in up to 60 months installments",
    openGraph: {
      title: "Vacay Now, Pay Later!",
      description: "Pay in up to 60 months installments",
    },
  };
}

export default function VacayNow() {
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
    <main>
      <header className="min-h-140 relative isolate flex">
        <Image
          className="absolute inset-0 -z-20 size-full object-cover"
          src={poster}
          alt=""
          fill
        />
        <div className="absolute inset-0 -z-10 bg-[#181A20]/60" />
        <Container className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-pretty text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Vacay Now, Pay Later!
          </h1>
          <p className="mt-6 text-lg/8 text-slate-300">
            Pay in up to 60 months installments
          </p>
          <Button
            size="xl"
            className="bg-primary-600 hover:bg-primary-600/90 mt-6"
            asChild
          >
            <Link href="/rent-payment">Vacay Now</Link>
          </Button>
        </Container>
      </header>
      <div>
        <Container className="mt-16 flex flex-col items-center">
          <h2 className="text-3xl text-slate-600">Trusted Payments</h2>
          <ul className="mt-12 flex gap-x-12 gap-y-8">
            <li className="hidden md:block"></li>
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="relative inline-flex aspect-video h-12 items-center justify-center"
              >
                <Image
                  className="size-full object-contain"
                  src={partner.logo}
                  alt={partner.name}
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <Container className="text-primary-900 mx-auto mt-16 flex flex-col items-center justify-between gap-4 rounded-lg bg-slate-100 py-16 lg:flex-row">
        <div className="flex flex-col items-start">
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
        <div className="max-w-sm">
          <Player src="https://3djfa6xdh712ppgh.public.blob.vercel-storage.com/videos/vacay-now-wIly0m3ERIALWWgax0V2e4vmjYTFXa.mp4" />
        </div>
      </Container>
    </main>
  );
}

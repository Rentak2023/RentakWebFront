import { PlayIcon } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
// eslint-disable-next-line no-restricted-imports
import Link from "next/link";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { generateAlternatesLinks } from "@/lib/utils";

import poster from "./poster.png";
import videoPreview from "./video-preview.png";

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
          placeholder="blur"
          alt=""
          fill
        />
        <div className="absolute inset-0 -z-10 bg-black/60" />
        <Container className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Vacay Now, Pay Later!
          </h1>
          <p className="mt-6 max-w-60 text-balance text-lg/8 text-slate-100 sm:text-3xl">
            Installment plan up to <strong className="font-semibold">60</strong>{" "}
            months
          </p>
          <Button
            size="xl"
            className="bg-primary-600 hover:bg-primary-600/90 mt-12"
            asChild
          >
            <Link href="/rent-payment">Pay Now</Link>
          </Button>
        </Container>
      </header>
      <div>
        <Container className="mt-8 flex flex-col items-center">
          <h2 className="text-lg text-slate-600">Trusted Payments</h2>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
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
      <Container className="text-primary-900 mx-auto mt-16 flex flex-col items-center justify-between gap-4 rounded-lg bg-slate-100 py-12 lg:flex-row">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-semibold sm:text-5xl">How it works</h2>
          <ol className="[counter-reset:item mt-8 flex max-w-2xl flex-col gap-4">
            {steps.map((step) => (
              <li
                className="before:bg-primary-800 flex items-baseline gap-4 [counter-increment:item] before:inline-flex before:size-6 before:shrink-0 before:items-center before:justify-center before:rounded-full before:text-sm before:text-white before:content-[counter(item)]"
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
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer rounded-lg shadow-lg">
              <Image
                src={videoPreview}
                alt="Video Preview"
                width={400}
                height={225}
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center rounded-full bg-slate-900/40 p-4">
                  <PlayIcon className="size-12 fill-white text-white" />
                </span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit p-1">
            <Player
              src="https://3djfa6xdh712ppgh.public.blob.vercel-storage.com/videos/vacay-now-wIly0m3ERIALWWgax0V2e4vmjYTFXa.mp4"
              autoPlay
              className="max-h-[calc(100dvh-6rem)]"
            />
          </DialogContent>
        </Dialog>
      </Container>
    </main>
  );
}

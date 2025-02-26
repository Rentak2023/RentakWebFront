import { type Metadata } from "next";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import Contact from "@/components/home/contact";
import { Header } from "@/components/home/header";
import { HowItWorks } from "@/components/home/how-it-works";
import { Partners } from "@/components/home/partners";
import { Plans } from "@/components/home/plans";
import { Services } from "@/components/home/services";
import Units from "@/components/home/units";
import { WhyUs } from "@/components/home/why-us";
import { generateAlternatesLinks } from "@/lib/utils";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    alternates: generateAlternatesLinks("/", locale),
  };
}

export default async function Home(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
) {
  const params = await props.params;

  const { locale } = params;

  setRequestLocale(locale);

  return (
    <main>
      <Header />
      <Services />
      <WhyUs />
      <Plans />
      <HowItWorks />
      <Units />
      <Partners />
      <Contact />
    </main>
  );
}

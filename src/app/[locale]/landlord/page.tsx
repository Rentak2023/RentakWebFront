import { type Metadata } from "next";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { generateAlternatesLinks } from "@/lib/utils";

import Features from "./components/features";
import Finishing from "./components/finishing";
import Header from "./components/header";
import Pricing from "./components/pricing";
import Steps from "./components/steps";
import Testimonials from "./components/testimonials";
import WhyRentak from "./components/why-rentak";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    alternates: generateAlternatesLinks("/landlord", locale),
  };
}

async function Landlord(
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
      <Features />
      <Pricing />
      <WhyRentak />
      <Steps />
      <Finishing />
      <Testimonials />
    </main>
  );
}

export default Landlord;

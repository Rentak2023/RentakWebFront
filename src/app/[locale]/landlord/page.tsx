import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { generateAlternatesLinks } from "@/lib/utils";

import Features from "./components/features";
import Finishing from "./components/finishing";
import Header from "./components/header";
import Pricing from "./components/pricing";
import Steps from "./components/steps";
import Testimonials from "./components/testimonials";
import WhyRentak from "./components/why-rentak";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landlord.meta");

  return {
    alternates: generateAlternatesLinks("/landlord"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

function Landlord() {
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

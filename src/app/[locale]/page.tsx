import { setRequestLocale } from "next-intl/server";

import Contact from "@/components/home/contact";
import { Header } from "@/components/home/header";
import { HowItWorks } from "@/components/home/how-it-works";
import { Partners } from "@/components/home/partners";
import { Plans } from "@/components/home/plans";
import { Services } from "@/components/home/services";
import Units from "@/components/home/units";
import { WhyUs } from "@/components/home/why-us";

export default async function Home(
  props: Readonly<{
    params: Promise<{ locale: string }>;
  }>,
) {
  const params = await props.params;

  const { locale } = params;

  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
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

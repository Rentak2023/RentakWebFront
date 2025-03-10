import { type Metadata } from "next";

import Contact from "@/components/home/contact";
import { Header } from "@/components/home/header";
import { HowItWorks } from "@/components/home/how-it-works";
import { Partners } from "@/components/home/partners";
import { Plans } from "@/components/home/plans";
import { Services } from "@/components/home/services";
import Units from "@/components/home/units";
import { WhyUs } from "@/components/home/why-us";
import { generateAlternatesLinks } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    alternates: generateAlternatesLinks("/"),
  };
}

export default function Home() {
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

import { unstable_setRequestLocale } from "next-intl/server";

import Contact from "@/components/home/contact";
import { Header } from "@/components/home/header";
import { HowItWorks } from "@/components/home/how-it-works";
import { People } from "@/components/home/people";
import { Plans } from "@/components/home/plans";
import { Services } from "@/components/home/services";
import Units from "@/components/home/units";
import { WhyUs } from "@/components/home/why-us";

export default function Home({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Header />
      <People />
      <Services />
      <WhyUs />
      <Plans />
      <HowItWorks />
      <Units />
      <Contact />
    </main>
  );
}

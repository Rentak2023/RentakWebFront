import { setRequestLocale } from "next-intl/server";

import Features from "./components/features";
import Finishing from "./components/finishing";
import Header from "./components/header";
import Pricing from "./components/pricing";
import Steps from "./components/steps";
import { Testimonials } from "./components/testimonials";
import WhyRentak from "./components/why-rentak";

function Landlord({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
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

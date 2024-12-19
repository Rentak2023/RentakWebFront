import { setRequestLocale } from "next-intl/server";

import Units from "@/components/home/units";

import BlogPosts from "./components/blog-posts";
import Header from "./components/header";
import PayRent from "./components/pay-rent";
import PropertyRequest from "./components/property-request";
import Steps from "./components/steps";
import Testimonials from "./components/testimonials";

async function Tenant(
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
      <Units />
      <PropertyRequest />
      <PayRent />
      <Steps />
      <Testimonials />
      <BlogPosts />
    </main>
  );
}

export default Tenant;

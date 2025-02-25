import { type Metadata } from "next";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import Units from "@/components/home/units";

import BlogPosts from "./components/blog-posts";
import Header from "./components/header";
import PayRent from "./components/pay-rent";
import PropertyRequest from "./components/property-request";
import Steps from "./components/steps";
import Testimonials from "./components/testimonials";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    alternates: {
      canonical: "/tenant",
      languages: {
        en: "/tenant",
        ar: "/ar/tenant",
      },
    },
  };
}

async function Tenant(
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

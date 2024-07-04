import { getTranslations } from "next-intl/server";

import { ContactImage } from "@/app/[locale]/assets/svgs/contact-image";

import SectionTitle from "../components/section-title";
import ContactForm from "./contact-form";

async function Contact() {
  const t = await getTranslations("home.contact");

  return (
    <section id="contact" className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle text={t("title")} />
        <div className="mt-12 flex flex-col items-stretch lg:grid lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col items-center justify-center">
            <h3 className="mt-4 text-lg text-slate-600 lg:me-16">
              {t("subtitle")}
            </h3>
            <ContactImage className="h-80" />
          </div>

          <div className="">
            <div className="lg:me-5">
              <div className="rounded-md bg-white p-6 shadow">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

import { getTranslations } from "next-intl/server";

import { ContactImage } from "@/app/[locale]/assets/svgs/contact-image";

import SectionTitle from "../components/section-title";
import ContactForm from "./contact-form";

async function Contact() {
  const t = await getTranslations("home.contact");

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto">
        <SectionTitle text={t("contact")} />
        <div className="mt-12 flex flex-col items-stretch lg:flex-row lg:items-center lg:justify-around">
          <div className="flex items-center justify-center">
            <ContactImage />
          </div>

          <div className="lg:max-w-lg">
            <div className="lg:me-5">
              <div className="rounded-md bg-white p-6 shadow">
                <h3 className="mb-6 text-2xl font-medium leading-normal text-slate-900">
                  {t("getInTouch")}
                </h3>
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

import { getTranslations } from "next-intl/server";

import ContactForm from "./contact-form";

async function Contact() {
  const t = await getTranslations("home.contact");

  return (
    <section id="contact" className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mt-12 flex flex-col items-stretch lg:grid lg:grid-cols-2 lg:items-start">
          <div className="flex h-full flex-col justify-center">
            <h2 className="text-center text-5xl font-semibold uppercase leading-7 tracking-tight text-slate-900 lg:text-start">
              {t("title")}
            </h2>

            <h3 className="mt-8 text-lg text-slate-600 lg:me-16">
              {t("subtitle")}
            </h3>
          </div>

          <div className="mt-8 lg:me-5 lg:mt-0">
            <div className="rounded-md bg-white p-6 shadow">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

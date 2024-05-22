import { useTranslations } from "next-intl";

import { ContactImage } from "@/app/[locale]/assets/svgs/contact-image";

import SectionTitle from "../components/sectionTitle";
import ContactForm from "./contactForm";

const Contact = () => {
  const t = useTranslations("home.contact");

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto">
        <SectionTitle text={t("contact")} />
        <div className="mt-8 flex flex-col items-stretch lg:flex-row lg:items-center lg:justify-around">
          <div className="flex items-center justify-center">
            <ContactImage />
          </div>

          <div className="lg:max-w-lg">
            <div className="lg:me-5">
              <div className="rounded-md bg-white p-6 shadow">
                <h3 className="mb-6 text-2xl font-medium leading-normal text-[#161C2D]">
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
};

export default Contact;

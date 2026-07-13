import { getTranslations } from "next-intl/server";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function FAQ() {
  const t = await getTranslations("home.contact");

  const questions = [
    "listing-platform",
    "guaranteed-rent",
    "instarent",
    "flexible-payments",
    "sodic-badge",
  ];

  return (
    <div className="w-full">
      <div className="mb-8 lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 lg:text-sm">
          Questions That Matter
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base text-slate-600 lg:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {questions.map((questionKey) => (
          <AccordionItem key={questionKey} value={questionKey}>
            <AccordionTrigger className="text-base font-semibold text-slate-900 hover:text-blue-600 lg:text-lg">
              {t(`questions.${questionKey}.question`)}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 lg:text-base">
              {t(`questions.${questionKey}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQ;

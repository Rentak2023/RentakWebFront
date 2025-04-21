import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/ui/container";

export default function FAQ() {
  const t = useTranslations("landlord.faq");

  const questions = [
    "instarent",
    "rentak-guarantee",
    "maintenance",
    "verified",
  ] as const;

  return (
    <Container className="mt-32">
      <h2 className="text-primary-900 text-center text-4xl font-semibold tracking-tight lg:text-5xl">
        {t("title")}
      </h2>
      <p className="mx-auto mt-8 max-w-xl text-center text-xl text-slate-600">
        {t("description")}
      </p>
      <div className="mx-auto mt-16 max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question) => (
            <AccordionItem value={question} key={question}>
              <AccordionTrigger>
                {t(`questions.${question}.question`)}
              </AccordionTrigger>
              <AccordionContent>
                {t(`questions.${question}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}

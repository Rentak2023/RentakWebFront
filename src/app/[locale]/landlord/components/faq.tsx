import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/ui/container";

export default function FAQ() {
  return (
    <Container className="mt-32">
      <h2 className="text-primary-900 text-center text-4xl font-semibold tracking-tight lg:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="mx-auto mt-8 max-w-xl text-center text-xl text-slate-600">
        Find questions and answers related to the design system, purchase,
        updates, and support.
      </p>
      <div className="mx-auto mt-16 max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is Instarent and how does the instant offer work?
            </AccordionTrigger>
            <AccordionContent>
              Rentak evaluates your property and offers a guaranteed monthly
              rent. There’s no obligation until you accept, and it eliminates
              vacancy risk.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How does Rentak guarantee my rent?
            </AccordionTrigger>
            <AccordionContent>
              Rentak has a dedicated system to ensure landlords get paid on
              time, even if tenants are late or the property is vacant. You
              receive rent consistently, stress-free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Who handles maintenance and tenant calls?
            </AccordionTrigger>
            <AccordionContent>
              Rentak’s property management team takes care of all tenant
              communications, maintenance requests, and service provider
              coordination. You only get involved if you choose to.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What does the ‘Verified by Rentak’ badge mean for my listing?
            </AccordionTrigger>
            <AccordionContent>
              It means Rentak has inspected and verified your property details.
              This mark of quality increases trust and helps attract tenants
              faster.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Container>
  );
}

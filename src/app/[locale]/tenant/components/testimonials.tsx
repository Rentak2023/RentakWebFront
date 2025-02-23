import { toDate } from "date-fns";
import { useTranslations } from "next-intl";

import {
  type Testimonial,
  Testimonials,
} from "@/components/landing/testimonials";

const testimonials: Array<Testimonial> = [
  {
    id: 1,
    name: "Mahmoud A.",
    paragraphs: [
      "With Rentak, I've never worried about late payments again. Their timely rent collection service has transformed how I manage my properties.",
      "Rentak's legal safeguards give me peace of mind. I know that my rental agreements are solid and my interests are protected.",
      "Rentak's thorough property inspections provide a transparent overview of my unit before and after rent, ensuring every detail is accounted for. I feel safe.",
    ],
    rating: 5,
    date: toDate("2024-04-06"),
  },
  {
    id: 2,
    name: "Tarek G.",
    paragraphs: [
      "As a landlord, I really appreciate that Rentak services allow me to pay my annual maintenance fees in installments. Instead of having to pay a large lump sum all at once, I can spread out the cost over several months",
    ],
    rating: 5,
    date: toDate("2024-10-26"),
  },
  {
    id: 3,
    name: "Ahmed G.",
    paragraphs: [
      "As a landlord, I find Rentak's guarantee on my rental unit to be the most beneficial service they offer. Knowing that my unit is protected gives me significant peace of mind and allows me to feel more at ease about my property. Rentak's assurance makes managing my rental far less stressful, and I truly appreciate the level of care and security they provide.",
    ],
    rating: 5,
    date: toDate("2024-10-26"),
  },
  {
    id: 4,
    name: "Howaida M.",
    paragraphs: [
      "What I appreciate most about Rentak is their strong commitment and reliability. Rentak truly stands out as a company that honors its promises, providing dependable service that I can always count on. Their dedication makes all the difference and gives me confidence in working with them.",
    ],
    rating: 5,
    date: toDate("2023-12-25"),
  },
];

export default function TenantTestimonials() {
  const t = useTranslations("tenant.testimonials");

  return <Testimonials testimonials={testimonials} title={t("title")} />;
}

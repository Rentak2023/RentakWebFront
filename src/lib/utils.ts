import { type ClassValue, clsx } from "clsx";
import { type AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { type Locale } from "next-intl";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function getLocaleDirection(locale: Locale) {
  return locale === "en" ? "ltr" : "rtl";
}

export function generateAlternatesLinks(href: string): AlternateURLs {
  return {
    canonical: href,
    languages: {
      en: href,
      ar: `/ar${href}`,
    },
  };
}

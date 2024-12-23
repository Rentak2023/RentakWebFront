import { type ClassValue, clsx } from "clsx";
import { type Locale } from "next-intl";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export default function getLocaleDirection(locale: Locale) {
  return locale === "en" ? "ltr" : "rtl";
}

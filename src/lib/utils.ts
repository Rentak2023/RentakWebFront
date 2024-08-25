import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export default function getLocaleDirection(locale: string) {
  return locale === "en" ? "ltr" : "rtl";
}

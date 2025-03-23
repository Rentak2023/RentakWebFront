import { unstable_rootParams as rootParams } from "next/server";
import { type Formats, hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export const formats = {
  number: {
    money: {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    },
    numbers: {},
  },
  dateTime: {
    long: {
      dateStyle: "long",
    },
    medium: {
      dateStyle: "medium",
    },
  },
} satisfies Formats;

export default getRequestConfig(async () => {
  // This typically corresponds to the `[locale]` segment
  const params = await rootParams();

  // Ensure that a valid locale is used
  const locale = hasLocale(routing.locales, params.locale)
    ? params.locale
    : routing.defaultLocale;

  return {
    locale,
    // eslint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../../messages/${locale}.json`)).default,
    formats: {
      number: {
        money: {
          style: "currency",
          currency: "EGP",
          minimumFractionDigits: 0,
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        numbers: {
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
      },
      dateTime: {
        long: {
          dateStyle: "long",
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        medium: {
          dateStyle: "medium",
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
      },
    },
  };
});

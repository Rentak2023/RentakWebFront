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
  },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Ensure that a valid locale is used
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // eslint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../../messages/${locale}.json`)).default,
    formats,
  };
});

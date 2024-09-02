import { type LocalePrefix } from "next-intl/routing";

export const locales = ["en", "ar-EG"] as const;
export const localePrefix = {
  mode: "as-needed",
  prefixes: {
    "ar-EG": "/ar",
  },
} satisfies LocalePrefix<typeof locales>;

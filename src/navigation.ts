import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { type LocalePrefix } from "next-intl/routing";

export const locales = ["en", "ar-EG"] as const;
export const localePrefix = {
  mode: "as-needed",
  prefixes: {
    "ar-EG": "/ar",
  },
} satisfies LocalePrefix<typeof locales>;

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createSharedPathnamesNavigation({ locales, localePrefix });

import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar-EG"] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "ar-EG": "/ar",
    },
  },
});

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  permanentRedirect,
  getPathname,
} = createNavigation(routing);

import { type formats } from "@/i18n/request";
import { type routing } from "@/i18n/routing";

import type en from "./messages/en.json";

declare module "next-intl" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
    Formats: typeof formats;
  }
}

import type en from "./messages/en.json";
import { type formats } from "./src/i18n/request";
import { type routing } from "./src/i18n/routing";

declare module "next-intl" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
    Formats: typeof formats;
  }
}

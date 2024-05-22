import createMiddleware from "next-intl/middleware";

import { localePrefix, locales } from "./navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .swa (Azure Static Web Apps)
     */
    "/((?!.swa|api|_next/static|_next/image|assets|images|favicon.ico).*)",
  ],
};

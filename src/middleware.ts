import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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
    "/((?!.swa|api|monitoring|_next/static|_next/image|assets|images|favicon.ico).*)",
  ],
};

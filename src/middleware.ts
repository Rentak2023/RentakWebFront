import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const authPages = new Set(["/dashboard", "/profile"]);

const guestPages = new Set(["/login-register"]);

export default function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  const authToken = request.cookies.get("authToken")?.value;
  // if in auth pages
  if (authPages.has(request.nextUrl.pathname) && !authToken) {
    return NextResponse.redirect(new URL("/login-register", request.url));
  }

  if (guestPages.has(request.nextUrl.pathname) && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

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
    `/((?!.swa|api|rpc|monitoring|assets|images|_next|_vercel|.*\\..*).*)`,
  ],
};

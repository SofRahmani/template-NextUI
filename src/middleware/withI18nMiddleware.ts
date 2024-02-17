import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { CustomMiddleware } from "./chain";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocal = i18n.locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect of there is no locale
    if (pathnameIsMissingLocal) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
      );
    }

    return middleware(request, event, response);
  };
}

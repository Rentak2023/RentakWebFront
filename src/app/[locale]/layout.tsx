import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import { getLocaleDirection } from "@/lib/utils";
import URLS from "@/shared/urls";

import WhatsappIcon from "./assets/svgs/whatsapp-icon";
import { NavigationEvents } from "./navigation-events";
import { Providers } from "./providers";
import { WebVitals } from "./web-vitals";

const notoSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans",
});

const generalSans = localFont({
  src: "./assets/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  adjustFontFallback: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");

  return {
    title: {
      default: t("title"),
      template: t("default"),
    },
    description: t("description"),
    metadataBase: new URL("https://rentakapp.com"),
    openGraph: {
      title: {
        default: t("title"),
        template: t("default"),
      },
      type: "website",
      description: t("description"),
      siteName: "Rentak",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow",
    },
    verification: {
      google: "um9lkKeKbcsNicGoHyG1jIJ8QmHiK8BLZkqfJ0_gL8A",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const locale = await getLocale();

  const { children } = props;

  const direction = getLocaleDirection(locale);

  return (
    <html
      lang={locale === "en" ? "en" : "ar"}
      dir={direction}
      className={`${generalSans.variable} ${notoSans.variable}`}
    >
      <body className="font-sans antialiased">
        <div className="flex min-h-svh flex-col">
          <NextIntlClientProvider>
            <NuqsAdapter>
              <Providers>
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer />
                <Toaster />
                <a
                  href={URLS.whatsapp}
                  className="fixed bottom-8 end-8 z-50 inline-flex rounded-full border border-slate-200 bg-[#25D366] p-3 shadow-lg"
                >
                  <WhatsappIcon className="size-8 text-white" />
                </a>
                <Suspense>
                  <NavigationEvents />
                  <WebVitals />
                </Suspense>
              </Providers>
            </NuqsAdapter>
          </NextIntlClientProvider>
        </div>
      </body>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

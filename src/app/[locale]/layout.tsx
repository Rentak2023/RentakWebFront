import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import { type Locale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import getLocaleDirection from "@/lib/utils";
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

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "meta",
  });

  return {
    title: {
      default: t("title"),
      template: t("default"),
    },
    metadataBase: new URL("https://www.rentakapp.com"),
    openGraph: {
      title: {
        default: t("title"),
        template: t("default"),
      },
      type: "website",
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
    params: Promise<{ locale: Locale }>;
  }>,
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  setRequestLocale(locale);
  const direction = getLocaleDirection(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${generalSans.variable} ${notoSans.variable}`}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <body className="font-sans antialiased">
        <div className="flex min-h-svh flex-col">
          <NextIntlClientProvider
            messages={messages}
            formats={{
              number: {
                money: {
                  style: "currency",
                  currency: "EGP",
                  minimumFractionDigits: 0,
                },
              },
            }}
          >
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
    </html>
  );
}

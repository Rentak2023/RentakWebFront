import "./globals.css";

import { type Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import useTextDirection from "@/hooks/text-direction";

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
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "meta",
  });

  return {
    title: t("title"),
  };
}

const locales = ["en", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const direction = useTextDirection(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${generalSans.variable} ${notoSans.variable} font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

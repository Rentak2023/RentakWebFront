import { CheckCircle } from "lucide-react";
import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");
  return {
    title: t("payment-success.title"),
    description: t("payment-success.description"),
  };
}

export default function PaymentSuccessPage() {
  const t = useTranslations("services");

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center pb-16 pt-32">
      <Container className="max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="animate-in zoom-in size-24 text-green-500 duration-500" />
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {t("payment-success.title")}
        </h1>
        <p className="mb-10 text-lg text-slate-600 md:text-xl">
          {t("payment-success.description")}
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/">{t("payment-success.back-to-home")}</Link>
        </Button>
      </Container>
    </main>
  );
}

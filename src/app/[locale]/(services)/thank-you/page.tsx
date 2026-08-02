import { cookies } from "next/headers";
import { redirect } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { type Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");
  return {
    title: t("thank-you.title"),
    description: t("thank-you.description"),
  };
}

export default async function ThankYouPage() {
  const cookieStore = await cookies();
  const hasSubmitted = cookieStore.get("form_submitted");

  if (!hasSubmitted) {
    redirect("/");
  }

  const t = await getTranslations("services");

  return (
    <main className="pt-32 pb-16 min-h-[70vh] flex flex-col justify-center items-center">
      <Container className="max-w-2xl text-center">
        <div className="flex justify-center mb-8">
          <CheckCircle className="size-24 text-green-500 animate-in zoom-in duration-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
          {t("thank-you.title")}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10">
          {t("thank-you.description")}
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/">{t("thank-you.back-to-home")}</Link>
        </Button>
      </Container>
    </main>
  );
}

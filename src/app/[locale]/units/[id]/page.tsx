import { unstable_setRequestLocale } from "next-intl/server";

import Property from "@/components/property";

export default function UnitPage({
  params: { locale, id },
}: Readonly<{
  params: { locale: string; id: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Property params={{ locale, id }} />
    </main>
  );
}

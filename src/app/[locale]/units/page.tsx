import { unstable_setRequestLocale } from "next-intl/server";

import Units from "@/components/units";

export default function UnitsPage({
  params: { locale },
  searchParams,
}: Readonly<{
  params: { locale: string };
  searchParams: Record<string, string | Array<string>>;
}>) {
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Units searchParams={searchParams} />
    </main>
  );
}

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = new Set(["en", "ar"]);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.has(locale)) notFound();

  const { default: messages } = await import(`../messages/${locale}.json`);
  return {
    messages,
  };
});

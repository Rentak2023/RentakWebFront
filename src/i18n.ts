import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = new Set(["en", "ar"]);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.has(locale)) notFound();

  // For some reason `const {messages: default}` isn't working
  // eslint-disable-next-line unicorn/no-await-expression-member
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages,
    formats: {
      number: {
        money: {
          style: "currency",
          currency: "EGP",
          minimumFractionDigits: 0,
        },
      },
    },
  };
});

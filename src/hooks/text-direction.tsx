export default function useTextDirection(locale: string) {
  return locale === "en" ? "ltr" : "rtl";
}

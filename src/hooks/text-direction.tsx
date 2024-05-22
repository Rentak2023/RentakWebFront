export default function useTextDirection(locale: string) {
  return locale === "ar" ? "rtl" : "ltr";
}

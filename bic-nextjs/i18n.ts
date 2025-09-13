import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export const locales = ["en", "ko", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export default getRequestConfig(async () => {
  // Get locale from header or use default
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  let locale: Locale = defaultLocale;

  // Simple locale detection from accept-language header
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (locales.includes(preferredLocale as Locale)) {
      locale = preferredLocale as Locale;
    }
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

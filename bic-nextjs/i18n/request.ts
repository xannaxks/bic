import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

const locales = ["en", "ko", "zh"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  // Try to get locale from cookie first
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale");

  // Fallback to accept-language header
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  let locale: Locale = "en"; // default

  // Check cookie first
  if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
    locale = localeCookie.value as Locale;
  }
  // Check accept-language header
  else if (acceptLanguage) {
    const detectedLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (locales.includes(detectedLocale as Locale)) {
      locale = detectedLocale as Locale;
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

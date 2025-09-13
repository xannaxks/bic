"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const t = useTranslations("utility.language");
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Remove the current locale from the pathname
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPathname);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        aria-label={t("select")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </button>

      {isOpen && (
        <div className="bg-popover text-popover-foreground absolute top-full right-0 z-50 mt-1 min-w-[160px] overflow-hidden rounded-md border p-1 shadow-md">
          <div role="listbox" aria-label={t("select")}>
            {languages.map((language) => (
              <button
                key={language.code}
                role="option"
                aria-selected={language.code === locale}
                onClick={() => handleLanguageChange(language.code)}
                className={`hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none ${
                  language.code === locale
                    ? "bg-accent text-accent-foreground"
                    : ""
                } ${isPending ? "pointer-events-none opacity-50" : ""}`}
                disabled={isPending}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60">{language.code}</span>
                  <span>{language.nativeName}</span>
                </div>
                {language.code === locale && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

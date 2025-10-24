"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/features/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/features/language/language-switcher";
import { SearchBar } from "@/components/features/search/search-bar";

export function UtilityNavigation() {
  const tUtility = useTranslations("utility");
  const tCommon = useTranslations("common");

  return (
    <div className="w-full px-6 flex h-14 items-center justify-between">
      <div className="flex items-center gap-4">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only rounded-md px-4 py-2 transition-all duration-200 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus-visible:ring-2 focus-visible:outline-none"
        >
          {tCommon("skip_to_content")}
        </a>
      </div>

      <div className="flex items-center gap-2">
        {/* <SearchBar /> */}
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        {/* <ThemeToggle /> */}
        <a
          href = "https://my.tu.ac.kr/"
          className="bg-white/10 text-white ring-offset-background hover:bg-white/20 border border-white/30 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
          {tUtility("auth.login")}
        </a>
      </div>
    </div>
  );
}

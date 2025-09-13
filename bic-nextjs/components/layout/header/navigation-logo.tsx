"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export function NavigationLogo() {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}`}
      className="focus:ring-primary flex items-center space-x-2 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
      aria-label="Tongmyong University Homepage"
    >
      <Image
        src="/images/tongmyong-logo.svg"
        alt="Tongmyong University Logo"
        width={160}
        height={48}
        className="h-8 w-auto transition-all duration-200 sm:h-10"
        priority
      />
    </Link>
  );
}

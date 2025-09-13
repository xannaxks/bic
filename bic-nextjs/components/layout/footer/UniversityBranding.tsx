"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function UniversityBranding() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-border border-t pt-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo and Mission */}
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 relative flex h-12 w-12 items-center justify-center rounded-full">
            {/* Placeholder for logo - replace with actual logo */}
            <span className="text-primary text-xl font-bold">TU</span>
          </div>
          <div>
            <h4 className="text-lg font-bold" itemProp="name">
              Tongmyong University
            </h4>
            <p className="text-muted-foreground text-sm" itemProp="slogan">
              {t("mission")}
            </p>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="flex flex-col gap-3 lg:items-end">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Tongmyong University. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

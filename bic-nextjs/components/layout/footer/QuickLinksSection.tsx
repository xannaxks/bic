"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const quickLinks = [
  {
    category: "about",
    links: [
      { key: "university", href: "/about" },
      { key: "history", href: "/about/history" },
      { key: "mission", href: "/about/mission" },
      { key: "leadership", href: "/about/leadership" },
    ],
  },
  {
    category: "academics",
    links: [
      { key: "programs", href: "/academics/programs" },
      { key: "colleges", href: "/academics/colleges" },
      { key: "calendar", href: "/academics/calendar" },
      { key: "research", href: "/research" },
    ],
  },
  {
    category: "admissions",
    links: [
      { key: "undergraduate", href: "/admissions/undergraduate" },
      { key: "graduate", href: "/admissions/graduate" },
      { key: "international", href: "/international" },
      { key: "financial_aid", href: "/admissions/financial-aid" },
    ],
  },
  {
    category: "student_life",
    links: [
      { key: "campus", href: "/student-life/campus" },
      { key: "housing", href: "/student-life/housing" },
      { key: "activities", href: "/student-life/activities" },
      { key: "support", href: "/student-life/support" },
    ],
  },
];

export function QuickLinksSection() {
  const t = useTranslations("footer");

  return (
    <div className="grid grid-cols-2 gap-6 lg:col-span-2">
      {quickLinks.map((section) => (
        <div key={section.category} className="footer-section">
          <h3 className="text-foreground mb-4 text-lg font-semibold">
            {t(`${section.category}.title`)}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                >
                  {t(`${section.category}.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { ActionButton } from "./ActionButton";
import { quickActions } from "./quickActionsData";

export function QuickActionsGrid() {
  const t = useTranslations("quickActions");

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2
          className="animate-on-scroll animate-once mb-4 text-3xl font-bold opacity-0"
          style={{ animationDelay: "100ms" }}
        >
          Quick Access
        </h2>
        <p
          className="text-muted-foreground animate-on-scroll animate-once mx-auto max-w-2xl opacity-0"
          style={{ animationDelay: "200ms" }}
        >
          Find information and services tailored to your needs
        </p>
      </div>

      {/* Actions Grid */}
      <nav
        className="stagger-children grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        role="navigation"
        aria-label="Quick access navigation"
      >
        {quickActions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            label={t(action.id)}
            subtitle={t(`${action.id}_subtitle`)}
          />
        ))}
      </nav>
    </div>
  );
}

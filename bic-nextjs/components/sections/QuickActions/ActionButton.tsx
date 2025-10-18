"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
  color?: string;
}

interface ActionButtonProps {
  action: QuickAction;
  label: string;
  subtitle?: string;
}

export function ActionButton({ action, label, subtitle }: ActionButtonProps) {
  const Icon = action.icon;

  const buttonContent = (
    <div className="relative z-10">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:to-green-700 group-hover:shadow-lg dark:bg-slate-800">
        <Icon
          className="h-7 w-7 text-slate-600 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:text-white dark:text-slate-300"
          aria-hidden="true"
        />
      </div>
      <div className="text-foreground mb-1 text-base font-semibold transition-colors duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-[#005629] dark:group-hover:text-green-400">
        {label}
      </div>
      {subtitle && (
        <div className="text-muted-foreground text-sm transition-colors duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-slate-700 dark:group-hover:text-slate-300">
          {subtitle}
        </div>
      )}
    </div>
  );

  const baseClasses = `
    relative bg-card rounded-xl p-6 text-center
    transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
    hover:scale-[1.03] hover:shadow-xl
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
    group block w-full h-full min-h-[140px] flex flex-col justify-center
    border border-border/50 hover:border-green-200
    dark:hover:border-green-800
    overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white before:to-[#005629]
    dark:before:from-slate-800 dark:before:to-green-950/30
    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700 before:cubic-bezier(0.4, 0, 0.2, 1)
    before:z-0
  `;

  if (action.external) {
    return (
      <a
        href={action.href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Navigate to ${label} (opens in new tab)`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className={baseClasses}
      aria-label={`Navigate to ${label}`}
    >
      {buttonContent}
    </Link>
  );
}

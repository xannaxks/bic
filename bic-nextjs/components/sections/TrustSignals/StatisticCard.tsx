"use client";

import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { AnimatedBar } from "./AnimatedBar";

interface Statistic {
  id: string;
  label: string;
  value: number | string; // Support both numeric and text-based statistics
  suffix?: string;
  prefix?: string;
  percentage: number;
  icon: LucideIcon;
  color: string;
  description?: string;
}

interface StatisticCardProps {
  statistic: Statistic;
  shouldAnimate: boolean;
  delay?: number;
}

export function StatisticCard({
  statistic,
  shouldAnimate,
  delay = 0,
}: StatisticCardProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof statistic.value === "number" ? 0 : statistic.value
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  const Icon = statistic.icon;
  const isNumeric = typeof statistic.value === "number";

  // Animate the counter (only for numeric values)
  useEffect(() => {
    if (!shouldAnimate || hasAnimated || !isNumeric) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const numericValue = statistic.value as number;
      const increment = numericValue / steps;
      let current = 0;
      let step = 0;

      const counter = setInterval(() => {
        current += increment;
        step++;

        if (step >= steps) {
          setDisplayValue(numericValue);
          clearInterval(counter);
          setHasAnimated(true);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldAnimate, hasAnimated, statistic.value, delay, isNumeric]);

  const formattedValue = isNumeric
    ? `${statistic.prefix || ""}${(displayValue as number).toLocaleString()}${statistic.suffix || ""}`
    : `${statistic.prefix || ""}${displayValue}${statistic.suffix || ""}`;

  return (
    <div className="group animate-on-scroll animate-once text-center opacity-0">
      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors duration-200">
          <Icon className={`h-8 w-8 ${statistic.color}`} aria-hidden="true" />
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className="text-foreground text-3xl font-bold md:text-4xl">
          {formattedValue}
        </span>
      </div>

      {/* Label */}
      <h3 className="text-foreground mb-3 text-lg font-semibold">
        {statistic.label}
      </h3>

      {/* Description */}
      {statistic.description && (
        <p className="text-muted-foreground mb-4 text-sm">
          {statistic.description}
        </p>
      )}

      {/* Progress Bar */}
      <div className="w-full">
        <AnimatedBar
          percentage={statistic.percentage}
          shouldAnimate={shouldAnimate}
          delay={delay}
          color={statistic.color}
        />
      </div>

      {/* Screen reader only text */}
      <div className="sr-only">
        {statistic.label}: {formattedValue}
        {statistic.description && `. ${statistic.description}`}
      </div>
    </div>
  );
}

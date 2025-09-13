"use client";

import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { AnimatedBar } from "./AnimatedBar";

interface Statistic {
  id: string;
  label: string;
  value: number;
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
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const Icon = statistic.icon;

  // Animate the counter
  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = statistic.value / steps;
      let current = 0;
      let step = 0;

      const counter = setInterval(() => {
        current += increment;
        step++;

        if (step >= steps) {
          setDisplayValue(statistic.value);
          clearInterval(counter);
          setHasAnimated(true);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldAnimate, hasAnimated, statistic.value, delay]);

  const formattedValue = `${statistic.prefix || ""}${displayValue.toLocaleString()}${statistic.suffix || ""}`;

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

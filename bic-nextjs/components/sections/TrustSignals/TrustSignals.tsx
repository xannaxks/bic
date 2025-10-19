"use client";

import { StatisticCard } from "./StatisticCard";
import { statisticsData } from "./statisticsData";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function TrustSignals() {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      ref={elementRef}
      className="w-full"
      aria-label="University statistics and achievements"
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="animate-on-scroll animate-once mb-4 text-3xl font-bold opacity-0">
          Why Choose Tongmyong University
        </h2>
        <p
          className="text-muted-foreground animate-on-scroll animate-once mx-auto max-w-2xl opacity-0"
          style={{ animationDelay: "100ms" }}
        >
          Trusted by students, parents, and employers worldwide
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="rounded-2xl border-2 border-green-600/20 bg-green-50/50 p-8 shadow-sm dark:border-green-800/20 dark:bg-transparent md:p-12">
        <div className="stagger-children grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statisticsData.map((statistic, index) => (
            <StatisticCard
              key={statistic.id}
              statistic={statistic}
              shouldAnimate={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

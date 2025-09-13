"use client";

import { HeroCarousel } from "@/components/features/hero-carousel";

export function HeroSection() {
  return (
    <section
      className="relative w-full"
      role="region"
      aria-label="Hero carousel"
    >
      <HeroCarousel />
    </section>
  );
}
